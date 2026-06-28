"use client";
import { useState, useEffect, useCallback } from "react";

// ─────────────────────────────────────────
//  TRANSLATIONS
// ─────────────────────────────────────────
const T = {
    buyCredits:"BUY CREDITS", creditsLabel:"CREDITS",
    tagline:"FIVERR GROWTH INTELLIGENCE — 2026 ALGORITHM",
    h1a:"GIG RANK", h1b:"ANALYZER",
    desc:"AI-powered Fiverr growth platform. Analyze gigs, spy on competitors, predict rankings, rewrite content, and generate 90-day growth roadmaps — powered by Fiverr's 2026 algorithm.",
    selectModule:"SELECT A MODULE",
    noCredits:"No Credits", noCreditsDesc:"Purchase a plan → receive License Key via email → redeem to activate credits.",
    getCredits:"GET CREDITS →",
    modules:[
      {label:"Gig Analyzer",    desc:"Full 2026 algorithm analysis"},
      {label:"Competitor Spy",  desc:"Compare vs top competitors"},
      {label:"Rank Predictor",  desc:"30/60/90 day forecast"},
      {label:"Gig Rewriter",    desc:"AI-optimized title, desc, tags"},
      {label:"Growth Roadmap",  desc:"90-day step-by-step plan"},
      {label:"Keyword Research",desc:"Find ranking keywords"},
    ],
    credit:"credit", credits2:"credits",
    urlTab:"🔗 GIG URL", pasteTab:"📋 PASTE INFO",
    gigUrlLabel:"FIVERR GIG URL", gigUrlPlaceholder:"https://www.fiverr.com/username/gig-title",
    gigInfoLabel:"GIG INFO — MORE DETAIL = BETTER ANALYSIS",
    analyzeBtn:"ANALYZE GIG RANKING →", analyzingBtn:"ANALYZING...",
    myGigLabel:"YOUR GIG INFO", compLabel:"COMPETITOR GIGS (paste 2-5 competitors)",
    spyBtn:"SPY ON COMPETITORS →", spyingBtn:"ANALYZING...",
    nicheLabel:"NICHE / CATEGORY", nichePlaceholder:"e.g. Logo Design, WordPress, Video Editing...",
    scoreLabel:"CURRENT SCORE (optional)", scorePlaceholder:"e.g. 72 (from Gig Analyzer)",
    gigDetailsLabel:"GIG DETAILS",
    predictBtn:"PREDICT RANKING POTENTIAL →", predictingBtn:"PREDICTING...",
    kwLabel:"TARGET KEYWORD", kwPlaceholder:"e.g. minimalist logo design",
    nicheLabel2:"NICHE", nichePlaceholder2:"e.g. Logo Design",
    contentLabel:"CURRENT GIG CONTENT (title + description + tags)",
    rewriteBtn:"REWRITE GIG CONTENT →", rewritingBtn:"REWRITING...",
    gigInfoLabel2:"GIG INFO", metricsLabel:"CURRENT METRICS (optional)",
    roadmapBtn:"GENERATE 90-DAY ROADMAP →", generatingBtn:"BUILDING ROADMAP...",
    nicheServiceLabel:"NICHE / SERVICE TYPE *", nicheServicePlaceholder:"e.g. Logo Design, SEO, WordPress...",
    titleLabel:"CURRENT GIG TITLE (optional)", audienceLabel:"TARGET AUDIENCE (optional)",
    audiencePlaceholder:"e.g. Startups, E-commerce, YouTubers...",
    keywordBtn:"FIND RANKING KEYWORDS →", keywordingBtn:"RESEARCHING...",
    tryAgain:"← TRY AGAIN", allModules:"← ALL MODULES", running:"Running",
    // modal
    getCreditsTitle:"Get Analysis Credits", creditDesc:"1 credit = 1 module use. Credits never expire.",
    howTitle:"How it works:", howDesc:"Purchase a plan → receive a License Key via email → enter key below to activate credits.",
    popular:"POPULAR", buyNow:"BUY NOW →",
    redeemTitle:"REDEEM LICENSE KEY", redeemDesc:"Enter the key you received via email after purchase.",
    redeemPlaceholder:"XXXX-XXXX-XXXX-XXXX", checking:"CHECKING...", redeemBtn:"REDEEM",
    invalidKey:"Invalid key format. Example: ABCD-1234-EFGH-5678",
    alreadyUsed:"This key has already been redeemed on this device.",
    verifying:"Verifying key...", networkErr:"Network error. Please try again.",
    // results
    algoFactors:"ALGO FACTORS", seoAudit:"SEO AUDIT", actionPlan:"ACTION PLAN",
    topWins:"TOP WINS", criticalIssues:"CRITICAL ISSUES",
    algoBreakdown:"2026 ALGORITHM FACTOR BREAKDOWN",
    titleSeo:"TITLE SEO ANALYSIS", currentTitleLabel:"CURRENT TITLE",
    kwAtStart:"Keyword at Start", slugOk:"Slug Optimized",
    suggestedTitle:"✨ SUGGESTED OPTIMIZED TITLE",
    gigTagsLabel:"GIG TAGS", missingKw:"💡 MISSING HIGH-VALUE KEYWORDS",
    slugAnalysisLabel:"🆕 2026 — GIG URL SLUG ANALYSIS",
    pricingLabel:"🆕 2026 — PRICING SIGNAL",
    actionPlanLabel:"PRIORITIZED ACTION PLAN",
    algoNoteLabel:"📌 ALGORITHM NOTE", freshnessLabel:"🆕 2026 — GIG FRESHNESS STRATEGY",
    multiGigLabel:"🆕 2026 — MULTI-GIG STRATEGY", compEdge:"🎯 COMPETITOR EDGE",
    marketOverview:"MARKET OVERVIEW", yourAdvantages:"YOUR ADVANTAGES", yourGaps:"YOUR GAPS",
    compBreakdown:"COMPETITOR BREAKDOWN", pricingBench:"💰 PRICING BENCHMARK",
    marketGaps:"🎯 MARKET GAPS", winStrategy:"🏆 WINNING STRATEGY",
    currentScore:"CURRENT SCORE", targetScore:"TARGET SCORE", projectedLevel:"PROJECTED LEVEL",
    weekRoadmap:"📅 4-WEEK ROADMAP", kpiTargets:"📊 KPI TARGETS",
    revenueImpact:"💰 ESTIMATED REVENUE IMPACT",
    primaryKw:"🎯 PRIMARY KEYWORD", nicheOpp:"📈 NICHE OPPORTUNITY",
    kwOpportunities:"🔑 KEYWORD OPPORTUNITIES (10)", suggestedTitleLabel:"✨ SUGGESTED TITLE",
    suggestedTagsLabel:"🏷️ SUGGESTED TAGS (5/5)", seasonalTips:"📅 SEASONAL TIPS",
    avoidKw:"🚫 AVOID KEYWORDS",
    optimizedTitle:"✨ OPTIMIZED TITLE", optimizedTags:"🏷️ OPTIMIZED TAGS (5/5)",
    optimizedDesc:"📝 OPTIMIZED DESCRIPTION", packageSug:"💼 PACKAGE SUGGESTIONS",
    faqsSug:"❓ SUGGESTED FAQs", expectedImp:"📈 EXPECTED IMPROVEMENT",
    copy:"COPY", copied:"COPIED ✓",
    orders:"orders", confidence:"Confidence",
    growthDrivers:"GROWTH DRIVERS", riskFactors:"RISK FACTORS",
    keyMilestones:"KEY MILESTONES", recommendation:"📊 RECOMMENDATION",
    week:"WEEK", month:"MONTH", current:"Current", d30:"30 Days", d90:"90 Days",
    highImpact:"HIGH IMPACT", medImpact:"MEDIUM IMPACT",
    strong:"STRONG", avg:"AVG", weak:"WEAK", low:"LOW", med:"MEDIUM", high:"HIGH",
    minPrice:"Suggested minimum",
    quickFillBtn:"Quick Fill (optional)",
    quickFillHint:"Add extra info for better analysis",
    quickFillDesc:"Optional extra info for better analysis",
    qfTitle:"GIG TITLE", qfRating:"RATING", qfReviews:"REVIEWS",
    qfLevel:"SELLER LEVEL", qfPrice:"STARTING PRICE ($)",
    qfDelivery:"DELIVERY (days)", qfResponse:"RESPONSE TIME",
    qfOrders:"ORDERS IN QUEUE", qfTags:"TAGS",
  }
};


// ─────────────────────────────────────────
//  THEMES
// ─────────────────────────────────────────
const THEMES = {
  dark:  { bg:"#030712", surface:"#0a0f1e", border:"#1e293b", text:"#e2e8f0", muted:"#475569", sub:"#94a3b8", input:"#030712", nav:"rgba(3,7,18,0.92)", grid:"#1e293b" },
  light: { bg:"#f8fafc", surface:"#ffffff",  border:"#e2e8f0", text:"#0f172a", muted:"#64748b", sub:"#475569",  input:"#f1f5f9", nav:"rgba(248,250,252,0.95)", grid:"#cbd5e1" },
};

