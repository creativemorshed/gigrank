import { NextResponse } from "next/server";
import { checkRateLimit, sanitize, callGroq, extractJSON } from "@/lib/groq";
const SYS = `You are a Fiverr ranking prediction expert. Predict rankings using 2026 algorithm. Return ONLY valid JSON no markdown:
{"currentRank":"...","predictions":{"day30":{"score":<0-100>,"rank":"...","ordersEstimate":<number>,"revenueEstimate":<number>,"confidence":"<high|medium|low>"},"day60":{"score":<0-100>,"rank":"...","ordersEstimate":<number>,"revenueEstimate":<number>,"confidence":"<high|medium|low>"},"day90":{"score":<0-100>,"rank":"...","ordersEstimate":<number>,"revenueEstimate":<number>,"confidence":"<high|medium|low>"}},"growthDrivers":["...","...","..."],"riskFactors":["...","..."],"breakoutPotential":"<high|medium|low>","opportunityScore":<0-100>,"keyMilestones":[{"milestone":"...","expectedDate":"...","impact":"..."},{"milestone":"...","expectedDate":"...","impact":"..."},{"milestone":"...","expectedDate":"...","impact":"..."}],"recommendation":"..."}`;
export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const rl = checkRateLimit(ip);
  if (!rl.ok) return NextResponse.json({ error: `Rate limit. Wait ${rl.wait}s.` }, { status: 429 });
  const { gigInfo, currentScore, niche } = await req.json().catch(() => ({}));
  if (!gigInfo || gigInfo.trim().length < 20) return NextResponse.json({ error: "Provide gig details." }, { status: 400 });
  try {
    const text = await callGroq({ sys: SYS, user: `Predict Fiverr ranking 30/60/90 days, return JSON only.\nNICHE: ${sanitize(niche||"auto",100)}\nSCORE: ${currentScore||"unknown"}\nGIG:\n${sanitize(gigInfo)}` });
    return NextResponse.json({ success: true, result: extractJSON(text) });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}
