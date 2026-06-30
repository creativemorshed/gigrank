import { NextResponse } from "next/server";
import { checkRateLimit, sanitize, callGroq, extractJSON } from "@/lib/groq";
const SYS = `You are an elite Fiverr gig copywriter. Rewrite gig content for max 2026 ranking. Rules: keyword FIRST in title, 5 tags, SEO description. Return ONLY valid JSON no markdown:
{"optimizedTitle":"...","titleExplanation":"...","optimizedDescription":"...","tags":["...","...","...","...","..."],"tagStrategy":"...","packages":{"basic":{"name":"...","description":"...","suggestedPrice":<number>,"deliveryDays":<number>},"standard":{"name":"...","description":"...","suggestedPrice":<number>,"deliveryDays":<number>},"premium":{"name":"...","description":"...","suggestedPrice":<number>,"deliveryDays":<number>}},"faqs":[{"q":"...","a":"..."},{"q":"...","a":"..."},{"q":"...","a":"..."}],"seoScore":<0-100>,"expectedRankingImprovement":"...","keyChanges":["...","...","...","..."]}`;
export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const rl = checkRateLimit(ip);
  if (!rl.ok) return NextResponse.json({ error: `Rate limit. Wait ${rl.wait}s.` }, { status: 429 });
  const { gigContent, targetKeyword, niche } = await req.json().catch(() => ({}));
  if (!gigContent || gigContent.trim().length < 30) return NextResponse.json({ error: "Provide gig content." }, { status: 400 });
  try {
    const text = await callGroq({ sys: SYS, user: `Rewrite for 2026 ranking, return JSON only.\nKEYWORD: ${sanitize(targetKeyword||"auto",100)}\nNICHE: ${sanitize(niche||"auto",100)}\nCONTENT:\n${sanitize(gigContent)}`, tokens: 3500, temp: 0.4 });
    return NextResponse.json({ success: true, result: extractJSON(text) });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}