// ─────────────────────────────────────────
//  CONSTANTS
// ─────────────────────────────────────────
const MODULES = [
  {id:"analyzer",  icon:"◈", cost:1, color:"#00d4aa"},
  {id:"competitor",icon:"◎", cost:2, color:"#0ea5e9"},
  {id:"predict",   icon:"◬", cost:1, color:"#7c3aed"},
  {id:"rewriter",  icon:"✦", cost:2, color:"#f59e0b"},
  {id:"roadmap",   icon:"▲", cost:3, color:"#ef4444"},
  {id:"keyword",   icon:"⬡", cost:1, color:"#10b981"},
];
const FACTORS = [
  {key:"successScore",      label:"Success Score",      w:22, color:"#ff6b35"},
  {key:"ctr",               label:"CTR",                w:18, color:"#00d4aa"},
  {key:"buyerSatisfaction", label:"Buyer Satisfaction", w:13, color:"#7c3aed"},
  {key:"gigSEO",            label:"Gig SEO",            w:10, color:"#0ea5e9"},
  {key:"repeatBuyers",      label:"Repeat Buyers",      w:9,  color:"#f59e0b"},
  {key:"deliveryTime",      label:"On-Time Delivery",   w:8,  color:"#10b981"},
  {key:"responseRate",      label:"Response Rate",      w:6,  color:"#ec4899"},
  {key:"profileComplete",   label:"Profile Complete",   w:4,  color:"#8b5cf6"},
  {key:"gigSlug",           label:"Gig URL Slug",       w:4,  color:"#06b6d4", isNew:true},
  {key:"orderValue",        label:"Order Value Signal", w:3,  color:"#84cc16", isNew:true},
  {key:"gigFreshness",      label:"Gig Freshness",      w:3,  color:"#fb923c", isNew:true},
];
const PLANS = [
  {name:"STARTER", credits:10, price:4.99,  per:0.50, stripe:"https://buy.stripe.com/your-starter-link", features:["10 analyses","All 7 modules","2026 algorithm","Never expire"]},
  {name:"PRO",     credits:30, price:9.99,  per:0.33, stripe:"https://buy.stripe.com/your-pro-link",     popular:true, features:["30 analyses","All 7 modules","2026 algorithm","Never expire"]},
  {name:"AGENCY",  credits:100,price:24.99, per:0.25, stripe:"https://buy.stripe.com/your-agency-link",  features:["100 analyses","All 7 modules","2026 algorithm","Never expire"]},
];

// ─────────────────────────────────────────
//  CREDIT HELPERS
// ─────────────────────────────────────────
const gc  = () => parseInt(localStorage.getItem("gr_c")||"0",10);
const sc  = n  => localStorage.setItem("gr_c", Math.max(0,n).toString());
const add = n  => sc(gc()+n);
const use = n  => sc(gc()-n);

// ─────────────────────────────────────────
//  SMALL COMPONENTS
// ─────────────────────────────────────────
function Box({children,style}){ return <div style={style}>{children}</div>; }

function Pill({text,color}){
  return <span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:20,fontFamily:"'Syne',sans-serif",letterSpacing:1,background:`${color}22`,color}}>{text}</span>;
}

function InfoBox({label,text,color="#7c3aed",th}){
  return(
    <div style={{borderRadius:14,padding:"16px 18px",marginBottom:10,background:`${color}08`,border:`1px solid ${color}22`}}>
      <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:3,color,marginBottom:8}}>{label}</div>
      <div style={{fontSize:12,color:th.sub,lineHeight:1.7}}>{text}</div>
    </div>
  );
}

function WinLoss({wins=[],losses=[],wLabel,lLabel,th}){
  return(
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
      <div style={{background:"rgba(0,212,170,0.04)",border:"1px solid rgba(0,212,170,0.12)",borderRadius:14,padding:16}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:3,color:"#00d4aa",marginBottom:10}}>{wLabel}</div>
        {wins.map((w,i)=><div key={i} style={{fontSize:12,color:th.sub,marginBottom:7,paddingLeft:14,position:"relative"}}><span style={{position:"absolute",left:0,color:"#00d4aa"}}>✓</span>{w}</div>)}
      </div>
      <div style={{background:"rgba(239,68,68,0.04)",border:"1px solid rgba(239,68,68,0.12)",borderRadius:14,padding:16}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:3,color:"#ef4444",marginBottom:10}}>{lLabel}</div>
        {losses.map((w,i)=><div key={i} style={{fontSize:12,color:th.sub,marginBottom:7,paddingLeft:14,position:"relative"}}><span style={{position:"absolute",left:0,color:"#ef4444"}}>✗</span>{w}</div>)}
      </div>
    </div>
  );
}

function ScoreRing({score=0,tier="average"}){
  const cols={elite:"#00d4aa",strong:"#0ea5e9",average:"#f59e0b",weak:"#ef4444"};
  const c=cols[tier]||"#f59e0b";
  const circ=326.7;
  return(
    <svg width="130" height="130" viewBox="0 0 140 140">
      <defs>
        <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c}/><stop offset="100%" stopColor={c+"88"}/>
        </linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <circle cx="70" cy="70" r="52" fill="none" stroke="#1e293b" strokeWidth="10"/>
      <circle cx="70" cy="70" r="52" fill="none" stroke="url(#sg)" strokeWidth="10"
        strokeDasharray={circ} strokeDashoffset={circ-(score/100)*circ}
        strokeLinecap="round" transform="rotate(-90 70 70)" filter="url(#glow)"
        style={{transition:"stroke-dashoffset 1.2s ease"}}/>
      <text x="70" y="64" textAnchor="middle" fill={c} fontSize="30" fontWeight="900" fontFamily="'Syne',sans-serif">{score}</text>
      <text x="70" y="80" textAnchor="middle" fill="#475569" fontSize="11" fontFamily="'Syne',sans-serif">/100</text>
      <text x="70" y="97" textAnchor="middle" fill={c} fontSize="9" fontWeight="700" letterSpacing="2" fontFamily="'Syne',sans-serif">{tier.toUpperCase()}</text>
    </svg>
  );
}

function FactorBar({f,data,t,th}){
  const score=data?.score??50;
  const good=score>=70,mid=score>=45;
  const c=good?"#00d4aa":mid?"#f59e0b":"#ef4444";
  const status=good?t.strong:mid?t.avg:t.weak;
  const uc=data?.urgency==="high"?"#ef4444":data?.urgency==="medium"?"#f59e0b":"#00d4aa";
  return(
    <div style={{borderRadius:12,padding:"12px 14px",marginBottom:8,background:`${c}0a`,border:`1px solid ${c}20`}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
        <span style={{color:f.color,fontSize:16}}>●</span>
        <div style={{flex:1,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:12,color:th.text}}>
            {f.label}{f.isNew&&<span style={{fontSize:8,background:"#00d4aa22",color:"#00d4aa",padding:"1px 5px",borderRadius:4,marginLeft:4}}>NEW</span>}
          </span>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <span style={{fontSize:10,color:th.muted,fontFamily:"monospace"}}>{f.w}%</span>
            <Pill text={status} color={c}/>
          </div>
        </div>
      </div>
      <div style={{height:5,background:th.bg,borderRadius:5,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${score}%`,borderRadius:5,background:`linear-gradient(90deg,${c},${c}88)`,boxShadow:`0 0 10px ${c}66`,transition:"width 1s ease"}}/>
      </div>
      <div style={{fontSize:11,color:th.muted,marginTop:6,display:"flex",gap:8}}>
        <Pill text={(data?.urgency||"low").toUpperCase()} color={uc}/>
        {data?.insight}
      </div>
    </div>
  );
}

function ActionList({actions=[],t,th}){
  return actions.map((q,i)=>{
    const ic=q.impact==="high"?"#00d4aa":"#f59e0b";
    const tc=q.timeframe==="24h"?"#ef4444":q.timeframe==="1week"?"#f59e0b":th.muted;
    return(
      <div key={i} style={{background:th.bg,border:`1px solid ${th.border}`,borderRadius:12,padding:16,marginBottom:10}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
          <div style={{width:26,height:26,borderRadius:"50%",background:th.surface,border:`1px solid ${th.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:900,color:th.muted,flexShrink:0}}>{i+1}</div>
          <Pill text={q.impact==="high"?t.highImpact:t.medImpact} color={ic}/>
          <Pill text={`⏱ ${q.timeframe||""}`} color={tc}/>
        </div>
        <div style={{fontSize:13,color:th.text,lineHeight:1.6,paddingLeft:34}}>{q.action}</div>
      </div>
    );
  });
}

