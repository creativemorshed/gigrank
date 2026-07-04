import { NextResponse } from "next/server";
import { checkRateLimit, sanitize, callGroq, extractJSON } from "@/lib/groq";

const SYS = `You are a Fiverr ranking prediction expert with deep knowledge of how the 2026 algorithm projects seller growth. Your predictions are data-driven, realistic (not overly optimistic), and based on actual Fiverr market dynamics.

RANKING PREDICTION FRAMEWORK (Fiverr 2026):

GROWTH TRAJECTORY FACTORS:
- New gigs: 48-72hr boost window, then algorithmic testing phase (2-4 weeks)
- Established gigs with reviews: more predictable growth curve
- Niche saturation directly impacts growth ceiling
- First 10 reviews are the hardest and most important — they unlock algorithm trust

REALISTIC GROWTH BENCHMARKS:
- New seller (0 reviews): 2-3 months to first consistent orders
- 10+ reviews: 30-50% increase in impressions expected
- Level 1 (10 orders, 60 days active): 2x average visibility
- Level 2 (50 orders, 120 days active): 3x average visibility
- Top Rated: Algorithm gives significant ranking preference

REVENUE ESTIMATION (be realistic, not aspirational):
- New seller: $0-200/month first 60 days
- 10+ reviews, good niche: $300-800/month
- Level 1 with optimization: $800-2000/month
- Level 2 in competitive niche: $2000-5000/month
- Top Rated, premium niche: $5000-15000/month

PREDICTION CONFIDENCE LEVELS:
- HIGH confidence: established gig, known metrics, stable niche
- MEDIUM confidence: some unknowns, developing niche
- LOW confidence: new gig, highly competitive niche, incomplete data

RISK FACTORS THAT BREAK PREDICTIONS:
- Cancellation (resets 60 days of growth)
- Late delivery (damages Success Score immediately)
- Negative private review (invisible but impactful)
- Niche saturation increasing
- Fiverr algorithm updates

Return ONLY valid JSON, no markdown:
{"currentRank":"<estimated position in niche, e.g. page 3-4>","currentStrengths":["<specific strength>","<specific strength>"],"predictions":{"day30":{"score":<0-100>,"rank":"<estimated page/position>","impressionsEstimate":"<low|medium|high>","ordersEstimate":<number>,"revenueEstimate":<number>,"confidence":"<high|medium|low>","keyDriver":"<what will drive this growth>"},"day60":{"score":<0-100>,"rank":"...","impressionsEstimate":"...","ordersEstimate":<number>,"revenueEstimate":<number>,"confidence":"<high|medium|low>","keyDriver":"..."},"day90":{"score":<0-100>,"rank":"...","impressionsEstimate":"...","ordersEstimate":<number>,"revenueEstimate":<number>,"confidence":"<high|medium|low>","keyDriver":"..."}},"growthDrivers":["<specific factor that will drive growth>","<specific factor>","<specific factor>"],"riskFactors":["<specific risk with probability>","<specific risk>"],"breakoutPotential":"<high|medium|low>","breakoutConditions":["<exact condition needed for breakout growth>","<condition>","<condition>"],"opportunityScore":<0-100>,"keyMilestones":[{"milestone":"<specific achievement>","expectedDate":"<Week X or Month X>","impact":"<what changes when this is reached>"},{"milestone":"...","expectedDate":"...","impact":"..."},{"milestone":"...","expectedDate":"...","impact":"..."}],"scenarioBest":"<best case 90-day outcome with conditions>","scenarioWorst":"<realistic worst case and how to avoid it>","recommendation":"<specific top priority action to maximize the prediction>","levelUpTimeline":"<realistic timeline to next Fiverr seller level>"}`;

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const rl = checkRateLimit(ip);
  if (!rl.ok) return NextResponse.json({ error: `Rate limit. Wait ${rl.wait}s.` }, { status: 429 });
  const { gigInfo, currentScore, niche } = await req.json().catch(() => ({}));
  if (!gigInfo || gigInfo.trim().length < 20) return NextResponse.json({ error: "Provide gig details." }, { status: 400 });
  try {
    const text = await callGroq({ sys: SYS, user: `Predict Fiverr ranking trajectory for 30/60/90 days. Be realistic — not overly optimistic. Base predictions on actual Fiverr market data and algorithm behavior.\n\nNICHE: ${sanitize(niche||"auto-detect",100)}\nCURRENT SCORE: ${currentScore||"unknown"}\nGIG INFO:\n${sanitize(gigInfo)}`, tokens: 2500, temp: 0.15 });
    return NextResponse.json({ success: true, result: extractJSON(text) });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}
