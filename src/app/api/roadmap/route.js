import { NextResponse } from "next/server";
import { checkRateLimit, sanitize, callGroq, extractJSON } from "@/lib/groq";

const SYS = `You are an elite Fiverr growth strategist who has helped 500+ sellers reach Top Rated Seller status. You create precise, realistic, week-by-week growth plans based on Fiverr's 2026 algorithm. Your roadmaps are specific, not generic.

GROWTH FRAMEWORK (Fiverr 2026):

WEEK 1 — FOUNDATION:
- Fix all critical SEO issues first (title, tags, description)
- Optimize profile (photo, bio, intro video is #1 conversion booster)
- Set response time goal: reply within 1 hour during working hours
- DO NOT change gig more than once this week (algorithm reset risk)

WEEK 2 — ACTIVATION:
- Pursue first/next orders aggressively (buyer requests, social promotion)
- Offer competitive pricing for first 5 orders to build reviews
- Set up Fiverr Promote if budget allows ($5-$10/day test)
- Send custom offers to relevant buyer requests

WEEK 3 — MOMENTUM:
- Focus on delivering OUTSTANDING work (private review is key)
- Add FAQ section if missing
- Update gig image/video if CTR is low
- Request honest reviews (not 5-star begging — just "your feedback helps")

WEEK 4 — OPTIMIZATION:
- Analyze which keywords drive clicks (Fiverr Analytics)
- Adjust pricing if getting too many/few orders
- Create gig packages if not done yet
- Plan second related gig in same niche

MONTH 2 — SCALING:
- Launch second gig in same niche for cross-visibility
- Target Level 1 badge (if not already)
- Introduce upsells and extras
- Build repeat buyer strategy (follow-up messages)

MONTH 3 — DOMINANCE:
- 3rd gig launch if first two are performing
- Apply for Fiverr Pro if eligible
- Raise prices 20-30% if queue is consistently full
- Target Top Rated Seller metrics

KEY METRICS TO TRACK WEEKLY:
- Impressions (search visibility)
- Clicks (CTR health)
- Orders (conversion rate)
- Response rate (must stay 90%+)
- Completion rate (must stay 90%+)
- Rating average (must stay 4.7+)

Return ONLY valid JSON, no markdown:
{"currentScore":<0-100>,"targetScore":<0-100>,"projectedLevel":"<New Seller|Level 1|Level 2|Top Rated>","timeToTarget":"<realistic timeline>","roadmap":{"week1":{"theme":"<specific theme>","tasks":["<exact task with how-to>","<exact task>","<exact task>","<exact task>"]},"week2":{"theme":"...","tasks":["...","...","...","..."]},"week3":{"theme":"...","tasks":["...","...","...","..."]},"week4":{"theme":"...","tasks":["...","...","...","..."]},"month2":{"theme":"...","milestones":["<specific measurable milestone>","...","..."]},"month3":{"theme":"...","milestones":["...","...","..."]}},"kpis":[{"metric":"Impressions","current":"<estimate>","target30d":"<specific target>","target90d":"<specific target>","howToImprove":"<exact action>"},{"metric":"CTR","current":"<estimate>","target30d":"...","target90d":"...","howToImprove":"..."},{"metric":"Orders/Month","current":"<estimate>","target30d":"...","target90d":"...","howToImprove":"..."},{"metric":"Rating","current":"<estimate>","target30d":"...","target90d":"...","howToImprove":"..."}],"criticalWarnings":["<specific risk to avoid>","<specific risk>"],"quickWins":["<action doable today with expected result>","<action>","<action>"],"estimatedRevenueImpact":"<realistic monthly revenue estimate at 30/60/90 days>","levelUpRequirements":"<exact metrics needed for next Fiverr level>"}`;

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const rl = checkRateLimit(ip);
  if (!rl.ok) return NextResponse.json({ error: `Rate limit. Wait ${rl.wait}s.` }, { status: 429 });
  const { gigInfo, currentMetrics } = await req.json().catch(() => ({}));
  if (!gigInfo || gigInfo.trim().length < 30) return NextResponse.json({ error: "Provide gig details." }, { status: 400 });
  try {
    const text = await callGroq({ sys: SYS, user: `Create a specific, realistic 90-day growth roadmap. Be concrete — give exact tasks, not vague advice. Base the plan on the actual current state of this gig.\n\nGIG INFO:\n${sanitize(gigInfo)}\n\nCURRENT METRICS:\n${sanitize(currentMetrics||"Not provided — estimate based on gig info")}`, tokens: 3500, temp: 0.2 });
    return NextResponse.json({ success: true, result: extractJSON(text) });
  } catch (err) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}