// ─────────────────────────────────────────
//  RESULT VIEWS
// ─────────────────────────────────────────
function AnalyzerResult({r,t,th}){
  const [tab,setTab]=useState("factors");
  const cols={elite:"#00d4aa",strong:"#0ea5e9",average:"#f59e0b",weak:"#ef4444"};
  const c=cols[r.rankTier]||"#f59e0b";
  const tabs=[{k:"factors",l:t.algoFactors},{k:"seo",l:t.seoAudit},{k:"action",l:t.actionPlan}];
  return(
    <div>
      <div style={{borderRadius:20,padding:28,marginBottom:12,display:"flex",alignItems:"center",gap:24,flexWrap:"wrap",background:`${c}08`,border:`1px solid ${c}20`}}>
        <ScoreRing score={r.overallScore} tier={r.rankTier}/>
        <div style={{flex:1,minWidth:200}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:10,fontWeight:800,letterSpacing:3,color:c,marginBottom:8}}>{(r.rankTier||"").toUpperCase()} RANKING</div>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(16px,3vw,22px)",fontWeight:900,color:th.text,lineHeight:1.2,marginBottom:10}}>{r.gigTitle}</div>
          <div style={{fontSize:12,color:th.muted,marginBottom:10}}>{r.sellerUsername?`@${r.sellerUsername}`:""}{r.niche?` · ${r.niche}`:""}</div>
          <div style={{fontSize:13,color:th.sub,lineHeight:1.7}}>{r.executiveSummary}</div>
        </div>
      </div>
      <div style={{display:"flex",gap:4,background:th.surface,border:`1px solid ${th.border}`,borderRadius:12,padding:4,marginBottom:12}}>
        {tabs.map(tb=>(
          <button key={tb.k} onClick={()=>setTab(tb.k)} style={{flex:1,background:tab===tb.k?th.border:"none",border:"none",cursor:"pointer",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:10,letterSpacing:1.5,padding:"8px 12px",borderRadius:6,color:tab===tb.k?th.text:th.muted,transition:"all 0.2s"}}>{tb.l}</button>
        ))}
      </div>
      {tab==="factors"&&(
        <div>
          <WinLoss wins={r.topWins} losses={r.criticalIssues} wLabel={t.topWins} lLabel={t.criticalIssues} th={th}/>
          <div style={{background:th.surface,border:`1px solid ${th.border}`,borderRadius:14,padding:"20px 22px",marginBottom:12}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:3,color:th.muted,marginBottom:12}}>{t.algoBreakdown}</div>
            {FACTORS.map(f=><FactorBar key={f.key} f={f} data={r.algorithmFactors?.[f.key]} t={t} th={th}/>)}
          </div>
          {r.competitorEdge&&<InfoBox label={t.compEdge} text={r.competitorEdge} color="#0ea5e9" th={th}/>}
        </div>
      )}
      {tab==="seo"&&(
        <div>
          <div style={{background:th.surface,border:`1px solid ${th.border}`,borderRadius:14,padding:20,marginBottom:12}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:3,color:th.muted,marginBottom:12}}>{t.titleSeo}</div>
            <div style={{fontSize:10,color:th.muted,marginBottom:6}}>{t.currentTitleLabel}</div>
            <div style={{background:th.bg,borderRadius:8,padding:"10px 12px",fontFamily:"monospace",fontSize:13,color:th.text,marginBottom:12}}>{r.titleAnalysis?.currentTitle||"—"}</div>
            <div style={{display:"flex",gap:8,marginBottom:14}}>
              {[{l:t.kwAtStart,ok:r.titleAnalysis?.hasMainKeywordFirst},{l:t.slugOk,ok:r.titleAnalysis?.slugOptimized}].map((ch,i)=>(
                <div key={i} style={{flex:1,background:ch.ok?"rgba(0,212,170,0.06)":"rgba(239,68,68,0.06)",border:`1px solid ${ch.ok?"#00d4aa33":"#ef444433"}`,borderRadius:8,padding:"10px 12px",textAlign:"center"}}>
                  <div style={{fontSize:18,marginBottom:4}}>{ch.ok?"✅":"❌"}</div>
                  <div style={{fontSize:10,color:th.muted}}>{ch.l}</div>
                </div>
              ))}
            </div>
            <div style={{fontSize:10,color:"#00d4aa",marginBottom:6}}>{t.suggestedTitle}</div>
            <div style={{background:"rgba(0,212,170,0.06)",border:"1px solid rgba(0,212,170,0.25)",borderRadius:8,padding:"10px 12px",fontFamily:"monospace",fontSize:13,color:"#00d4aa"}}>{r.titleAnalysis?.suggestedTitle||"—"}</div>
          </div>
          {r.titleAnalysis?.slugAnalysis&&<InfoBox label={t.slugAnalysisLabel} text={r.titleAnalysis.slugAnalysis} color="#06b6d4" th={th}/>}
          <div style={{background:th.surface,border:`1px solid ${th.border}`,borderRadius:14,padding:20,marginBottom:12}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:3,color:th.muted,marginBottom:12}}>{t.gigTagsLabel}</div>
            <div style={{marginBottom:12}}>{(r.tagAnalysis?.detectedTags||[]).map((tg,i)=><span key={i} style={{borderRadius:20,padding:"4px 12px",fontSize:11,display:"inline-block",margin:"3px 3px",background:"rgba(0,212,170,0.08)",border:"1px solid #00d4aa33",color:"#00d4aa"}}>{tg}</span>)}</div>
            <div style={{fontSize:10,color:"#f59e0b",marginBottom:8}}>{t.missingKw}</div>
            {(r.tagAnalysis?.missingKeywords||[]).map((tg,i)=><span key={i} style={{borderRadius:20,padding:"4px 12px",fontSize:11,display:"inline-block",margin:"3px 3px",background:"rgba(245,158,11,0.08)",border:"1px solid #f59e0b33",color:"#f59e0b"}}>+ {tg}</span>)}
          </div>
          {r.pricingAnalysis?.insight&&(
            <div style={{background:th.surface,border:`1px solid ${th.border}`,borderRadius:14,padding:20,marginBottom:12}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:3,color:"#84cc16",marginBottom:12}}>{t.pricingLabel}</div>
              <div style={{fontSize:12,color:th.sub,lineHeight:1.7}}>
                <Pill text={(r.pricingAnalysis.currentPricing||"").toUpperCase()} color="#84cc16"/>
                {r.pricingAnalysis.suggestedMinPrice&&<span style={{color:"#84cc16",fontWeight:700,marginLeft:8}}>{t.minPrice}: ${r.pricingAnalysis.suggestedMinPrice}</span>}
                <br/><br/>{r.pricingAnalysis.insight}
              </div>
            </div>
          )}
        </div>
      )}
      {tab==="action"&&(
        <div>
          <div style={{background:th.surface,border:`1px solid ${th.border}`,borderRadius:14,padding:"20px 22px",marginBottom:12}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:3,color:th.muted,marginBottom:12}}>{t.actionPlanLabel}</div>
            <ActionList actions={r.quickWins} t={t} th={th}/>
          </div>
          {r.algorithmNote&&<InfoBox label={t.algoNoteLabel} text={r.algorithmNote} color="#7c3aed" th={th}/>}
          {r.freshnessTip&&<InfoBox label={t.freshnessLabel} text={r.freshnessTip} color="#fb923c" th={th}/>}
          {r.multiGigStrategy&&<InfoBox label={t.multiGigLabel} text={r.multiGigStrategy} color="#84cc16" th={th}/>}
        </div>
      )}
    </div>
  );
}

