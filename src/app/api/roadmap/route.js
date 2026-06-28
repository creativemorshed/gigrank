import { NextResponse } from "next/server";
import { checkRateLimit, sanitize, callGroq, extractJSON } from "@/lib/groq";
const SYS = `You are a Fiverr growth strategist. Create 90-day roadmaps based on 2026 algorithm. Return ONLY valid JSON no markdown:
{"currentScore":<0-100>,"targetScore":<0-100>,"projectedLevel":"...","roadmap":{"week1":{"theme":"...","tasks":["...","...","...","..."]},"week2":{"theme":"...","tasks":["...","...","...","..."]},"week3":{"theme":"...","tasks":["...","...","...","..."]},"week4":{"theme":"...","tasks":["...","...","...","..."]},"month2":{"theme":"...","milestones":["...","...","..."]},"month3":{"theme":"...","milestones":["...","...","..."]}},"kpis":[{"metric":"...","current":"...","target30d":"...","target90d":"..."},{"metric":"...","current":"...","target30d":"...","target90d":"..."},{"metric":"...","current":"...","target30d":"...","target90d":"..."},{"metric":"...","current":"...","target30d":"...","target90d":"..."}],"criticalWarnings":["...","..."],"quickWins":["...","...","..."],"estimatedRevenueImpact":"..."}`;
export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const rl = checkRateLimit(ip);
  if (!rl.ok) return NextResponse.json({ error: `Rate limit. Wait ${rl.wait}s.` }, { status: 429 });
  const { gigInfo, currentMetrics } = await req.json().catch(() => ({}));
  if (!gigInfo || gigInfo.trim().length < 30) return NextResponse.json({ error: "Provide gig details." }, { status: 400 });
  try {
    const text = await callGroq({ sys: SYS, user: `Create 90-day roadmap, return JSON only.\nGIG:\n${sanitize(gigInfo)}\nMETRICS:\n${sanitize(currentMetrics||"Not provided")}`, tokens: 3500 });
    return NextResponse.json({ success: true, result: extractJSON(text) });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}
