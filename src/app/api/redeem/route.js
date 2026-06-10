// src/app/api/redeem/route.js
import { NextResponse } from "next/server";

const usedKeys = new Set();

export async function POST(req) {
  const { key } = await req.json().catch(() => ({}));
  if (!key) return NextResponse.json({ error: "License key required." }, { status: 400 });

  const k = key.trim().toUpperCase();
  if (!/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(k))
    return NextResponse.json({ error: "Invalid key format." }, { status: 400 });

  if (usedKeys.has(k))
    return NextResponse.json({ error: "Key already redeemed." }, { status: 409 });

  let validKeys = {};
  try { validKeys = JSON.parse(process.env.LICENSE_KEYS || "{}"); } catch (_) {}

  if (validKeys[k] !== undefined) {
    usedKeys.add(k);
    return NextResponse.json({ success: true, credits: validKeys[k] });
  }
  return NextResponse.json({ error: "Invalid or expired key." }, { status: 404 });
}