function CompetitorResult({r,t,th}){
  return(
    <div>
      <div style={{background:th.surface,border:`1px solid ${th.border}`,borderRadius:14,padding:"20px 22px",marginBottom:12}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:3,color:"#0ea5e9",marginBottom:8}}>{t.marketOverview}</div>
        <div style={{fontSize:13,color:th.sub,lineHeight:1.7}}>{r.marketOverview}</div>
      </div>
      <WinLoss wins={r.yourAdvantages} losses={r.yourGaps} wLabel={t.yourAdvantages} lLabel={t.yourGaps} th={th}/>
      <div style={{background:th.surface,border:`1px solid ${th.border}`,borderRadius:14,padding:"20px 22px",marginBottom:12}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:3,color:th.muted,marginBottom:12}}>{t.compBreakdown}</div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead><tr>{["Gig","Score","Price","Reviews","Key Edge"].map(h=><th key={h} style={{textAlign:"left",padding:"8px 12px",fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:2,color:th.muted,borderBottom:`1px solid ${th.border}`}}>{h}</th>)}</tr></thead>
            <tbody>{(r.competitors||[]).map((c,i)=>(
              <tr key={i}>
                <td style={{padding:"10px 12px",borderBottom:`1px solid ${th.border}`,color:th.sub,verticalAlign:"top"}}><div style={{fontWeight:600,color:th.text}}>{c.gigTitle}</div><div style={{color:th.muted,fontSize:11}}>@{c.sellerUsername}</div></td>
                <td style={{padding:"10px 12px",borderBottom:`1px solid ${th.border}`,color:th.sub,verticalAlign:"top"}}><span style={{color:c.overallScore>=70?"#00d4aa":c.overallScore>=45?"#f59e0b":"#ef4444",fontWeight:700,fontFamily:"'Syne',sans-serif"}}>{c.overallScore}</span></td>
                <td style={{padding:"10px 12px",borderBottom:`1px solid ${th.border}`,color:th.sub,verticalAlign:"top"}}>{c.pricePoint}</td>
                <td style={{padding:"10px 12px",borderBottom:`1px solid ${th.border}`,color:th.sub,verticalAlign:"top"}}>{c.reviewScore}⭐({c.reviewCount})</td>
                <td style={{padding:"10px 12px",borderBottom:`1px solid ${th.border}`,color:th.sub,verticalAlign:"top"}}>{c.keyDifferentiator}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
        <InfoBox label={t.pricingBench} text={`Low: $${r.pricingBenchmark?.lowest} · Avg: $${r.pricingBenchmark?.average} · High: $${r.pricingBenchmark?.highest}\n\n${r.pricingBenchmark?.recommendation||""}`} color="#f59e0b" th={th}/>
        <InfoBox label={t.marketGaps} text={(r.marketGaps||[]).join("\n\n")} color="#00d4aa" th={th}/>
      </div>
      <InfoBox label={t.winStrategy} text={r.winningStrategy} color="#0ea5e9" th={th}/>
    </div>
  );
}

function PredictResult({r,t,th}){
  const days=[{l:"30",d:r.predictions?.day30,c:"#f59e0b"},{l:"60",d:r.predictions?.day60,c:"#0ea5e9"},{l:"90",d:r.predictions?.day90,c:"#00d4aa"}];
  return(
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:12}}>
        {days.map(({l,d,c})=>(
          <div key={l} style={{background:`${c}08`,border:`1px solid ${c}22`,borderRadius:14,padding:18,textAlign:"center"}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:3,color:c,marginBottom:12}}>{l} {t.week.toUpperCase()}</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:36,fontWeight:900,color:c,lineHeight:1}}>{d?.score||"—"}</div>
            <div style={{fontSize:10,color:th.muted,marginBottom:12}}>/100</div>
            <div style={{fontSize:11,color:th.sub,marginBottom:6}}>📦 ~{d?.ordersEstimate||0} {t.orders}</div>
            <div style={{fontSize:11,color:"#84cc16",marginBottom:8}}>💰 ~${d?.revenueEstimate||0}</div>
            <Pill text={`${t.confidence}: ${d?.confidence||"—"}`} color={c}/>
          </div>
        ))}
      </div>
      <WinLoss wins={r.growthDrivers} losses={r.riskFactors} wLabel={t.growthDrivers} lLabel={t.riskFactors} th={th}/>
      <div style={{background:th.surface,border:`1px solid ${th.border}`,borderRadius:14,padding:"20px 22px",marginBottom:12}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:3,color:th.muted,marginBottom:12}}>{t.keyMilestones}</div>
        {(r.keyMilestones||[]).map((m,i)=>(
          <div key={i} style={{background:th.bg,border:`1px solid ${th.border}`,borderRadius:12,padding:16,marginBottom:8}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:"#00d4aa",marginBottom:4}}>{m.milestone}</div>
            <div style={{fontSize:11,color:th.muted}}>Expected: {m.expectedDate} · {m.impact}</div>
          </div>
        ))}
      </div>
      <InfoBox label={t.recommendation} text={r.recommendation} color="#7c3aed" th={th}/>
    </div>
  );
}

function RewriterResult({r,t,th}){
  const [copied,setCopied]=useState("");
  const cp=(text,k)=>{ navigator.clipboard.writeText(text); setCopied(k); setTimeout(()=>setCopied(""),2000); };
  const CopyBtn=({text,k})=>(
    <button onClick={()=>cp(text,k)} style={{background:copied===k?"#00d4aa22":"transparent",border:`1px solid ${copied===k?"#00d4aa":th.border}`,borderRadius:6,padding:"4px 10px",color:copied===k?"#00d4aa":th.muted,fontSize:10,cursor:"pointer",fontFamily:"'Syne',sans-serif",fontWeight:700}}>
      {copied===k?t.copied:t.copy}
    </button>
  );
  return(
    <div>
      <div style={{background:th.surface,border:`1px solid ${th.border}`,borderRadius:14,padding:20,marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:3,color:th.muted}}>{t.optimizedTitle}</div>
          <CopyBtn text={r.optimizedTitle} k="title"/>
        </div>
        <div style={{background:th.bg,borderRadius:8,padding:"12px 14px",fontFamily:"monospace",fontSize:14,color:"#00d4aa",marginBottom:8}}>{r.optimizedTitle}</div>
        <div style={{fontSize:11,color:th.muted}}>{r.titleExplanation}</div>
      </div>
      <div style={{background:th.surface,border:`1px solid ${th.border}`,borderRadius:14,padding:20,marginBottom:12}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:3,color:th.muted,marginBottom:12}}>{t.optimizedTags}</div>
        <div style={{marginBottom:12}}>{(r.tags||[]).map((tg,i)=><span key={i} style={{borderRadius:20,padding:"4px 12px",fontSize:11,display:"inline-block",margin:"3px",background:"rgba(0,212,170,0.08)",border:"1px solid #00d4aa33",color:"#00d4aa"}}>{tg}</span>)}</div>
        <div style={{fontSize:11,color:th.muted}}>{r.tagStrategy}</div>
      </div>
      <div style={{background:th.surface,border:`1px solid ${th.border}`,borderRadius:14,padding:20,marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:3,color:th.muted}}>{t.optimizedDesc}</div>
          <CopyBtn text={r.optimizedDescription} k="desc"/>
        </div>
        <div style={{background:th.bg,borderRadius:8,padding:14,fontFamily:"monospace",fontSize:12,color:th.sub,whiteSpace:"pre-wrap",lineHeight:1.7,maxHeight:280,overflowY:"auto"}}>{r.optimizedDescription}</div>
      </div>
      <div style={{background:th.surface,border:`1px solid ${th.border}`,borderRadius:14,padding:20,marginBottom:12}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:3,color:th.muted,marginBottom:12}}>{t.packageSug}</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          {["basic","standard","premium"].map((pkg,pi)=>{
            const p=r.packages?.[pkg];
            const pc=["#475569","#0ea5e9","#f59e0b"][pi];
            return p?(
              <div key={pkg} style={{background:`${pc}08`,border:`1px solid ${pc}22`,borderRadius:12,padding:14}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:2,color:pc,marginBottom:8}}>{pkg.toUpperCase()}</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:900,color:th.text,marginBottom:4}}>${p.suggestedPrice}</div>
                <div style={{fontSize:11,color:th.muted,marginBottom:8}}>{p.deliveryDays} days</div>
                <div style={{fontSize:11,color:th.sub}}>{p.description}</div>
              </div>
            ):null;
          })}
        </div>
      </div>
      {(r.faqs||[]).length>0&&(
        <div style={{background:th.surface,border:`1px solid ${th.border}`,borderRadius:14,padding:20,marginBottom:12}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:3,color:th.muted,marginBottom:12}}>{t.faqsSug}</div>
          {r.faqs.map((f,i)=>(
            <div key={i} style={{marginBottom:12}}>
              <div style={{fontSize:12,fontWeight:600,color:th.text,marginBottom:4}}>Q: {f.q}</div>
              <div style={{fontSize:12,color:th.sub}}>A: {f.a}</div>
            </div>
          ))}
        </div>
      )}
      <InfoBox label={t.expectedImp} text={r.expectedRankingImprovement} color="#00d4aa" th={th}/>
    </div>
  );
}

