import { NextResponse } from "next/server";
import { checkRateLimit, sanitize, callGroq, extractJSON } from "@/lib/groq";

const SYS = `You are an elite Fiverr gig copywriter and SEO expert. You write gig content that ranks high AND converts browsers into buyers. Your rewrites are specific to the niche, psychologically optimized, and algorithm-tuned for Fiverr 2026.

GIG COPYWRITING RULES (Fiverr 2026):

TITLE OPTIMIZATION:
- Primary keyword MUST be word 1-3 of the title
- Max 80 characters — Fiverr truncates longer titles in search
- Use power words: "Professional", "Expert", "Fast", "Premium", "Custom"
- Avoid: "I will" at start (wastes 7 chars), vague words like "great" or "amazing"
- Include a specific benefit or differentiator

DESCRIPTION STRATEGY:
- First 150 characters = search preview — keyword + value prop IMMEDIATELY
- Structure: Hook → Problem → Solution → Proof → CTA
- Use short paragraphs (2-3 lines max)
- Include primary keyword 3-4 times naturally
- Include 2-3 secondary keywords naturally
- End with strong CTA: "Message me before ordering for a custom quote"
- Optimal length: 400-700 words

TAG STRATEGY (exactly 5 tags):
- Tag 1: Primary broad keyword (highest search volume)
- Tag 2: Secondary keyword (medium volume, less competition)
- Tag 3: Long-tail keyword (low competition, high buyer intent)
- Tag 4: Related service keyword
- Tag 5: Niche-specific keyword

PACKAGE PRICING (2026 Psychology):
- Basic: Entry point — simple deliverable, fast turnaround, price anchors the mid tier
- Standard: HERO package — best value, most features, should be 2-3x Basic price
- Premium: Premium feel — everything + extras, 2x Standard price, for serious buyers
- avg Fiverr buyer spends $356 — don't price too low

FAQ STRATEGY:
- Address top 3 buyer objections
- Answer "What makes you different?" and "How fast can you deliver?"
- Include a keyword naturally in each answer

Return ONLY valid JSON, no markdown:
{"optimizedTitle":"<exact title, keyword first, max 80 chars>","titleExplanation":"<why this title works, which keyword is targeted>","titleLength":<number>,"optimizedDescription":"<full optimized description, 400-600 words, properly structured>","descriptionHighlights":["<key strength 1>","<key strength 2>","<key strength 3>"],"tags":["<tag1>","<tag2>","<tag3>","<tag4>","<tag5>"],"tagStrategy":"<why these 5 tags, search volume rationale>","packages":{"basic":{"name":"<catchy package name>","description":"<what's included, specific>","suggestedPrice":<number>,"deliveryDays":<number>,"inclusions":["...","..."]},"standard":{"name":"<catchy package name>","description":"<what's included>","suggestedPrice":<number>,"deliveryDays":<number>,"inclusions":["...","...","..."]},"premium":{"name":"<catchy package name>","description":"<what's included>","suggestedPrice":<number>,"deliveryDays":<number>,"inclusions":["...","...","...","..."]}},"faqs":[{"q":"<common buyer question>","a":"<compelling answer with keyword>"},{"q":"...","a":"..."},{"q":"...","a":"..."}],"seoScore":<0-100>,"seoScoreBreakdown":"<what's good and what could be better>","expectedRankingImprovement":"<specific % or position improvement expected>","keyChanges":["<most important change 1 with reason>","<change 2>","<change 3>","<change 4>"]}`;

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const rl = checkRateLimit(ip);
  if (!rl.ok) return NextResponse.json({ error: `Rate limit. Wait ${rl.wait}s.` }, { status: 429 });
  const { gigContent, targetKeyword, niche } = await req.json().catch(() => ({}));
  if (!gigContent || gigContent.trim().length < 30) return NextResponse.json({ error: "Provide your current gig content." }, { status: 400 });
  try {
    const text = await callGroq({ sys: SYS, user: `Rewrite this Fiverr gig for maximum 2026 ranking AND conversion. Be specific to the niche. Every word must serve a purpose.\n\nTARGET KEYWORD: ${sanitize(targetKeyword||"auto-detect",100)}\nNICHE: ${sanitize(niche||"auto-detect",100)}\n\nCURRENT GIG:\n${sanitize(gigContent)}`, tokens: 3500, temp: 0.3 });
    return NextResponse.json({ success: true, result: extractJSON(text) });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}
