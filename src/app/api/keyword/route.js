// src/app/api/keyword/route.js
import { checkRateLimit, sanitize, callGroq, extractJSON } from "@/lib/groq";
import { NextResponse } from "next/server";

const SYSTEM = `You are a Fiverr keyword research expert. Find the best keywords for Fiverr gig optimization using 2026 search trends and algorithm knowledge.

Return ONLY valid JSON, no markdown:
{"niche":"...","primaryKeyword":"...","keywords":[{"keyword":"...","searchVolume":"<high|medium|low>","competition":"<high|medium|low>","opportunity":"<high|medium|low>","type":"<primary|secondary|longtail|lsi>","suggestedUse":"<title|tag|description|all>"},{"keyword":"...","searchVolume":"<high|medium|low>","competition":"<high|medium|low>","opportunity":"<high|medium|low>","type":"<primary|secondary|longtail|lsi>","suggestedUse":"<title|tag|description|all>"},{"keyword":"...","searchVolume":"<high|medium|low>","competition":"<high|medium|low>","opportunity":"<high|medium|low>","type":"<primary|secondary|longtail|lsi>","suggestedUse":"<title|tag|description|all>"},{"keyword":"...","searchVolume":"<high|medium|low>","competition":"<high|medium|low>","opportunity":"<high|medium|low>","type":"<primary|secondary|longtail|lsi>","suggestedUse":"<title|tag|description|all>"},{"keyword":"...","searchVolume":"<high|medium|low>","competition":"<high|medium|low>","opportunity":"<high|medium|low>","type":"<primary|secondary|longtail|lsi>","suggestedUse":"<title|tag|description|all>"},{"keyword":"...","searchVolume":"<high|medium|low>","competition":"<high|medium|low>","opportunity":"<high|medium|low>","type":"<primary|secondary|longtail|lsi>","suggestedUse":"<title|tag|description|all>"},{"keyword":"...","searchVolume":"<high|medium|low>","competition":"<high|medium|low>","opportunity":"<high|medium|low>","type":"<primary|secondary|longtail|lsi>","suggestedUse":"<title|tag|description|all>"},{"keyword":"...","searchVolume":"<high|medium|low>","competition":"<high|medium|low>","opportunity":"<high|medium|low>","type":"<primary|secondary|longtail|lsi>","suggestedUse":"<title|tag|description|all>"},{"keyword":"...","searchVolume":"<high|medium|low>","competition":"<high|medium|low>","opportunity":"<high|medium|low>","type":"<primary|secondary|longtail|lsi>","suggestedUse":"<title|tag|description|all>"},{"keyword":"...","searchVolume":"<high|medium|low>","competition":"<high|medium|low>","opportunity":"<high|medium|low>","type":"<primary|secondary|longtail|lsi>","suggestedUse":"<title|tag|description|all>"}],"suggestedTitle":"...","suggestedTags":["...","...","...","...","..."],"trendInsight":"...","nicheOpportunity":"...","avoidKeywords":["...","..."],"seasonalTips":"..."}`;

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const rl = checkRateLimit(ip);
  if (!rl.allowed) return NextResponse.json({ error: `Rate limit. Wait ${rl.retryAfter}s.` }, { status: 429 });

  const { niche, currentTitle, targetAudience } = await req.json().catch(() => ({}));
  if (!niche || niche.trim().length < 3)
    return NextResponse.json({ error: "Provide a niche or service type." }, { status: 400 });

  const prompt = `Find the best Fiverr keywords for 2026. Return JSON only.

NICHE/SERVICE: ${sanitize(niche, 200)}
CURRENT TITLE: ${sanitize(currentTitle || "None", 200)}
TARGET AUDIENCE: ${sanitize(targetAudience || "General", 200)}`;

  try {
    const text = await callGroq({ systemPrompt: SYSTEM, userPrompt: prompt, maxTokens: 3000 });
    const result = extractJSON(text);
    return NextResponse.json({ success: true, result });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
