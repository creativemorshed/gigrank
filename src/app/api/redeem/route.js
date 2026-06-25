// src/app/api/redeem/route.js
// License key validation via Google Sheets
// No redeploy needed — just add keys to the sheet!

import { NextResponse } from "next/server";

// ── Google Sheets JWT Auth
async function getAccessToken() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const now = Math.floor(Date.now() / 1000);

  const header  = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify({
    iss:   credentials.client_email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud:   "https://oauth2.googleapis.com/token",
    exp:   now + 3600,
    iat:   now,
  })).toString("base64url");

  const signingInput = `${header}.${payload}`;

  const pemKey  = credentials.private_key;
  const keyData = pemKey.replace("-----BEGIN PRIVATE KEY-----","").replace("-----END PRIVATE KEY-----","").replace(/\s/g,"");
  const binKey  = Uint8Array.from(atob(keyData), c => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8", binKey.buffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false, ["sign"]
  );

  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", cryptoKey, new TextEncoder().encode(signingInput));
  const jwt = `${signingInput}.${Buffer.from(sig).toString("base64url")}`;

  const tokenRes  = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body:    `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) throw new Error("Google auth failed.");
  return tokenData.access_token;
}

async function sheetsGet(token, sheetId, range) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  return res.json();
}

async function sheetsUpdate(token, sheetId, range, values) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}?valueInputOption=RAW`;
  await fetch(url, {
    method:  "PUT",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body:    JSON.stringify({ values }),
  });
}

export async function POST(req) {
  const { key } = await req.json().catch(() => ({}));
  if (!key) return NextResponse.json({ error: "License key required." }, { status: 400 });

  const k = key.trim().toUpperCase();
  if (!/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(k))
    return NextResponse.json({ error: "Invalid key format." }, { status: 400 });

  // ── Fallback: check env var keys (for demo keys)
  try {
    const envKeys = JSON.parse(process.env.LICENSE_KEYS || "{}");
    if (envKeys[k] !== undefined) {
      // Demo keys — no sheet needed
      return NextResponse.json({ success: true, credits: envKeys[k] });
    }
  } catch (_) {}

  // ── Google Sheet check
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) return NextResponse.json({ error: "Key not found." }, { status: 404 });

  try {
    const token = await getAccessToken();
    const data  = await sheetsGet(token, sheetId, "Sheet1!A2:E200");
    const rows  = data.values || [];

    const rowIndex = rows.findIndex(r => (r[0] || "").toUpperCase() === k);
    if (rowIndex === -1) return NextResponse.json({ error: "Invalid or expired key." }, { status: 404 });

    const row     = rows[rowIndex];
    const credits = parseInt(row[1] || "0", 10);
    const status  = (row[2] || "").toUpperCase();

    if (status === "USED")   return NextResponse.json({ error: "Key already redeemed." }, { status: 409 });
    if (status !== "ACTIVE") return NextResponse.json({ error: "Key is not active." },    { status: 403 });
    if (!credits || credits <= 0) return NextResponse.json({ error: "Invalid credits." }, { status: 400 });

    // Mark as USED
    const sheetRow = rowIndex + 2;
    await sheetsUpdate(token, sheetId, `Sheet1!C${sheetRow}:E${sheetRow}`, [
      ["USED", "redeemed", new Date().toISOString()]
    ]);

    return NextResponse.json({ success: true, credits });

  } catch (err) {
    console.error("Redeem error:", err.message);
    return NextResponse.json({ error: "Verification failed. Try again." }, { status: 500 });
  }
}
