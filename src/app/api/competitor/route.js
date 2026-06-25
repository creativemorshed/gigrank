// src/app/api/competitor/route.js
import { checkRateLimit, sanitize, callGroq, extractJSON } from "@/lib/groq";
import { NextResponse } from "next/server";

const SYSTEM = `You are a Fiverr competitive intelligence expert. Compare multiple Fiverr gigs and identify competitive advantages, gaps, and opportunities. Use Fiverr 2026 algorithm knowledge.

Return ONLY valid JSON, no markdown:
{"niche":"...","marketOverview":"...","competitors":[{"gigTitle":"...","sellerUsername":"...","estimatedRank":"<1-10>","overallScore":<0-100>,"strengths":["...","..."],"weaknesses":["...","..."],"pricePoint":"...","responseTime":"...","reviewScore":<0-5>,"reviewCount":<number>,"keyDifferentiator":"..."}],"yourAdvantages":["...","...","..."],"yourGaps":["...","...","..."],"marketGaps":["...","..."],"winningStrategy":"...","pricingBenchmark":{"lowest":<number>,"average":<number>,"highest":<number>,"recommendation":"..."},"keywordGaps":["...","...","..."],"thumbnailInsights":"...","quickWins":[{"action":"...","impact":"<high|medium>"},{"action":"...","impact":"<high|medium>"},{"action":"...","impact":"<high|medium>"}]}`;

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const rl = checkRateLimit(ip);
  if (!rl.allowed) return NextResponse.json({ error: `Rate limit. Wait ${rl.retryAfter}s.` }, { status: 429 });

  const { myGig, competitors } = await req.json().catch(() => ({}));
  if (!myGig || myGig.trim().length < 20)
    return NextResponse.json({ error: "Provide your gig details." }, { status: 400 });
  if (!competitors || competitors.trim().length < 20)
    return NextResponse.json({ error: "Provide competitor gig details." }, { status: 400 });

  const prompt = `Compare these Fiverr gigs and return competitive intelligence JSON only.

MY GIG:
${sanitize(myGig)}

COMPETITOR GIGS:
${sanitize(competitors)}`;

  try {
    const text = await callGroq({ systemPrompt: SYSTEM, userPrompt: prompt, maxTokens: 3500 });
    const result = extractJSON(text);
    return NextResponse.json({ success: true, result });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
