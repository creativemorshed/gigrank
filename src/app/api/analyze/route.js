// src/app/api/analyze/route.js
import { checkRateLimit, sanitize, callGroq, extractJSON } from "@/lib/groq";
import { NextResponse } from "next/server";

const SYSTEM = `You are a world-class Fiverr SEO expert. Analyze Fiverr gigs using the 2026 algorithm (11 factors):
1. Success Score 22% 2. CTR 18% 3. Buyer Satisfaction 13% 4. Gig SEO 10% 5. Repeat Buyers 9%
6. On-Time Delivery 8% 7. Response Rate 6% 8. Profile Complete 4% 9. Gig Slug 4% 10. Order Value 3% 11. Gig Freshness 3%

2026 insights: fewer buyers (down 17.8%) but spend up 15.4% to $356/buyer. Algorithm rewards premium gigs.
Cancellations hurt ranking for 60 days. Private reviews equal public reviews in weight.
Slug is PERMANENT — keyword-rich slug = permanent SEO advantage.

Return ONLY valid compact JSON, no markdown, no backticks:
{"gigTitle":"...","sellerUsername":"...","niche":"...","overallScore":<0-100>,"rankTier":"<elite|strong|average|weak>","executiveSummary":"...","algorithmFactors":{"successScore":{"score":<0-100>,"insight":"...","urgency":"<high|medium|low>"},"ctr":{"score":<0-100>,"insight":"...","urgency":"<high|medium|low>"},"buyerSatisfaction":{"score":<0-100>,"insight":"...","urgency":"<high|medium|low>"},"gigSEO":{"score":<0-100>,"insight":"...","urgency":"<high|medium|low>"},"repeatBuyers":{"score":<0-100>,"insight":"...","urgency":"<high|medium|low>"},"deliveryTime":{"score":<0-100>,"insight":"...","urgency":"<high|medium|low>"},"responseRate":{"score":<0-100>,"insight":"...","urgency":"<high|medium|low>"},"profileComplete":{"score":<0-100>,"insight":"...","urgency":"<high|medium|low>"},"gigSlug":{"score":<0-100>,"insight":"...","urgency":"<high|medium|low>"},"orderValue":{"score":<0-100>,"insight":"...","urgency":"<high|medium|low>"},"gigFreshness":{"score":<0-100>,"insight":"...","urgency":"<high|medium|low>"}},"titleAnalysis":{"currentTitle":"...","hasMainKeywordFirst":<true|false>,"suggestedTitle":"...","slugOptimized":<true|false>,"slugAnalysis":"..."},"tagAnalysis":{"detectedTags":["..."],"missingKeywords":["..."]},"pricingAnalysis":{"currentPricing":"<low|competitive|premium>","suggestedMinPrice":<number>,"insight":"..."},"topWins":["...","...","..."],"criticalIssues":["...","...","..."],"quickWins":[{"action":"...","impact":"<high|medium>","timeframe":"<24h|1week|1month>"},{"action":"...","impact":"<high|medium>","timeframe":"<24h|1week|1month>"},{"action":"...","impact":"<high|medium>","timeframe":"<24h|1week|1month>"},{"action":"...","impact":"<high|medium>","timeframe":"<24h|1week|1month>"},{"action":"...","impact":"<high|medium>","timeframe":"<24h|1week|1month>"}],"algorithmNote":"...","freshnessTip":"...","multiGigStrategy":"...","competitorEdge":"..."}`;

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const rl = checkRateLimit(ip);
  if (!rl.allowed) return NextResponse.json({ error: `Rate limit. Wait ${rl.retryAfter}s.` }, { status: 429 });

  const { mode, gigUrl, gigInfo } = await req.json().catch(() => ({}));
  if (mode === "url" && (!gigUrl || !gigUrl.includes("fiverr.com")))
    return NextResponse.json({ error: "Enter a valid Fiverr gig URL." }, { status: 400 });
  if (mode !== "url" && (!gigInfo || gigInfo.trim().length < 40))
    return NextResponse.json({ error: "Provide more gig details." }, { status: 400 });

  const prompt = mode === "url"
    ? `Analyze this Fiverr gig URL. Extract username, slug keywords, niche. Return JSON only.\nURL: ${sanitize(gigUrl, 500)}`
    : `Analyze this Fiverr gig. Return JSON only.\n\n${sanitize(gigInfo)}`;

  try {
    const text = await callGroq({ systemPrompt: SYSTEM, userPrompt: prompt });
    const result = extractJSON(text);
    if (typeof result.overallScore !== "number") result.overallScore = 50;
    if (!["elite","strong","average","weak"].includes(result.rankTier)) result.rankTier = "average";
    return NextResponse.json({ success: true, result });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
