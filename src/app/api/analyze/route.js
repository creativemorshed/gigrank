import { NextResponse } from "next/server";
import { checkRateLimit, sanitize, callGroq, extractJSON } from "@/lib/groq";

const SYS = `You are a Fiverr SEO expert. Analyze gigs using 2026 algorithm (11 factors): Success Score 22%, CTR 18%, Buyer Satisfaction 13%, Gig SEO 10%, Repeat Buyers 9%, On-Time Delivery 8%, Response Rate 6%, Profile Complete 4%, Gig Slug 4%, Order Value 3%, Gig Freshness 3%. Return ONLY valid JSON no markdown:
{"gigTitle":"...","sellerUsername":"...","niche":"...","overallScore":<0-100>,"rankTier":"<elite|strong|average|weak>","executiveSummary":"...","algorithmFactors":{"successScore":{"score":<0-100>,"insight":"...","urgency":"<high|medium|low>"},"ctr":{"score":<0-100>,"insight":"...","urgency":"<high|medium|low>"},"buyerSatisfaction":{"score":<0-100>,"insight":"...","urgency":"<high|medium|low>"},"gigSEO":{"score":<0-100>,"insight":"...","urgency":"<high|medium|low>"},"repeatBuyers":{"score":<0-100>,"insight":"...","urgency":"<high|medium|low>"},"deliveryTime":{"score":<0-100>,"insight":"...","urgency":"<high|medium|low>"},"responseRate":{"score":<0-100>,"insight":"...","urgency":"<high|medium|low>"},"profileComplete":{"score":<0-100>,"insight":"...","urgency":"<high|medium|low>"},"gigSlug":{"score":<0-100>,"insight":"...","urgency":"<high|medium|low>"},"orderValue":{"score":<0-100>,"insight":"...","urgency":"<high|medium|low>"},"gigFreshness":{"score":<0-100>,"insight":"...","urgency":"<high|medium|low>"}},"titleAnalysis":{"currentTitle":"...","hasMainKeywordFirst":<true|false>,"suggestedTitle":"...","slugOptimized":<true|false>,"slugAnalysis":"..."},"tagAnalysis":{"detectedTags":["..."],"missingKeywords":["..."]},"pricingAnalysis":{"currentPricing":"<low|competitive|premium>","suggestedMinPrice":<number>,"insight":"..."},"topWins":["...","...","..."],"criticalIssues":["...","...","..."],"quickWins":[{"action":"...","impact":"<high|medium>","timeframe":"<24h|1week|1month>"},{"action":"...","impact":"<high|medium>","timeframe":"<24h|1week|1month>"},{"action":"...","impact":"<high|medium>","timeframe":"<24h|1week|1month>"},{"action":"...","impact":"<high|medium>","timeframe":"<24h|1week|1month>"},{"action":"...","impact":"<high|medium>","timeframe":"<24h|1week|1month>"}],"algorithmNote":"...","freshnessTip":"...","multiGigStrategy":"...","competitorEdge":"..."}`;

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const rl = checkRateLimit(ip);
  if (!rl.ok) return NextResponse.json({ error: `Rate limit. Wait ${rl.wait}s.` }, { status: 429 });
  const { mode, gigUrl, gigInfo } = await req.json().catch(() => ({}));
  if (mode === "url" && (!gigUrl || !gigUrl.includes("fiverr.com"))) return NextResponse.json({ error: "Enter a valid Fiverr URL." }, { status: 400 });
  if (mode !== "url" && (!gigInfo || gigInfo.trim().length < 40)) return NextResponse.json({ error: "Provide more gig details." }, { status: 400 });
  const prompt = mode === "url" ? `Analyze this Fiverr URL, extract username/slug/keywords, return JSON only.\nURL: ${sanitize(gigUrl, 500)}` : `Analyze this Fiverr gig, return JSON only.\n\n${sanitize(gigInfo)}`;
  try {
    const text = await callGroq({ sys: SYS, user: prompt });
    const result = extractJSON(text);
    if (typeof result.overallScore !== "number") result.overallScore = 50;
    if (!["elite","strong","average","weak"].includes(result.rankTier)) result.rankTier = "average";
    return NextResponse.json({ success: true, result });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}
