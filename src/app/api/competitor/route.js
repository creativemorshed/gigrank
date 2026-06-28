import { NextResponse } from "next/server";
import { checkRateLimit, sanitize, callGroq, extractJSON } from "@/lib/groq";
const SYS = `You are a Fiverr competitive intelligence expert. Compare gigs using 2026 algorithm knowledge. Return ONLY valid JSON no markdown:
{"niche":"...","marketOverview":"...","competitors":[{"gigTitle":"...","sellerUsername":"...","overallScore":<0-100>,"strengths":["...","..."],"weaknesses":["...","..."],"pricePoint":"...","reviewScore":<0-5>,"reviewCount":<number>,"keyDifferentiator":"..."}],"yourAdvantages":["...","...","..."],"yourGaps":["...","...","..."],"marketGaps":["...","..."],"winningStrategy":"...","pricingBenchmark":{"lowest":<number>,"average":<number>,"highest":<number>,"recommendation":"..."},"keywordGaps":["...","...","..."],"quickWins":[{"action":"...","impact":"<high|medium>"},{"action":"...","impact":"<high|medium>"},{"action":"...","impact":"<high|medium>"}]}`;
export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const rl = checkRateLimit(ip);
  if (!rl.ok) return NextResponse.json({ error: `Rate limit. Wait ${rl.wait}s.` }, { status: 429 });
  const { myGig, competitors } = await req.json().catch(() => ({}));
  if (!myGig || myGig.trim().length < 20) return NextResponse.json({ error: "Provide your gig details." }, { status: 400 });
  if (!competitors || competitors.trim().length < 20) return NextResponse.json({ error: "Provide competitor details." }, { status: 400 });
  try {
    const text = await callGroq({ sys: SYS, user: `Compare these gigs, return JSON only.\nMY GIG:\n${sanitize(myGig)}\nCOMPETITORS:\n${sanitize(competitors)}`, tokens: 3500 });
    return NextResponse.json({ success: true, result: extractJSON(text) });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}
