// src/app/api/roadmap/route.js
import { checkRateLimit, sanitize, callGroq, extractJSON } from "@/lib/groq";
import { NextResponse } from "next/server";

const SYSTEM = `You are a Fiverr growth strategist. Create detailed 90-day growth roadmaps for Fiverr sellers based on their current gig performance and the 2026 algorithm.

Return ONLY valid JSON, no markdown:
{"sellerLevel":"<new|level1|level2|trs>","currentScore":<0-100>,"targetScore":<0-100>,"projectedLevel":"...","roadmap":{"week1":{"theme":"...","tasks":["...","...","...","..."]},"week2":{"theme":"...","tasks":["...","...","...","..."]},"week3":{"theme":"...","tasks":["...","...","...","..."]},"week4":{"theme":"...","tasks":["...","...","...","..."]},"month2":{"theme":"...","milestones":["...","...","..."]},"month3":{"theme":"...","milestones":["...","...","..."]}},"kpis":[{"metric":"...","current":"...","target30d":"...","target90d":"..."},{"metric":"...","current":"...","target30d":"...","target90d":"..."},{"metric":"...","current":"...","target30d":"...","target90d":"..."},{"metric":"...","current":"...","target30d":"...","target90d":"..."}],"criticalWarnings":["...","..."],"quickWins":["...","...","..."],"longTermStrategy":"...","estimatedRevenueImpact":"..."}`;

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const rl = checkRateLimit(ip);
  if (!rl.allowed) return NextResponse.json({ error: `Rate limit. Wait ${rl.retryAfter}s.` }, { status: 429 });

  const { gigInfo, currentMetrics } = await req.json().catch(() => ({}));
  if (!gigInfo || gigInfo.trim().length < 30)
    return NextResponse.json({ error: "Provide gig details." }, { status: 400 });

  const prompt = `Create a 90-day Fiverr growth roadmap. Return JSON only.

GIG INFO:
${sanitize(gigInfo)}

CURRENT METRICS (if available):
${sanitize(currentMetrics || "Not provided")}`;

  try {
    const text = await callGroq({ systemPrompt: SYSTEM, userPrompt: prompt, maxTokens: 3500 });
    const result = extractJSON(text);
    return NextResponse.json({ success: true, result });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