function RoadmapResult({r,t,th}){
  const weeks=["week1","week2","week3","week4"];
  const wc=["#00d4aa","#0ea5e9","#7c3aed","#f59e0b"];
  return(
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:12}}>
        {[{l:t.currentScore,v:`${r.currentScore}/100`,c:"#f59e0b"},{l:t.targetScore,v:`${r.targetScore}/100`,c:"#00d4aa"},{l:t.projectedLevel,v:r.projectedLevel,c:"#0ea5e9"}].map(({l,v,c})=>(
          <div key={l} style={{background:`${c}08`,border:`1px solid ${c}22`,borderRadius:14,padding:18,textAlign:"center"}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:2,color:c,marginBottom:8}}>{l}</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:900,color:th.text}}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{background:th.surface,border:`1px solid ${th.border}`,borderRadius:14,padding:"20px 22px",marginBottom:12}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:3,color:th.muted,marginBottom:12}}>{t.weekRoadmap}</div>
        {weeks.map((w,i)=>{
          const week=r.roadmap?.[w]; if(!week) return null;
          return(
            <div key={w} style={{marginBottom:16}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:`${wc[i]}22`,border:`1px solid ${wc[i]}44`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:900,color:wc[i],flexShrink:0}}>{i+1}</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:800,color:wc[i]}}>{t.week} {i+1}: {week.theme}</div>
              </div>
              {(week.tasks||[]).map((tk,j)=><div key={j} style={{fontSize:12,color:th.sub,padding:"6px 0 6px 38px",borderBottom:`1px solid ${th.border}`}}>▸ {tk}</div>)}
            </div>
          );
        })}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
        {["month2","month3"].map((m,i)=>{
          const month=r.roadmap?.[m]; if(!month) return null;
          const c=i===0?"#0ea5e9":"#00d4aa";
          return(
            <div key={m} style={{background:`${c}06`,border:`1px solid ${c}20`,borderRadius:14,padding:16}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:2,color:c,marginBottom:8}}>{t.month} {i+2}: {month.theme}</div>
              {(month.milestones||[]).map((ml,j)=><div key={j} style={{fontSize:12,color:th.sub,marginBottom:6}}>✓ {ml}</div>)}
            </div>
          );
        })}
      </div>
      <div style={{background:th.surface,border:`1px solid ${th.border}`,borderRadius:14,padding:"20px 22px",marginBottom:12}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:3,color:th.muted,marginBottom:12}}>{t.kpiTargets}</div>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr>{[t.current,t.current,t.d30,t.d90].map((h,i)=><th key={i} style={{textAlign:"left",padding:"8px 12px",fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:2,color:th.muted,borderBottom:`1px solid ${th.border}`}}>{h}</th>)}</tr></thead>
          <tbody>{(r.kpis||[]).map((k,i)=>(
            <tr key={i}>
              <td style={{padding:"10px 12px",borderBottom:`1px solid ${th.border}`,fontWeight:600,color:th.text}}>{k.metric}</td>
              <td style={{padding:"10px 12px",borderBottom:`1px solid ${th.border}`,color:th.sub}}>{k.current}</td>
              <td style={{padding:"10px 12px",borderBottom:`1px solid ${th.border}`,color:"#f59e0b"}}>{k.target30d}</td>
              <td style={{padding:"10px 12px",borderBottom:`1px solid ${th.border}`,color:"#00d4aa"}}>{k.target90d}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <InfoBox label={t.revenueImpact} text={r.estimatedRevenueImpact} color="#84cc16" th={th}/>
    </div>
  );
}

function KeywordResult({r,t,th}){
  const tc={primary:"#00d4aa",secondary:"#0ea5e9",longtail:"#f59e0b",lsi:"#7c3aed"};
  const oc={high:"#00d4aa",medium:"#f59e0b",low:"#ef4444"};
  return(
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
        <InfoBox label={t.primaryKw} text={r.primaryKeyword} color="#00d4aa" th={th}/>
        <InfoBox label={t.nicheOpp} text={r.nicheOpportunity} color="#0ea5e9" th={th}/>
      </div>
      <div style={{background:th.surface,border:`1px solid ${th.border}`,borderRadius:14,padding:"20px 22px",marginBottom:12}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:3,color:th.muted,marginBottom:12}}>{t.kwOpportunities}</div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead><tr>{["Keyword","Volume","Competition","Opportunity","Use In"].map(h=><th key={h} style={{textAlign:"left",padding:"8px 12px",fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:2,color:th.muted,borderBottom:`1px solid ${th.border}`}}>{h}</th>)}</tr></thead>
            <tbody>{(r.keywords||[]).map((k,i)=>(
              <tr key={i}>
                <td style={{padding:"10px 12px",borderBottom:`1px solid ${th.border}`,color:th.sub,verticalAlign:"top"}}>
                  <Pill text={k.type} color={tc[k.type]||"#475569"}/>{" "}
                  <span style={{color:th.text,fontWeight:500}}>{k.keyword}</span>
                </td>
                <td style={{padding:"10px 12px",borderBottom:`1px solid ${th.border}`,color:th.sub,verticalAlign:"top"}}><span style={{color:k.searchVolume==="high"?"#00d4aa":k.searchVolume==="medium"?"#f59e0b":th.muted}}>{k.searchVolume}</span></td>
                <td style={{padding:"10px 12px",borderBottom:`1px solid ${th.border}`,color:th.sub,verticalAlign:"top"}}><span style={{color:k.competition==="low"?"#00d4aa":k.competition==="medium"?"#f59e0b":"#ef4444"}}>{k.competition}</span></td>
                <td style={{padding:"10px 12px",borderBottom:`1px solid ${th.border}`,color:th.sub,verticalAlign:"top"}}><span style={{color:oc[k.opportunity]||th.muted,fontWeight:700}}>{k.opportunity}</span></td>
                <td style={{padding:"10px 12px",borderBottom:`1px solid ${th.border}`,color:th.sub,verticalAlign:"top"}}>{k.suggestedUse}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
      <div style={{background:th.surface,border:`1px solid ${th.border}`,borderRadius:14,padding:20,marginBottom:12}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:3,color:th.muted,marginBottom:10}}>{t.suggestedTitleLabel}</div>
        <div style={{background:th.bg,borderRadius:8,padding:"12px 14px",fontFamily:"monospace",fontSize:14,color:"#00d4aa"}}>{r.suggestedTitle}</div>
      </div>
      <div style={{background:th.surface,border:`1px solid ${th.border}`,borderRadius:14,padding:20,marginBottom:12}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:3,color:th.muted,marginBottom:12}}>{t.suggestedTagsLabel}</div>
        {(r.suggestedTags||[]).map((tg,i)=><span key={i} style={{borderRadius:20,padding:"4px 12px",fontSize:11,display:"inline-block",margin:"3px",background:"rgba(0,212,170,0.08)",border:"1px solid #00d4aa33",color:"#00d4aa"}}>{tg}</span>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <InfoBox label={t.seasonalTips} text={r.seasonalTips} color="#f59e0b" th={th}/>
        <InfoBox label={t.avoidKw} text={(r.avoidKeywords||[]).join(", ")} color="#ef4444" th={th}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
//  INPUT FORMS
// ─────────────────────────────────────────
function Inp({label,value,onChange,placeholder,th}){
  return(
    <div style={{background:th.surface,border:`1px solid ${th.border}`,borderRadius:14,padding:"16px 18px",marginBottom:12}}>
      <label style={{fontSize:10,color:th.muted,marginBottom:6,display:"block",fontFamily:"'Syne',sans-serif",fontWeight:700,letterSpacing:1}}>{label}</label>
      <input style={{width:"100%",background:th.input,border:`1px solid ${th.border}`,borderRadius:10,padding:"12px 14px",color:th.text,fontSize:13,outline:"none",fontFamily:"monospace",boxSizing:"border-box"}} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/>
    </div>
  );
}
function Txta({label,value,onChange,placeholder,rows=6,th}){
  return(
    <div style={{background:th.surface,border:`1px solid ${th.border}`,borderRadius:14,padding:"16px 18px",marginBottom:12}}>
      <label style={{fontSize:10,color:th.muted,marginBottom:6,display:"block",fontFamily:"'Syne',sans-serif",fontWeight:700,letterSpacing:1}}>{label}</label>
      <textarea style={{width:"100%",background:th.input,border:`1px solid ${th.border}`,borderRadius:10,padding:"12px 14px",color:th.text,fontSize:13,outline:"none",fontFamily:"monospace",resize:"vertical",lineHeight:1.7,boxSizing:"border-box"}} rows={rows} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/>
    </div>
  );
}

function PrimaryBtn({label,onClick,loading,th}){
  return(
    <button onClick={onClick} disabled={loading} style={{width:"100%",padding:16,border:"none",borderRadius:12,background:"linear-gradient(135deg,#00d4aa,#0ea5e9)",color:"#030712",fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:14,letterSpacing:2,cursor:loading?"not-allowed":"pointer",opacity:loading?0.7:1}}>
      {label}
    </button>
  );
}

// ─────────────────────────────────────────
//  QUICK FILL HELPER
// ─────────────────────────────────────────
function buildGigInfo(url, fields) {
  const parts = [];
  if (url) parts.push(`Fiverr URL: ${url}`);
  if (fields.title)        parts.push(`Title: ${fields.title}`);
  if (fields.rating)       parts.push(`Rating: ${fields.rating} ⭐`);
  if (fields.reviews)      parts.push(`Reviews: ${fields.reviews}`);
  if (fields.level)        parts.push(`Seller Level: ${fields.level}`);
  if (fields.price)        parts.push(`Starting Price: $${fields.price}`);
  if (fields.delivery)     parts.push(`Delivery: ${fields.delivery} days`);
  if (fields.responseTime) parts.push(`Response Time: ${fields.responseTime}`);
  if (fields.orders)       parts.push(`Orders in Queue: ${fields.orders}`);
  if (fields.tags)         parts.push(`Tags: ${fields.tags}`);
  return parts.join("\n");
}

function QF({fields,onChange,th,t}){
  const row=(label,key,ph,half=false)=>(
    <div key={key} style={{flex:half?"1 1 45%":"1 1 100%",minWidth:120}}>
      <label style={{fontSize:10,color:th.muted,marginBottom:5,display:"block",fontFamily:"'Syne',sans-serif",fontWeight:700,letterSpacing:1}}>{label}</label>
      <input style={{width:"100%",background:th.input,border:`1px solid ${th.border}`,borderRadius:8,padding:"9px 12px",color:th.text,fontSize:12,outline:"none",fontFamily:"monospace",boxSizing:"border-box"}}
        value={fields[key]||""} onChange={e=>onChange({...fields,[key]:e.target.value})} placeholder={ph}/>
    </div>
  );
  return(
    <div style={{background:th.surface,border:"1px solid #00d4aa33",borderRadius:14,padding:"16px 18px",marginBottom:12}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
        <span style={{fontSize:14}}>⚡</span>
        <div>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:10,fontWeight:800,letterSpacing:2,color:"#00d4aa"}}>QUICK FILL</div>
          <div style={{fontSize:11,color:th.muted}}>{t.quickFillDesc}</div>
        </div>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
        {row(t.qfTitle,"title","I will design a professional logo...")}
        {row(t.qfRating,"rating","4.9",true)}
        {row(t.qfReviews,"reviews","312",true)}
        {row(t.qfLevel,"level","Level 2",true)}
        {row(t.qfPrice,"price","25",true)}
        {row(t.qfDelivery,"delivery","2",true)}
        {row(t.qfResponse,"responseTime","1 hour",true)}
        {row(t.qfOrders,"orders","8",true)}
        {row(t.qfTags,"tags","logo design, minimalist logo, brand identity")}
      </div>
    </div>
  );
}

function QFToggle({show,onToggle,th,t}){
  return(
    <div style={{marginBottom:12}}>
      <button onClick={onToggle} style={{background:"transparent",border:`1px solid ${show?"#00d4aa":th.border}`,borderRadius:8,padding:"7px 14px",color:show?"#00d4aa":th.muted,fontSize:11,fontFamily:"'Syne',sans-serif",fontWeight:700,cursor:"pointer",transition:"all 0.2s"}}>
        {show?"▲ Hide":"⚡ "+t.quickFillBtn}
      </button>
      {!show&&<span style={{fontSize:11,color:th.muted,marginLeft:8}}>{t.quickFillHint}</span>}
    </div>
  );
}

function AnalyzerForm({onSubmit,loading,t,th}){
  const [gigUrl,setGigUrl]=useState("");
  const [fields,setFields]=useState({});
  const [show,setShow]=useState(false);
  return(
    <div>
      <Inp label={t.gigUrlLabel} value={gigUrl} onChange={setGigUrl} placeholder={t.gigUrlPlaceholder} th={th}/>
      <QFToggle show={show} onToggle={()=>setShow(!show)} th={th} t={t}/>
      {show&&<QF fields={fields} onChange={setFields} th={th} t={t}/>}
      <PrimaryBtn label={loading?t.analyzingBtn:t.analyzeBtn} onClick={()=>onSubmit({mode:"url",gigUrl,gigInfo:buildGigInfo(gigUrl,fields)})} loading={loading} th={th}/>
    </div>
  );
}

function CompetitorForm({onSubmit,loading,t,th}){
  const [myUrl,setMyUrl]=useState("");
  const [myF,setMyF]=useState({});
  const [showMy,setShowMy]=useState(false);
  const [compUrls,setCompUrls]=useState("");
  const [compF,setCompF]=useState([{},{},{}]);
  const [showComp,setShowComp]=useState(false);
  const handleSubmit=()=>{
    const myGig=buildGigInfo(myUrl,myF)||myUrl;
    const competitors=showComp
      ?compF.map((f,i)=>{const s=buildGigInfo("",f);return s?`Competitor ${i+1}:\n${s}`:""}).filter(Boolean).join("\n\n")
      :compUrls;
    onSubmit({myGig,competitors});
  };
  return(
    <div>
      <div style={{background:th.surface,border:`1px solid ${th.border}`,borderRadius:14,padding:"16px 18px",marginBottom:12}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:3,color:th.muted,marginBottom:10}}>{t.myGigLabel}</div>
        <Inp label={t.gigUrlLabel} value={myUrl} onChange={setMyUrl} placeholder={t.gigUrlPlaceholder} th={th}/>
        <QFToggle show={showMy} onToggle={()=>setShowMy(!showMy)} th={th} t={t}/>
        {showMy&&<QF fields={myF} onChange={setMyF} th={th} t={t}/>}
      </div>
      <div style={{background:th.surface,border:`1px solid ${th.border}`,borderRadius:14,padding:"16px 18px",marginBottom:12}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:3,color:th.muted,marginBottom:10}}>{t.compLabel}</div>
        <button onClick={()=>setShowComp(!showComp)} style={{background:"transparent",border:`1px solid ${showComp?"#0ea5e9":th.border}`,borderRadius:8,padding:"7px 14px",color:showComp?"#0ea5e9":th.muted,fontSize:11,fontFamily:"'Syne',sans-serif",fontWeight:700,cursor:"pointer",marginBottom:10}}>
          {showComp?"✓ Quick Fill (3)":"⚡ Quick Fill (3 Competitors)"}
        </button>
        {!showComp
          ?<Txta label="" value={compUrls} onChange={setCompUrls} rows={6} placeholder={"Competitor 1:\nURL/title, price, rating...\n\nCompetitor 2:\n..."} th={th}/>
          :[0,1,2].map(i=>(
            <div key={i} style={{marginBottom:8}}>
              <div style={{fontSize:10,fontWeight:700,color:"#0ea5e9",fontFamily:"'Syne',sans-serif",letterSpacing:2,marginBottom:6}}>COMPETITOR {i+1}</div>
              <QF fields={compF[i]} onChange={f=>{const a=[...compF];a[i]=f;setCompF(a);}} th={th} t={t}/>
            </div>
          ))
        }
      </div>
      <PrimaryBtn label={loading?t.spyingBtn:t.spyBtn} onClick={handleSubmit} loading={loading} th={th}/>
    </div>
  );
}

function PredictForm({onSubmit,loading,t,th}){
  const [gigUrl,setGigUrl]=useState("");
  const [fields,setFields]=useState({});
  const [show,setShow]=useState(false);
  const [niche,setNiche]=useState("");
  const [currentScore,setCurrentScore]=useState("");
  return(
    <div>
      <Inp label={t.nicheLabel} value={niche} onChange={setNiche} placeholder={t.nichePlaceholder} th={th}/>
      <Inp label={t.scoreLabel} value={currentScore} onChange={setCurrentScore} placeholder={t.scorePlaceholder} th={th}/>
      <Inp label={t.gigUrlLabel} value={gigUrl} onChange={setGigUrl} placeholder={t.gigUrlPlaceholder} th={th}/>
      <QFToggle show={show} onToggle={()=>setShow(!show)} th={th} t={t}/>
      {show&&<QF fields={fields} onChange={setFields} th={th} t={t}/>}
      <PrimaryBtn label={loading?t.predictingBtn:t.predictBtn} onClick={()=>onSubmit({gigInfo:buildGigInfo(gigUrl,fields)||gigUrl,currentScore,niche})} loading={loading} th={th}/>
    </div>
  );
}

function RewriterForm({onSubmit,loading,t,th}){
  const [gigUrl,setGigUrl]=useState("");
  const [fields,setFields]=useState({});
  const [show,setShow]=useState(false);
  const [targetKeyword,setTargetKeyword]=useState("");
  const [niche,setNiche]=useState("");
  return(
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <Inp label={t.kwLabel} value={targetKeyword} onChange={setTargetKeyword} placeholder={t.kwPlaceholder} th={th}/>
        <Inp label={t.nicheLabel2} value={niche} onChange={setNiche} placeholder={t.nichePlaceholder2} th={th}/>
      </div>
      <Inp label={t.gigUrlLabel} value={gigUrl} onChange={setGigUrl} placeholder={t.gigUrlPlaceholder} th={th}/>
      <QFToggle show={show} onToggle={()=>setShow(!show)} th={th} t={t}/>
      {show&&<QF fields={fields} onChange={setFields} th={th} t={t}/>}
      <PrimaryBtn label={loading?t.rewritingBtn:t.rewriteBtn} onClick={()=>onSubmit({gigContent:buildGigInfo(gigUrl,fields)||gigUrl,targetKeyword,niche})} loading={loading} th={th}/>
    </div>
  );
}

function RoadmapForm({onSubmit,loading,t,th}){
  const [gigUrl,setGigUrl]=useState("");
  const [fields,setFields]=useState({});
  const [show,setShow]=useState(false);
  const [currentMetrics,setCurrentMetrics]=useState("");
  return(
    <div>
      <Inp label={t.gigUrlLabel} value={gigUrl} onChange={setGigUrl} placeholder={t.gigUrlPlaceholder} th={th}/>
      <QFToggle show={show} onToggle={()=>setShow(!show)} th={th} t={t}/>
      {show&&<QF fields={fields} onChange={setFields} th={th} t={t}/>}
      <Txta label={t.metricsLabel} value={currentMetrics} onChange={setCurrentMetrics} rows={3} placeholder={"Orders this month: 12\nResponse rate: 95%\nOn-time delivery: 98%"} th={th}/>
      <PrimaryBtn label={loading?t.generatingBtn:t.roadmapBtn} onClick={()=>onSubmit({gigInfo:buildGigInfo(gigUrl,fields)||gigUrl,currentMetrics})} loading={loading} th={th}/>
    </div>
  );
}

function KeywordForm({onSubmit,loading,t,th}){
  const [query,setQuery]=useState("");
  const [currentTitle,setCurrentTitle]=useState("");
  const [targetAudience,setTargetAudience]=useState("");
  return(
    <div>
      <Inp label={`${t.gigUrlLabel} / ${t.nicheServiceLabel}`} value={query} onChange={setQuery} placeholder={"https://fiverr.com/... or Logo Design, SEO..."} th={th}/>
      <Inp label={t.titleLabel} value={currentTitle} onChange={setCurrentTitle} placeholder="Your existing gig title..." th={th}/>
      <Inp label={t.audienceLabel} value={targetAudience} onChange={setTargetAudience} placeholder={t.audiencePlaceholder} th={th}/>
      <PrimaryBtn label={loading?t.keywordingBtn:t.keywordBtn} onClick={()=>onSubmit({niche:query,currentTitle,targetAudience})} loading={loading} th={th}/>
    </div>
  );
}



// ─────────────────────────────────────────
//  PRICING MODAL
// ─────────────────────────────────────────
function PricingModal({onClose,onAdded,t,th}){
  const [key,setKey]=useState("");
  const [msg,setMsg]=useState({text:"",ok:false});
  const [busy,setBusy]=useState(false);

  const fmt=v=>{
    let s=v.replace(/[^A-Za-z0-9]/g,"").toUpperCase().slice(0,16);
    return s.match(/.{1,4}/g)?.join("-")||s;
  };

  const redeem=async()=>{
    const k=key.trim().toUpperCase();
    if(!/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(k)){setMsg({text:t.invalidKey,ok:false});return;}
    const used=JSON.parse(localStorage.getItem("gr_used")||"[]");
    if(used.includes(k)){setMsg({text:t.alreadyUsed,ok:false});return;}
    setBusy(true); setMsg({text:t.verifying,ok:false});
    try{
      const res=await fetch("/api/redeem",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({key:k})});
      const data=await res.json();
      if(data.success){
        used.push(k); localStorage.setItem("gr_used",JSON.stringify(used));
        add(data.credits); onAdded();
        setMsg({text:`✅ ${data.credits} credits added!`,ok:true});
        setTimeout(onClose,1800);
      }else{ setMsg({text:data.error||"Invalid key.",ok:false}); }
    }catch{ setMsg({text:t.networkErr,ok:false}); }
    finally{ setBusy(false); }
  };

  return(
    <div onClick={e=>e.target===e.currentTarget&&onClose()} style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(3,7,18,0.92)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:th.surface,border:`1px solid ${th.border}`,borderRadius:24,padding:32,maxWidth:620,width:"100%",maxHeight:"90vh",overflowY:"auto",position:"relative"}}>
        <button onClick={onClose} style={{position:"absolute",top:16,right:20,background:"none",border:"none",color:th.muted,fontSize:20,cursor:"pointer"}}>✕</button>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:900,letterSpacing:-0.5,marginBottom:6,color:th.text}}>{t.getCreditsTitle}</div>
        <div style={{fontSize:13,color:th.muted,marginBottom:10}}>{t.creditDesc}</div>
        <div style={{background:"rgba(0,212,170,0.06)",border:"1px solid rgba(0,212,170,0.2)",borderRadius:10,padding:"10px 14px",fontSize:12,color:th.sub,marginBottom:24}}>
          ⚡ <strong style={{color:"#00d4aa"}}>{t.howTitle}</strong> {t.howDesc}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:24}}>
          {PLANS.map(p=>(
            <div key={p.name} style={{borderRadius:14,padding:20,border:`1px solid ${p.popular?"#00d4aa":th.border}`,cursor:"pointer",background:th.bg,transition:"all 0.2s",position:"relative"}}>
              {p.popular&&<div style={{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",background:"#00d4aa",color:"#030712",fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:2,padding:"3px 10px",borderRadius:20}}>{t.popular}</div>}
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:800,color:th.muted,letterSpacing:2,marginBottom:8}}>{p.name}</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:900,color:th.text,marginBottom:4}}>{p.credits} <span style={{fontSize:13,fontWeight:400,color:th.muted}}>credits</span></div>
              <div style={{color:"#00d4aa",fontSize:13,fontWeight:600,marginBottom:4}}>${p.price}</div>
              <div style={{fontSize:11,color:th.muted,marginBottom:12}}>${p.per} / credit</div>
              <ul style={{listStyle:"none",padding:0,margin:"0 0 12px"}}>
                {p.features.map((f,i)=><li key={i} style={{fontSize:11,color:th.sub,marginBottom:4,paddingLeft:14,position:"relative"}}><span style={{position:"absolute",left:0,color:"#00d4aa"}}>✓</span>{f}</li>)}
              </ul>
              <button onClick={()=>window.open(p.stripe,"_blank")} style={{width:"100%",padding:10,border:`1px solid ${p.popular?"none":th.border}`,borderRadius:8,background:p.popular?"#00d4aa":"transparent",color:p.popular?"#030712":th.text,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:11,cursor:"pointer"}}>
                {t.buyNow}
              </button>
            </div>
          ))}
        </div>
        <div style={{borderTop:`1px solid ${th.border}`,paddingTop:20}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:800,letterSpacing:2,color:"#00d4aa",marginBottom:4}}>{t.redeemTitle}</div>
          <div style={{fontSize:11,color:th.muted,marginBottom:12}}>{t.redeemDesc}</div>
          <div style={{display:"flex",gap:8}}>
            <input style={{flex:1,background:th.input,border:`1px solid ${msg.ok?"#00d4aa":msg.text&&!msg.ok?"#ef4444":th.border}`,borderRadius:8,padding:"10px 12px",color:th.text,fontSize:13,fontFamily:"monospace",outline:"none"}} value={key} onChange={e=>{setKey(fmt(e.target.value));setMsg({text:"",ok:false});}} placeholder={t.redeemPlaceholder} maxLength={19}/>
            <button onClick={redeem} disabled={busy||key.length<19} style={{padding:"10px 18px",border:"none",borderRadius:8,background:"#00d4aa",color:"#030712",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:11,cursor:busy||key.length<19?"not-allowed":"pointer",opacity:busy||key.length<19?0.5:1,whiteSpace:"nowrap"}}>
              {busy?t.checking:t.redeemBtn}
            </button>
          </div>
          {msg.text&&<div style={{fontSize:11,color:msg.ok?"#00d4aa":"#ef4444",marginTop:8}}>{msg.text}</div>}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
