// src/app/api/redeem/route.js
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase not configured.");
  return createClient(url, key);
}

const usedKeys = new Set();

async function getGoogleToken() {
  const creds = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const now = Math.floor(Date.now() / 1000);
  const h = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const p = Buffer.from(JSON.stringify({ iss: creds.client_email, scope: "https://www.googleapis.com/auth/spreadsheets", aud: "https://oauth2.googleapis.com/token", exp: now + 3600, iat: now })).toString("base64url");
  const si = `${h}.${p}`;
  const keyData = creds.private_key.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s/g, "");
  const bin = Uint8Array.from(atob(keyData), c => c.charCodeAt(0));
  const ck = await crypto.subtle.importKey("pkcs8", bin.buffer, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", ck, new TextEncoder().encode(si));
  const jwt = `${si}.${Buffer.from(sig).toString("base64url")}`;
  const tr = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}` });
  const td = await tr.json();
  if (!td.access_token) throw new Error("Google auth failed.");
  return td.access_token;
}

export async function POST(req) {
  const { key, userId } = await req.json().catch(() => ({}));
  if (!key) return NextResponse.json({ error: "License key required." }, { status: 400 });
  if (!userId) return NextResponse.json({ error: "Please login first." }, { status: 401 });

  const k = key.trim().toUpperCase();
  if (!/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(k))
    return NextResponse.json({ error: "Invalid key format." }, { status: 400 });

  let supabaseAdmin;
  try { supabaseAdmin = getSupabaseAdmin(); }
  catch (e) { return NextResponse.json({ error: "Server not configured." }, { status: 500 }); }

  // Check env demo keys first
  try {
    const envKeys = JSON.parse(process.env.LICENSE_KEYS || "{}");
    if (envKeys[k] !== undefined) {
      const { error } = await supabaseAdmin.rpc("add_credits", { user_id: userId, amount: envKeys[k] });
      if (error) return NextResponse.json({ error: "Failed to add credits." }, { status: 500 });
      return NextResponse.json({ success: true, credits: envKeys[k] });
    }
  } catch (_) {}

  // Google Sheet check
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) return NextResponse.json({ error: "Invalid key." }, { status: 404 });
  if (usedKeys.has(k)) return NextResponse.json({ error: "Key already redeemed." }, { status: 409 });

  try {
    const token = await getGoogleToken();
    const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A2:E200`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    const rows = data.values || [];
    const idx = rows.findIndex(r => (r[0] || "").toUpperCase() === k);
    if (idx === -1) return NextResponse.json({ error: "Invalid or expired key." }, { status: 404 });

    const row = rows[idx];
    const credits = parseInt(row[1] || "0", 10);
    const status = (row[2] || "").toUpperCase();
    if (status === "USED") return NextResponse.json({ error: "Key already redeemed." }, { status: 409 });
    if (status !== "ACTIVE") return NextResponse.json({ error: "Key not active." }, { status: 403 });
    if (!credits || credits <= 0) return NextResponse.json({ error: "Invalid credits." }, { status: 400 });

    const row2 = idx + 2;
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!C${row2}:E${row2}?valueInputOption=RAW`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ values: [["USED", userId, new Date().toISOString()]] })
    });

    const { error: dbErr } = await supabaseAdmin.rpc("add_credits", { user_id: userId, amount: credits });
    if (dbErr) return NextResponse.json({ error: "Failed to save credits." }, { status: 500 });

    usedKeys.add(k);
    return NextResponse.json({ success: true, credits });
  } catch (err) {
    return NextResponse.json({ error: "Verification failed. Try again." }, { status: 500 });
  }
}
