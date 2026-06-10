// src/app/api/predict/route.js
import { checkRateLimit, sanitize, callGroq, extractJSON } from "@/lib/groq";
import { NextResponse } from "next/server";

const SYSTEM = `You are a Fiverr ranking prediction expert. Predict future ranking potential based on current gig metrics, 2026 algorithm factors, and market trends.

Return ONLY valid JSON, no markdown:
{"currentRank":"<estimated position in niche>","predictions":{"day30":{"score":<0-100>,"rank":"...","ordersEstimate":<number>,"revenueEstimate":<number>,"confidence":"<high|medium|low>"},"day60":{"score":<0-100>,"rank":"...","ordersEstimate":<number>,"revenueEstimate":<number>,"confidence":"<high|medium|low>"},"day90":{"score":<0-100>,"rank":"...","ordersEstimate":<number>,"revenueEstimate":<number>,"confidence":"<high|medium|low>"}},"growthDrivers":["...","...","..."],"riskFactors":["...","..."],"breakoutPotential":"<high|medium|low>","breakoutConditions":["...","...","..."],"algorithmTrend":"<improving|stable|declining>","nicheSaturation":"<high|medium|low>","opportunityScore":<0-100>,"keyMilestones":[{"milestone":"...","expectedDate":"...","impact":"..."},{"milestone":"...","expectedDate":"...","impact":"..."},{"milestone":"...","expectedDate":"...","impact":"..."}],"scenarioBest":"...","scenarioWorst":"...","recommendation":"..."}`;

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const rl = checkRateLimit(ip);
  if (!rl.allowed) return NextResponse.json({ error: `Rate limit. Wait ${rl.retryAfter}s.` }, { status: 429 });

  const { gigInfo, currentScore, niche } = await req.json().catch(() => ({}));
  if (!gigInfo || gigInfo.trim().length < 20)
    return NextResponse.json({ error: "Provide gig details." }, { status: 400 });

  const prompt = `Predict Fiverr ranking for this gig over 30/60/90 days. Return JSON only.

NICHE: ${sanitize(niche || "auto-detect", 100)}
CURRENT SCORE: ${currentScore || "unknown"}
GIG INFO: ${sanitize(gigInfo)}`;

  try {
    const text = await callGroq({ systemPrompt: SYSTEM, userPrompt: prompt, maxTokens: 2500 });
    const result = extractJSON(text);
    return NextResponse.json({ success: true, result });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