//  MAIN APP
// ─────────────────────────────────────────
const FORMS={analyzer:AnalyzerForm,competitor:CompetitorForm,predict:PredictForm,rewriter:RewriterForm,roadmap:RoadmapForm,keyword:KeywordForm};
const RESULTS={analyzer:AnalyzerResult,competitor:CompetitorResult,predict:PredictResult,rewriter:RewriterResult,roadmap:RoadmapResult,keyword:KeywordResult};
const ENDPOINTS={analyzer:"analyze",competitor:"competitor",predict:"predict",rewriter:"rewriter",roadmap:"roadmap",keyword:"keyword"};

export default function App(){
  const [credits,setCredits]=useState(0);
  const [mod,setMod]=useState(null);
  const [result,setResult]=useState(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [modal,setModal]=useState(false);
  const [theme,setTheme]=useState("dark");

  const th=THEMES[theme]||THEMES.dark;
  const t=T;

  useEffect(()=>{
    setCredits(gc());
    setTheme(localStorage.getItem("gr_theme")||"dark");
  },[]);

  const updC=()=>setCredits(gc());
  const toggleTheme=()=>{ const n=theme==="dark"?"light":"dark"; setTheme(n); localStorage.setItem("gr_theme",n); };

  const navBtn={background:th.surface,border:`1px solid ${th.border}`,borderRadius:20,padding:"6px 12px",cursor:"pointer",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:11,color:th.muted,display:"flex",alignItems:"center",gap:5,transition:"all 0.2s"};

  const selectMod=m=>{
    if(gc()<m.cost){ setModal(true); return; }
    setMod(m); setResult(null); setError("");
  };

  const submit=useCallback(async payload=>{
    if(!mod) return;
    if(gc()<mod.cost){ setModal(true); return; }
    setLoading(true); setError(""); setResult(null);
    try{
      const res=await fetch(`/api/${ENDPOINTS[mod.id]}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
      const raw=await res.text();
      let data;
      try{ data=JSON.parse(raw); }catch{ throw new Error(`Server error (${res.status}). Check Vercel logs.`); }
      if(!res.ok||!data.success) throw new Error(data.error||"Analysis failed.");
      use(mod.cost); updC(); setResult(data.result);
    }catch(err){ setError(err.message); }
    finally{ setLoading(false); }
  },[mod]);

  const reset=()=>{ setMod(null); setResult(null); setError(""); };

  const FormC=mod?FORMS[mod.id]:null;
  const ResC=mod?RESULTS[mod.id]:null;


  return(
    <div style={{minHeight:"100vh",background:th.bg,transition:"background 0.3s",fontFamily:"'DM Sans',system-ui,sans-serif",color:th.text}}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0} input::placeholder,textarea::placeholder{color:${th.border}} @keyframes spin{to{transform:rotate(360deg)}} @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}} @media(max-width:600px){.mod-grid{grid-template-columns:1fr!important} .plan-grid{grid-template-columns:1fr!important} .two-col{grid-template-columns:1fr!important} .three-col{grid-template-columns:1fr!important}}`}</style>

      {/* BG */}
      <div style={{position:"fixed",inset:0,backgroundImage:`radial-gradient(circle at 1px 1px,${th.grid} 1px,transparent 0)`,backgroundSize:"32px 32px",opacity:0.35,pointerEvents:"none",zIndex:0}}/>
      <div style={{position:"fixed",top:-300,right:-200,width:700,height:700,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,212,170,0.06),transparent 65%)",pointerEvents:"none",zIndex:0}}/>
      <div style={{position:"fixed",bottom:-200,left:-200,width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(14,165,233,0.05),transparent 65%)",pointerEvents:"none",zIndex:0}}/>

      {/* NAV */}
      <div style={{position:"sticky",top:0,zIndex:100,background:th.nav,backdropFilter:"blur(16px)",borderBottom:`1px solid ${th.border}`,padding:"12px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div onClick={reset} style={{fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:16,letterSpacing:-0.5,color:th.text,cursor:"pointer"}}>
          Gig<span style={{color:"#00d4aa"}}>Rank</span> AI
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>

          <button onClick={toggleTheme} title="Toggle Theme" style={{background:th.surface,border:`1px solid ${th.border}`,borderRadius:20,padding:"6px 12px",cursor:"pointer",fontSize:14,transition:"all 0.2s"}}>{theme==="dark"?"☀️":"🌙"}</button>
          <div onClick={()=>setModal(true)} style={{...navBtn,borderColor:credits<=3&&credits>0?"rgba(239,68,68,0.4)":th.border,cursor:"pointer"}}>
            <span>⚡</span>
            <span style={{fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:13,color:credits<=3&&credits>0?"#ef4444":"#00d4aa"}}>{credits}</span>
            <span style={{fontSize:10,color:th.muted}}>{t.creditsLabel}</span>
          </div>
          <button onClick={()=>setModal(true)} style={{background:"linear-gradient(135deg,#00d4aa,#0ea5e9)",border:"none",borderRadius:20,padding:"7px 16px",color:"#030712",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:11,letterSpacing:1,cursor:"pointer"}}>
            {t.buyCredits}
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{position:"relative",zIndex:1,maxWidth:900,margin:"0 auto",padding:"0 20px 80px"}}>

        {/* HOME */}
        {!mod&&(
          <div style={{paddingTop:44,paddingBottom:36,animation:"fadeUp 0.5s ease"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,marginBottom:18}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:"#00d4aa",boxShadow:"0 0 12px #00d4aa",animation:"spin 3s linear infinite"}}/>
              <span style={{fontFamily:"'Syne',sans-serif",fontSize:10,fontWeight:700,letterSpacing:3,color:th.muted}}>{t.tagline}</span>
            </div>
            <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(32px,6vw,56px)",fontWeight:900,lineHeight:1,letterSpacing:-2,marginBottom:12,color:th.text}}>
              {t.h1a}<br/><span style={{WebkitTextStroke:`1px ${th.border}`,color:"transparent"}}>{t.h1b}</span>
            </h1>
            <p style={{color:th.muted,fontSize:14,lineHeight:1.7,maxWidth:500,fontWeight:300,marginBottom:24}}>{t.desc}</p>
            {/* Algo pills */}
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:32}}>
              {FACTORS.map(f=>(
                <div key={f.key} style={{display:"flex",alignItems:"center",gap:5,background:th.surface,border:`1px solid ${th.border}`,borderRadius:20,padding:"4px 10px"}}>
                  <span style={{fontSize:8,color:f.color}}>●</span>
                  <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:10,color:th.muted}}>{f.label}</span>
                  {f.isNew&&<span style={{fontSize:8,background:"#00d4aa22",color:"#00d4aa",padding:"1px 4px",borderRadius:3}}>NEW</span>}
                  <span style={{fontSize:9,color:th.border}}>|</span>
                  <span style={{fontSize:9,fontWeight:700,color:f.color}}>{f.w}%</span>
                </div>
              ))}
            </div>
            {/* No credit warning */}
            {credits===0&&(
              <div style={{background:"rgba(239,68,68,0.04)",border:"1px solid rgba(239,68,68,0.2)",borderRadius:14,padding:"20px 24px",marginBottom:20,textAlign:"center"}}>
                <div style={{fontSize:28,marginBottom:8}}>⚡</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:900,color:"#ef4444",marginBottom:6}}>{t.noCredits}</div>
                <div style={{fontSize:13,color:th.muted,marginBottom:16}}>{t.noCreditsDesc}</div>
                <button onClick={()=>setModal(true)} style={{background:"linear-gradient(135deg,#00d4aa,#0ea5e9)",border:"none",borderRadius:10,padding:"12px 28px",color:"#030712",fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:13,letterSpacing:1.5,cursor:"pointer"}}>{t.getCredits}</button>
              </div>
            )}
            {/* Module grid */}
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:800,letterSpacing:3,color:th.muted,marginBottom:14}}>{t.selectModule}</div>
            <div className="mod-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
              {MODULES.map((m,mi)=>(
                <div key={m.id} onClick={()=>selectMod(m)}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=m.color;e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 8px 32px ${m.color}22`;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}
                  style={{borderRadius:14,padding:"18px 16px",border:`1px solid ${th.border}`,cursor:"pointer",transition:"all 0.2s",background:th.surface,position:"relative"}}>
                  <div style={{fontSize:22,color:m.color,marginBottom:8}}>{m.icon}</div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:12,color:th.text,marginBottom:4}}>{t.modules[mi]?.label||m.id}</div>
                  <div style={{fontSize:11,color:th.muted,marginBottom:10}}>{t.modules[mi]?.desc||""}</div>
                  <div style={{fontSize:10,fontFamily:"'Syne',sans-serif",fontWeight:700,letterSpacing:1,color:m.color}}>⚡ {m.cost} {m.cost>1?t.credits2:t.credit}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE VIEW */}
        {mod&&(
          <div style={{paddingTop:32,animation:"fadeUp 0.4s ease"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
              <span style={{fontSize:28,color:mod.color}}>{mod.icon}</span>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:900,letterSpacing:-0.5,color:th.text}}>{t.modules[MODULES.findIndex(m=>m.id===mod.id)]?.label||mod.id}</div>
                <div style={{fontSize:12,color:th.muted}}>{t.modules[MODULES.findIndex(m=>m.id===mod.id)]?.desc||""} · <span style={{color:mod.color}}>⚡ {mod.cost} {mod.cost>1?t.credits2:t.credit}</span></div>
              </div>
            </div>
            {error&&<div style={{background:"rgba(239,68,68,0.06)",border:"1px solid rgba(239,68,68,0.2)",borderRadius:10,padding:"10px 14px",fontSize:12,color:"#ef4444",marginBottom:12}}>⚠ {error}</div>}
            {loading&&(
              <div style={{textAlign:"center",padding:"60px 20px"}}>
                <div style={{width:44,height:44,border:`3px solid ${th.border}`,borderTopColor:"#00d4aa",borderRadius:"50%",animation:"spin 0.8s linear infinite",margin:"0 auto 16px"}}/>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,color:th.muted}}>{t.running} {t.modules[MODULES.findIndex(m=>m.id===mod.id)]?.label||mod.id}...</div>
              </div>
            )}
            {!loading&&!result&&FormC&&<FormC onSubmit={submit} loading={loading} t={t} th={th}/>}
            {!loading&&result&&ResC&&(
              <div style={{animation:"fadeUp 0.5s ease"}}>
                <ResC r={result} t={t} th={th}/>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:16}}>
                  <button onClick={()=>{setResult(null);setError("");}} style={{background:"transparent",border:`1px solid ${th.border}`,borderRadius:10,padding:12,color:th.muted,fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:11,letterSpacing:2,cursor:"pointer"}}>{t.tryAgain}</button>
                  <button onClick={reset} style={{background:"transparent",border:`1px solid ${th.border}`,borderRadius:10,padding:12,color:th.muted,fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:11,letterSpacing:2,cursor:"pointer"}}>{t.allModules}</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {modal&&<PricingModal onClose={()=>setModal(false)} onAdded={updC} t={t} th={th}/>}
    </div>
  );
}
