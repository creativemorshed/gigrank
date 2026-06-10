// src/app/api/rewriter/route.js
import { checkRateLimit, sanitize, callGroq, extractJSON } from "@/lib/groq";
import { NextResponse } from "next/server";

const SYSTEM = `You are an elite Fiverr gig copywriter with deep SEO expertise. Rewrite Fiverr gig content to maximize rankings using Fiverr 2026 algorithm. Rules:
- Title: main keyword FIRST, max 80 chars, compelling, no keyword stuffing
- Description: keyword in first 150 chars, conversational, benefit-focused, 300-700 words
- Tags: exactly 5, mix of broad + specific + long-tail keywords
- Packages: clear value differentiation, pricing psychology

Return ONLY valid JSON, no markdown:
{"optimizedTitle":"...","titleExplanation":"...","optimizedDescription":"...","descriptionHighlights":["...","...","..."],"tags":["...","...","...","...","..."],"tagStrategy":"...","packages":{"basic":{"name":"...","description":"...","suggestedPrice":<number>,"deliveryDays":<number>},"standard":{"name":"...","description":"...","suggestedPrice":<number>,"deliveryDays":<number>},"premium":{"name":"...","description":"...","suggestedPrice":<number>,"deliveryDays":<number>}},"faqs":[{"q":"...","a":"..."},{"q":"...","a":"..."},{"q":"...","a":"..."}],"seoScore":<0-100>,"expectedRankingImprovement":"...","keyChanges":["...","...","...","..."]}`;

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const rl = checkRateLimit(ip);
  if (!rl.allowed) return NextResponse.json({ error: `Rate limit. Wait ${rl.retryAfter}s.` }, { status: 429 });

  const { gigContent, targetKeyword, niche } = await req.json().catch(() => ({}));
  if (!gigContent || gigContent.trim().length < 30)
    return NextResponse.json({ error: "Provide your current gig content." }, { status: 400 });

  const prompt = `Rewrite this Fiverr gig for maximum 2026 algorithm ranking. Return JSON only.

TARGET KEYWORD: ${sanitize(targetKeyword || "auto-detect", 100)}
NICHE: ${sanitize(niche || "auto-detect", 100)}

CURRENT GIG CONTENT:
${sanitize(gigContent)}`;

  try {
    const text = await callGroq({ systemPrompt: SYSTEM, userPrompt: prompt, maxTokens: 3500, temperature: 0.4 });
    const result = extractJSON(text);
    return NextResponse.json({ success: true, result });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
