"use client";
import { useState, useEffect, useCallback } from "react";

// ══════════════════════════════════════════
//  TRANSLATIONS
// ══════════════════════════════════════════
const T = {
  en: {
    // Nav
    buyCredits: "BUY CREDITS",
    credits: "CREDITS",
    // Header
    tagline: "FIVERR GROWTH INTELLIGENCE — 2026 ALGORITHM",
    h1line1: "GIG RANK",
    h1line2: "ANALYZER",
    headerDesc: "AI-powered Fiverr growth platform. Analyze gigs, spy on competitors, predict rankings, rewrite content, and generate 90-day growth roadmaps — powered by Fiverr's 2026 algorithm.",
    selectModule: "SELECT A MODULE",
    noCredits: "No Credits",
    noCreditsDesc: "Purchase a plan → receive License Key via email → redeem to activate credits.",
    getCredits: "GET CREDITS →",
    // Modules
    modules: [
      { label: "Gig Analyzer",    desc: "Full 2026 algorithm analysis" },
      { label: "Competitor Spy",  desc: "Compare vs top competitors" },
      { label: "Rank Predictor",  desc: "30/60/90 day forecast" },
      { label: "Gig Rewriter",    desc: "AI-optimized title, desc, tags" },
      { label: "Growth Roadmap",  desc: "90-day step-by-step plan" },
      { label: "Keyword Research",desc: "Find ranking keywords" },
    ],
    credit: "credit",
    credits2: "credits",
    // Forms
    gigUrl: {t.gigUrl},
    gigUrlPlaceholder: {t.gigUrlPlaceholder},
    gigInfo: {t.gigInfo},
    gigUrlTab: {t.gigUrlTab},
    pasteTab: {t.pasteTab},
    analyzeBtn: {t.analyzeBtn},
    analyzingBtn: {t.analyzingBtn},
    myGig: {t.myGig},
    competitorGigs: {t.competitorGigs},
    spyBtn: {t.spyBtn},
    spyingBtn: "ANALYZING...",
    niche: {t.niche},
    nichePlaceholder: "e.g. Logo Design, WordPress Development, Video Editing...",
    currentScore: {t.currentScore},
    currentScorePlaceholder: "e.g. 72 (from Gig Analyzer)",
    gigDetails: {t.gigDetails},
    predictBtn: {t.predictBtn},
    predictingBtn: {t.predictingBtn},
    targetKeyword: {t.targetKeyword},
    targetKeywordPlaceholder: "e.g. minimalist logo design",
    nichePlaceholder2: "e.g. Logo Design",
    currentGigContent: {t.currentGigContent},
    rewriteBtn: {t.rewriteBtn},
    rewritingBtn: {t.rewritingBtn},
    gigInfoLabel: {t.gigInfoLabel},
    currentMetrics: {t.currentMetrics},
    roadmapBtn: {t.roadmapBtn},
    generatingBtn: {t.generatingBtn},
    nicheService: {t.nicheService},
    nicheServicePlaceholder: "e.g. Logo Design, SEO, WordPress, Video Editing...",
    currentTitle: {t.currentTitle},
    targetAudience: {t.targetAudience},
    targetAudiencePlaceholder: "e.g. Startups, E-commerce businesses, YouTubers...",
    keywordBtn: {t.keywordBtn},
    keywordingBtn: {t.keywordingBtn},
    // Results
    tryAgain: "← TRY AGAIN",
    allModules: "← ALL MODULES",
    runningModule: "Running",
    // Pricing Modal
    getAnalysisCredits: {t.getAnalysisCredits},
    creditDesc: {t.creditDesc},
    howItWorks: {t.howItWorks},
    howItWorksDesc: {t.howItWorksDesc},
    popular: {t.popular},
    buyNow: {t.buyNow},
    redeemKey: {t.redeemKey},
    redeemDesc: {t.redeemDesc},
    redeemPlaceholder: {t.redeemPlaceholder},
    checking: "CHECKING...",
    redeem: "REDEEM",
    invalidFormat: t.invalidFormat,
    alreadyRedeemed: t.alreadyRedeemed,
    verifying: t.verifying,
    networkError: t.networkError,
    // Tabs
    algoFactors: {t.algoFactors},
    seoAudit: {t.seoAudit},
    actionPlan: {t.actionPlan},
    // Factor labels
    topWins: "TOP WINS",
    criticalIssues: "CRITICAL ISSUES",
    algoBreakdown: {t.algoBreakdown},
    titleSeo: {t.titleSeo},
    currentTitleLabel: {t.currentTitleLabel},
    keywordAtStart: {t.keywordAtStart},
    slugOptimized: {t.slugOptimized},
    suggestedTitle: {t.suggestedTitle},
    gigTags: {t.gigTags},
    missingKeywords: {t.missingKeywords},
    slugAnalysis: {t.slugAnalysis},
    pricingSignal: {t.pricingSignal},
    prioritizedPlan: {t.prioritizedPlan},
    algoNote: {t.algoNote},
    freshnessTip: {t.freshnessTip},
    multiGig: {t.multiGig},
    competitorEdge: {t.competitorEdge},
    marketOverview: {t.marketOverview},
    yourAdvantages: "YOUR ADVANTAGES",
    yourGaps: "YOUR GAPS",
    competitorBreakdown: {t.competitorBreakdown},
    pricingBenchmark: {t.pricingBenchmark},
    marketGaps: {t.marketGaps},
    winningStrategy: {t.winningStrategy},
    currentScore2: {t.currentScore2},
    targetScore: {t.targetScore},
    projectedLevel: {t.projectedLevel},
    weekRoadmap: {t.weekRoadmap},
    kpiTargets: {t.kpiTargets},
    revenueImpact: {t.revenueImpact},
    primaryKeyword: {t.primaryKeyword},
    nicheOpportunity: {t.nicheOpportunity},
    keywordOpportunities: {t.keywordOpportunities},
    suggestedTitleLabel: {t.suggestedTitleLabel},
    suggestedTagsLabel: {t.suggestedTagsLabel},
    seasonalTips: {t.seasonalTips},
    avoidKeywords: {t.avoidKeywords},
    optimizedTitle: {t.optimizedTitle},
    optimizedTags: {t.optimizedTags},
    optimizedDesc: {t.optimizedDesc},
    packageSuggestions: {t.packageSuggestions},
    suggestedFaqs: {t.suggestedFaqs},
    expectedImprovement: {t.expectedImprovement},
    copy: "COPY",
    copied: "COPIED ✓",
    ordersEstimate: "orders",
    confidence: "Confidence",
    growthDrivers: "GROWTH DRIVERS",
    riskFactors: "RISK FACTORS",
    keyMilestones: {t.keyMilestones},
    recommendation: {t.recommendation},
    week: "WEEK",
    month: "MONTH",
    current: {t.current},
    days30: {t.days30},
    days90: {t.days90},
    per: "/ credit",
    minPrice: "Suggested minimum",
    highImpact: "HIGH IMPACT",
    mediumImpact: "MEDIUM IMPACT",
    strong: "STRONG",
    avg: "AVG",
    weak2: "WEAK",
    low: "LOW",
    medium: "MEDIUM",
    high: "HIGH",
  },
  bn: {
    // Nav
    buyCredits: "ক্রেডিট কিনুন",
    credits: "ক্রেডিট",
    // Header
    tagline: "ফাইভার গ্রোথ ইন্টেলিজেন্স — ২০২৬ অ্যালগরিদম",
    h1line1: "গিগ র‍্যাংক",
    h1line2: "বিশ্লেষক",
    headerDesc: "AI-চালিত ফাইভার গ্রোথ প্ল্যাটফর্ম। গিগ বিশ্লেষণ, প্রতিযোগী স্পাই, র‍্যাংক পূর্বাভাস, কন্টেন্ট রিরাইট, এবং ৯০-দিনের গ্রোথ রোডম্যাপ — ফাইভারের ২০২৬ অ্যালগরিদম দিয়ে।",
    selectModule: "একটি মডিউল বেছে নিন",
    noCredits: "ক্রেডিট নেই",
    noCreditsDesc: "একটি প্ল্যান কিনুন → ইমেইলে License Key পাবেন → ক্রেডিট চালু করতে key দিন।",
    getCredits: "ক্রেডিট পান →",
    // Modules
    modules: [
      { label: "গিগ বিশ্লেষক",       desc: "সম্পূর্ণ ২০২৬ অ্যালগরিদম বিশ্লেষণ" },
      { label: "প্রতিযোগী স্পাই",     desc: "শীর্ষ প্রতিযোগীদের সাথে তুলনা" },
      { label: "র‍্যাংক পূর্বাভাস",   desc: "৩০/৬০/৯০ দিনের পূর্বাভাস" },
      { label: "গিগ রিরাইটার",        desc: "AI-অপ্টিমাইজড টাইটেল, বিবরণ, ট্যাগ" },
      { label: "গ্রোথ রোডম্যাপ",     desc: "৯০-দিনের ধাপে ধাপে পরিকল্পনা" },
      { label: "কীওয়ার্ড রিসার্চ",   desc: "র‍্যাংকিং কীওয়ার্ড খুঁজুন" },
    ],
    credit: "ক্রেডিট",
    credits2: "ক্রেডিট",
    // Forms
    gigUrl: "ফাইভার গিগ URL",
    gigUrlPlaceholder: "https://www.fiverr.com/username/gig-title",
    gigInfo: "গিগ তথ্য — বেশি বিবরণ = ভালো বিশ্লেষণ",
    gigUrlTab: "🔗 গিগ URL",
    pasteTab: "📋 তথ্য পেস্ট করুন",
    analyzeBtn: "গিগ র‍্যাংকিং বিশ্লেষণ করুন →",
    analyzingBtn: "বিশ্লেষণ হচ্ছে...",
    myGig: "আপনার গিগ তথ্য",
    competitorGigs: "প্রতিযোগী গিগ (২-৫টা গিগ পেস্ট করুন)",
    spyBtn: "প্রতিযোগী বিশ্লেষণ করুন →",
    spyingBtn: "বিশ্লেষণ হচ্ছে...",
    niche: "নিশ / ক্যাটাগরি",
    nichePlaceholder: "যেমন: লোগো ডিজাইন, ওয়ার্ডপ্রেস ডেভেলপমেন্ট...",
    currentScore: "বর্তমান স্কোর (ঐচ্ছিক)",
    currentScorePlaceholder: "যেমন: ৭২ (গিগ বিশ্লেষক থেকে)",
    gigDetails: "গিগ বিবরণ",
    predictBtn: "র‍্যাংকিং সম্ভাবনা পূর্বাভাস করুন →",
    predictingBtn: "পূর্বাভাস হচ্ছে...",
    targetKeyword: "লক্ষ্য কীওয়ার্ড",
    targetKeywordPlaceholder: "যেমন: মিনিমালিস্ট লোগো ডিজাইন",
    nichePlaceholder2: "যেমন: লোগো ডিজাইন",
    currentGigContent: "বর্তমান গিগ কন্টেন্ট (টাইটেল + বিবরণ + ট্যাগ)",
    rewriteBtn: "গিগ কন্টেন্ট রিরাইট করুন →",
    rewritingBtn: "রিরাইট হচ্ছে...",
    gigInfoLabel: "গিগ তথ্য",
    currentMetrics: "বর্তমান মেট্রিক্স (ঐচ্ছিক)",
    roadmapBtn: "৯০-দিনের রোডম্যাপ তৈরি করুন →",
    generatingBtn: "রোডম্যাপ তৈরি হচ্ছে...",
    nicheService: "নিশ / সেবার ধরন *",
    nicheServicePlaceholder: "যেমন: লোগো ডিজাইন, SEO, ওয়ার্ডপ্রেস...",
    currentTitle: "বর্তমান গিগ টাইটেল (ঐচ্ছিক)",
    targetAudience: "লক্ষ্য দর্শক (ঐচ্ছিক)",
    targetAudiencePlaceholder: "যেমন: স্টার্টআপ, ই-কমার্স ব্যবসা, ইউটিউবার...",
    keywordBtn: "র‍্যাংকিং কীওয়ার্ড খুঁজুন →",
    keywordingBtn: "রিসার্চ হচ্ছে...",
    // Results
    tryAgain: "← আবার চেষ্টা করুন",
    allModules: "← সব মডিউল",
    runningModule: "চলছে",
    // Pricing Modal
    getAnalysisCredits: "বিশ্লেষণ ক্রেডিট পান",
    creditDesc: "১ ক্রেডিট = ১ মডিউল ব্যবহার। ক্রেডিট কখনো মেয়াদ উত্তীর্ণ হয় না।",
    howItWorks: "কীভাবে কাজ করে:",
    howItWorksDesc: "একটি প্ল্যান কিনুন → ইমেইলে License Key পাবেন → নিচে key দিয়ে ক্রেডিট চালু করুন।",
    popular: "জনপ্রিয়",
    buyNow: "এখন কিনুন →",
    redeemKey: "লাইসেন্স KEY রিডিম করুন",
    redeemDesc: "কেনার পর ইমেইলে পাওয়া key দিন।",
    redeemPlaceholder: "XXXX-XXXX-XXXX-XXXX",
    checking: "যাচাই হচ্ছে...",
    redeem: "রিডিম",
    invalidFormat: "ভুল key ফরম্যাট। উদাহরণ: ABCD-1234-EFGH-5678",
    alreadyRedeemed: "এই key আগেই ব্যবহার হয়েছে।",
    verifying: "Key যাচাই হচ্ছে...",
    networkError: "নেটওয়ার্ক সমস্যা। আবার চেষ্টা করুন।",
    // Tabs
    algoFactors: "অ্যালগো ফ্যাক্টর",
    seoAudit: "SEO অডিট",
    actionPlan: "অ্যাকশন প্ল্যান",
    // Factor labels
    topWins: "শীর্ষ সুবিধা",
    criticalIssues: "গুরুত্বপূর্ণ সমস্যা",
    algoBreakdown: "২০২৬ অ্যালগরিদম ফ্যাক্টর বিশ্লেষণ",
    titleSeo: "টাইটেল SEO বিশ্লেষণ",
    currentTitleLabel: "বর্তমান টাইটেল",
    keywordAtStart: "শুরুতে কীওয়ার্ড",
    slugOptimized: "Slug অপ্টিমাইজড",
    suggestedTitle: "✨ প্রস্তাবিত অপ্টিমাইজড টাইটেল",
    gigTags: "গিগ ট্যাগ",
    missingKeywords: "💡 মিসিং হাই-ভ্যালু কীওয়ার্ড",
    slugAnalysis: "🆕 ২০২৬ — গিগ URL স্লাগ বিশ্লেষণ",
    pricingSignal: "🆕 ২০২৬ — প্রাইসিং সিগন্যাল",
    prioritizedPlan: "অগ্রাধিকার ভিত্তিক অ্যাকশন প্ল্যান",
    algoNote: "📌 অ্যালগরিদম নোট",
    freshnessTip: "🆕 ২০২৬ — গিগ ফ্রেশনেস কৌশল",
    multiGig: "🆕 ২০২৬ — মাল্টি-গিগ কৌশল",
    competitorEdge: "🎯 প্রতিযোগী এজ",
    marketOverview: "বাজার পর্যালোচনা",
    yourAdvantages: "আপনার সুবিধা",
    yourGaps: "আপনার দুর্বলতা",
    competitorBreakdown: "প্রতিযোগী বিশ্লেষণ",
    pricingBenchmark: "💰 প্রাইসিং বেঞ্চমার্ক",
    marketGaps: "🎯 বাজারের সুযোগ",
    winningStrategy: "🏆 জয়ের কৌশল",
    currentScore2: "বর্তমান স্কোর",
    targetScore: "লক্ষ্য স্কোর",
    projectedLevel: "প্রত্যাশিত লেভেল",
    weekRoadmap: "📅 ৪-সপ্তাহের রোডম্যাপ",
    kpiTargets: "📊 KPI লক্ষ্যমাত্রা",
    revenueImpact: "💰 আনুমানিক আয়ের প্রভাব",
    primaryKeyword: "🎯 প্রধান কীওয়ার্ড",
    nicheOpportunity: "📈 নিশ সুযোগ",
    keywordOpportunities: "🔑 কীওয়ার্ড সুযোগ (১০টি)",
    suggestedTitleLabel: "✨ সেরা কীওয়ার্ড দিয়ে প্রস্তাবিত টাইটেল",
    suggestedTagsLabel: "🏷️ প্রস্তাবিত ট্যাগ (৫/৫)",
    seasonalTips: "📅 মৌসুমী টিপস",
    avoidKeywords: "🚫 এড়িয়ে চলুন",
    optimizedTitle: "✨ অপ্টিমাইজড টাইটেল",
    optimizedTags: "🏷️ অপ্টিমাইজড ট্যাগ (৫/৫)",
    optimizedDesc: "📝 অপ্টিমাইজড বিবরণ",
    packageSuggestions: "💼 প্যাকেজ পরামর্শ",
    suggestedFaqs: "❓ প্রস্তাবিত FAQ",
    expectedImprovement: "📈 প্রত্যাশিত উন্নতি",
    copy: "কপি",
    copied: "কপি হয়েছে ✓",
    ordersEstimate: "অর্ডার",
    confidence: "নিশ্চয়তা",
    growthDrivers: "গ্রোথ চালক",
    riskFactors: "ঝুঁকির কারণ",
    keyMilestones: "মূল মাইলস্টোন",
    recommendation: "📊 পরামর্শ",
    week: "সপ্তাহ",
    month: "মাস",
    current: "বর্তমান",
    days30: "৩০ দিন",
    days90: "৯০ দিন",
    per: "/ ক্রেডিট",
    minPrice: "সর্বনিম্ন প্রস্তাবিত",
    highImpact: "উচ্চ প্রভাব",
    mediumImpact: "মধ্যম প্রভাব",
    strong: "শক্তিশালী",
    avg: "গড়",
    weak2: "দুর্বল",
    low: "কম",
    medium: "মধ্যম",
    high: "বেশি",
  },
};

// ══════════════════════════════════════════
//  THEME COLORS
// ══════════════════════════════════════════
const THEMES = {
  dark: {
    bg:      "#030712",
    surface: "#0a0f1e",
    border:  "#1e293b",
    text:    "#e2e8f0",
    muted:   "#475569",
    subtext: "#94a3b8",
    inputBg: "#030712",
    cardBg:  "#0a0f1e",
    navBg:   "rgba(3,7,18,0.9)",
    gridCol: "#1e293b",
    shadow:  "rgba(0,0,0,0.4)",
  },
  light: {
    bg:      "#f8fafc",
    surface: "#ffffff",
    border:  "#e2e8f0",
    text:    "#0f172a",
    muted:   "#64748b",
    subtext: "#475569",
    inputBg: "#f1f5f9",
    cardBg:  "#ffffff",
    navBg:   "rgba(248,250,252,0.95)",
    gridCol: "#cbd5e1",
    shadow:  "rgba(0,0,0,0.08)",
  },
};


// ══════════════════════════════════════════
//  CONSTANTS
// ══════════════════════════════════════════
const MODULES = [
  { id: "analyzer",   icon: "◈", label: "Gig Analyzer",      cost: 1, color: "#00d4aa", desc: "Full 2026 algorithm analysis" },
  { id: "competitor", icon: "◎", label: "Competitor Spy",     cost: 2, color: "#0ea5e9", desc: "Compare vs top competitors" },
  { id: "predict",    icon: "◬", label: "Rank Predictor",     cost: 1, color: "#7c3aed", desc: "30/60/90 day forecast" },
  { id: "rewriter",   icon: "✦", label: "Gig Rewriter",       cost: 2, color: "#f59e0b", desc: "AI-optimized title, desc, tags" },
  { id: "roadmap",    icon: "▲", label: "Growth Roadmap",     cost: 3, color: "#ef4444", desc: "90-day step-by-step plan" },
  { id: "keyword",    icon: "⬡", label: "Keyword Research",   cost: 1, color: "#10b981", desc: "Find ranking keywords" },
];

const ALGO_FACTORS = [
  { key: "successScore",      label: "Success Score",      weight: 22, color: "#ff6b35" },
  { key: "ctr",               label: "CTR",                weight: 18, color: "#00d4aa" },
  { key: "buyerSatisfaction", label: "Buyer Satisfaction", weight: 13, color: "#7c3aed" },
  { key: "gigSEO",            label: "Gig SEO",            weight: 10, color: "#0ea5e9" },
  { key: "repeatBuyers",      label: "Repeat Buyers",      weight:  9, color: "#f59e0b" },
  { key: "deliveryTime",      label: "On-Time Delivery",   weight:  8, color: "#10b981" },
  { key: "responseRate",      label: "Response Rate",      weight:  6, color: "#ec4899" },
  { key: "profileComplete",   label: "Profile Complete",   weight:  4, color: "#8b5cf6" },
  { key: "gigSlug",           label: "Gig URL Slug",       weight:  4, color: "#06b6d4", new: true },
  { key: "orderValue",        label: "Order Value Signal", weight:  3, color: "#84cc16", new: true },
  { key: "gigFreshness",      label: "Gig Freshness",      weight:  3, color: "#fb923c", new: true },
];

// ══════════════════════════════════════════
//  STYLES — generated per theme
// ══════════════════════════════════════════
function makeStyles(th) {
  const S = {
  wrap: { minHeight: "100vh", background: th.bg, position: "relative", overflow: "hidden" },
  grid: { position: "fixed", inset: 0, backgroundImage: `radial-gradient(circle at 1px 1px, ${th.gridCol} 1px, transparent 0)`, backgroundSize: "32px 32px", opacity: 0.35, pointerEvents: "none", zIndex: 0 },
  glow1: { position: "fixed", top: -300, right: -200, width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,170,0.06), transparent 65%)", pointerEvents: "none", zIndex: 0 },
  glow2: { position: "fixed", bottom: -200, left: -200, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.05), transparent 65%)", pointerEvents: "none", zIndex: 0 },
  main: { position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "0 20px 80px" },

  // Nav
  nav: { position: "sticky", top: 0, zIndex: 100, background: th.navBg, backdropFilter: "blur(16px)", borderBottom: `1px solid ${th.border}`, padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  brand: { fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 16, letterSpacing: -0.5, color: th.text },
  navRight: { display: "flex", alignItems: "center", gap: 10 },
  creditBadge: { display: "flex", alignItems: "center", gap: 7, background: th.surface, border: `1px solid ${th.border}`, borderRadius: 20, padding: "6px 14px", cursor: "pointer", transition: "all 0.2s" },
  buyBtn: { background: "linear-gradient(135deg, #00d4aa, #0ea5e9)", border: "none", borderRadius: 20, padding: "7px 16px", color: "#030712", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: 1, cursor: "pointer" },

  // Header
  header: { padding: "44px 0 36px" },
  badge: { display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18 },
  dot: { width: 8, height: 8, borderRadius: "50%", background: "#00d4aa", boxShadow: "0 0 12px #00d4aa" },
  badgeText: { fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 3, color: th.muted },
  h1: { fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,6vw,56px)", fontWeight: 900, lineHeight: 1, letterSpacing: -2, marginBottom: 12 },
  outline: { WebkitTextStroke: `1px ${th.border}`, color: "transparent" },
  desc: { color: th.muted, fontSize: 14, lineHeight: 1.7, maxWidth: 500, fontWeight: 300, marginBottom: 24 },

  // Module grid
  modGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 28 },
  modCard: { borderRadius: 14, padding: "18px 16px", border: `1px solid ${th.border}`, cursor: "pointer", transition: "all 0.2s", background: th.surface, position: "relative" },
  modIcon: { fontSize: 22, marginBottom: 8 },
  modLabel: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 12, marginBottom: 4 },
  modDesc: { fontSize: 11, color: th.muted, marginBottom: 10 },
  modCost: { fontSize: 10, fontFamily: "'Syne', sans-serif", fontWeight: 700, letterSpacing: 1 },

  // Panel
  panel: { background: th.surface, border: `1px solid ${th.border}`, borderRadius: 14, padding: "20px 22px", marginBottom: 12 },
  panelLabel: { fontFamily: "'Syne', sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: 3, color: th.muted, marginBottom: 12, textTransform: "uppercase" },

  // Input
  input: { width: "100%", background: th.inputBg, border: `1px solid ${th.border}`, borderRadius: 10, padding: "12px 14px", color: "#e2e8f0", fontSize: 13, outline: "none", fontFamily: "monospace", boxSizing: "border-box" },
  textarea: { width: "100%", background: th.inputBg, border: `1px solid ${th.border}`, borderRadius: 10, padding: "12px 14px", color: "#e2e8f0", fontSize: 13, outline: "none", fontFamily: "monospace", resize: "vertical", lineHeight: 1.7, boxSizing: "border-box" },
  label: { fontSize: 10, color: th.muted, marginBottom: 6, display: "block", fontFamily: "'Syne', sans-serif", fontWeight: 700, letterSpacing: 1 },

  // Buttons
  primaryBtn: { width: "100%", padding: 16, border: "none", borderRadius: 12, background: "linear-gradient(135deg, #00d4aa, #0ea5e9)", color: "#030712", fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 14, letterSpacing: 2, cursor: "pointer" },
  secondaryBtn: { background: "transparent", border: `1px solid ${th.border}`, borderRadius: 10, padding: "10px 18px", color: "#475569", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 1, cursor: "pointer" },
  backBtn: { width: "100%", marginTop: 16, background: "transparent", border: `1px solid ${th.border}`, borderRadius: 10, padding: "12px", color: th.muted, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 2, cursor: "pointer" },

  // Error
  error: { background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#ef4444", marginBottom: 12 },

  // Score ring
  heroCard: { borderRadius: 20, padding: 28, marginBottom: 12, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" },
  heroInfo: { flex: 1, minWidth: 200 },
  tierBadge: { fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 800, letterSpacing: 3, marginBottom: 8 },
  gigTitle: { fontFamily: "'Syne', sans-serif", fontSize: "clamp(16px,3vw,22px)", fontWeight: 900, lineHeight: 1.2, marginBottom: 10 },
  execSummary: { fontSize: 13, color: th.subtext, lineHeight: 1.7 },

  // Factor bar
  factorItem: { borderRadius: 12, padding: "12px 14px", marginBottom: 8 },
  barTrack: { height: 5, background: th.bg, borderRadius: 5, overflow: "hidden", marginTop: 8 },
  barFill: { height: "100%", borderRadius: 5 },
  factorInsight: { fontSize: 11, color: th.muted, marginTop: 6 },

  // Tag chip
  tag: { borderRadius: 20, padding: "4px 12px", fontSize: 11, display: "inline-block", margin: "3px 3px" },

  // Action item
  actionItem: { background: th.bg, border: `1px solid ${th.border}`, borderRadius: 12, padding: 16, marginBottom: 10 },
  stepNum: { width: 26, height: 26, borderRadius: "50%", background: th.surface, border: `1px solid ${th.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 900, color: "#475569", flexShrink: 0 },
  pill: { fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20, fontFamily: "'Syne', sans-serif", letterSpacing: 1 },

  // Info box
  infoBox: { borderRadius: 14, padding: "16px 18px", marginBottom: 10 },
  infoLabel: { fontFamily: "'Syne', sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: 3, marginBottom: 8 },
  infoText: { fontSize: 12, color: th.subtext, lineHeight: 1.7 },

  // Table
  table: { width: "100%", borderCollapse: "collapse", fontSize: 12 },
  th: { textAlign: "left", padding: "8px 12px", fontFamily: "'Syne', sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: 2, color: th.muted, borderBottom: `1px solid ${th.border}` },
  td: { padding: "10px 12px", borderBottom: `1px solid ${th.border}`, color: th.subtext, verticalAlign: "top" },

  // Modal
  overlay: { position: "fixed", inset: 0, zIndex: 1000, background: "rgba(3,7,18,0.92)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
  modalBox: { background: th.surface, border: `1px solid ${th.border}`, borderRadius: 24, padding: 32, maxWidth: 600, width: "100%" },
  planCard: { borderRadius: 14, padding: 20, border: `1px solid ${th.border}`, cursor: "pointer", background: th.bg, transition: "all 0.2s", position: "relative" },

  // Tabs
  tabBar: { display: "flex", gap: 4, background: th.surface, border: `1px solid ${th.border}`, borderRadius: 12, padding: 4, marginBottom: 12 },
  tabBtn: { flex: 1, background: "none", border: "none", cursor: "pointer", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: 1.5, padding: "8px 12px", borderRadius: 6, transition: "all 0.2s" },

  // Loading
  spinner: { width: 44, height: 44, border: `3px solid ${th.border}`, borderTopColor: "#00d4aa", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" },
  };
  return S;
}

// ══════════════════════════════════════════
//  CREDIT SYSTEM
// ══════════════════════════════════════════
function getCredits() { return parseInt(localStorage.getItem("gr_credits") || "0", 10); }
function setCredits(n) { localStorage.setItem("gr_credits", Math.max(0, n).toString()); }
function addCredits(n) { setCredits(getCredits() + n); }
function useCredits(n) { setCredits(getCredits() - n); }

// ══════════════════════════════════════════
//  SMALL COMPONENTS
// ══════════════════════════════════════════
function Spinner({ label = "Analyzing...", th, S }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={S.spinner} />
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, color: th ? th.muted : "#475569" }}>{label}</div>
    </div>
  );
}

function ErrorBox({ msg, S }) {
  if (!msg) return null;
  return <div style={S.error}>⚠ {msg}</div>;
}

function InfoBox({ label, text, color = "#7c3aed", S }) {
  return (
    <div style={{ ...S.infoBox, background: `${color}08`, border: `1px solid ${color}22` }}>
      <div style={{ ...S.infoLabel, color }}>{label}</div>
      <div style={S.infoText}>{text}</div>
    </div>
  );
}

function WinLoss({ wins = [], losses = [], winLabel = "TOP WINS", lossLabel = "CRITICAL ISSUES", th, S }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
      <div style={{ background: "rgba(0,212,170,0.04)", border: "1px solid rgba(0,212,170,0.12)", borderRadius: 14, padding: 16 }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: 3, color: "#00d4aa", marginBottom: 10 }}>{winLabel}</div>
        {wins.map((w, i) => <div key={i} style={{ fontSize: 12, color: (th||{}).subtext||"#94a3b8", marginBottom: 7, paddingLeft: 14, position: "relative" }}><span style={{ position: "absolute", left: 0, color: "#00d4aa" }}>✓</span>{w}</div>)}
      </div>
      <div style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.12)", borderRadius: 14, padding: 16 }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: 3, color: "#ef4444", marginBottom: 10 }}>{lossLabel}</div>
        {losses.map((w, i) => <div key={i} style={{ fontSize: 12, color: (th||{}).subtext||"#94a3b8", marginBottom: 7, paddingLeft: 14, position: "relative" }}><span style={{ position: "absolute", left: 0, color: "#ef4444" }}>✗</span>{w}</div>)}
      </div>
    </div>
  );
}

function ScoreRing({ score = 0, tier = "average" }) {
  const tiers = { elite: "#00d4aa", strong: "#0ea5e9", average: "#f59e0b", weak: "#ef4444" };
  const col = tiers[tier] || "#f59e0b";
  const circ = 326.7;
  const offset = circ - (score / 100) * circ;
  return (
    <svg width="130" height="130" viewBox="0 0 140 140">
      <defs>
        <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={col} />
          <stop offset="100%" stopColor={col + "88"} />
        </linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <circle cx="70" cy="70" r="52" fill="none" stroke="#1e293b" strokeWidth="10" />
      <circle cx="70" cy="70" r="52" fill="none" stroke="url(#sg)" strokeWidth="10"
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        transform="rotate(-90 70 70)" filter="url(#glow)"
        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.34,1.56,0.64,1)" }} />
      <text x="70" y="64" textAnchor="middle" fill={col} fontSize="30" fontWeight="900" fontFamily="'Syne',sans-serif">{score}</text>
      <text x="70" y="80" textAnchor="middle" fill="#475569" fontSize="11" fontFamily="'Syne',sans-serif">/100</text>
      <text x="70" y="97" textAnchor="middle" fill={col} fontSize="9" fontWeight="700" letterSpacing="2" fontFamily="'Syne',sans-serif">{tier.toUpperCase()}</text>
    </svg>
  );
}

function FactorBar({ factor, data, t, th, S }) {
  const col = factor.color;
  const score = data?.score ?? 50;
  const isGood = score >= 70, isMid = score >= 45;
  const c = isGood ? "#00d4aa" : isMid ? "#f59e0b" : "#ef4444";
  const status = isGood ? (t?.strong||"STRONG") : isMid ? (t?.avg||"AVG") : (t?.weak2||"WEAK");
  const uc = data?.urgency === "high" ? "#ef4444" : data?.urgency === "medium" ? "#f59e0b" : "#00d4aa";
  return (
    <div style={{ ...S.factorItem, background: `${c}0a`, border: `1px solid ${c}20` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <span style={{ color: col, fontSize: 16 }}>●</span>
        <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, color: "#cbd5e1" }}>
            {factor.label} {factor.new && <span style={{ fontSize: 8, background: "#00d4aa22", color: "#00d4aa", padding: "1px 5px", borderRadius: 4, marginLeft: 4 }}>NEW</span>}
          </span>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 10, color: "#475569", fontFamily: "monospace" }}>{factor.weight}%</span>
            <span style={{ ...S.pill, background: `${c}22`, color: c }}>{status}</span>
          </div>
        </div>
      </div>
      <div style={S.barTrack}>
        <div style={{ ...S.barFill, width: `${score}%`, background: `linear-gradient(90deg, ${c}, ${c}88)`, boxShadow: `0 0 10px ${c}66`, transition: "width 1s ease" }} />
      </div>
      <div style={{ ...S.factorInsight, display: "flex", gap: 8 }}>
        <span style={{ ...S.pill, background: `${uc}22`, color: uc, fontSize: 9 }}>{(data?.urgency || "low").toUpperCase()}</span>
        {data?.insight}
      </div>
    </div>
  );
}

function ActionList({ actions = [], t, th, S }) {
  return actions.map((q, i) => {
    const ic = q.impact === "high" ? "#00d4aa" : "#f59e0b";
    const tc = q.timeframe === "24h" ? "#ef4444" : q.timeframe === "1week" ? "#f59e0b" : ((th||{}).muted||"#94a3b8");
    const impactLabel = q.impact === "high" ? (t?.highImpact||"HIGH IMPACT") : (t?.mediumImpact||"MEDIUM IMPACT");
    return (
      <div key={i} style={S.actionItem}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <div style={{ ...S.stepNum, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</div>
          <span style={{ ...S.pill, background: `${ic}22`, color: ic }}>{impactLabel}</span>
          <span style={{ ...S.pill, background: `${tc}22`, color: tc }}>⏱ {q.timeframe || ""}</span>
        </div>
        <div style={{ fontSize: 13, color: th.text, lineHeight: 1.6, paddingLeft: 34 }}>{q.action}</div>
      </div>
    );
  });
}

// ══════════════════════════════════════════
//  RESULT VIEWS
// ══════════════════════════════════════════
function AnalyzerResult({ r, t, th, S }) {
  const [tab, setTab] = useState("factors");
  const tiers = { elite: "#00d4aa", strong: "#0ea5e9", average: "#f59e0b", weak: "#ef4444" };
  const col = tiers[r.rankTier] || "#f59e0b";
  const tabs = ["factors", "seo", "action"];

  return (
    <div>
      <div style={{ ...S.heroCard, background: `${col}08`, border: `1px solid ${col}20` }}>
        <ScoreRing score={r.overallScore} tier={r.rankTier} />
        <div style={S.heroInfo}>
          <div style={{ ...S.tierBadge, color: col }}>{(r.rankTier || "").toUpperCase()} RANKING</div>
          <div style={{ ...S.gigTitle, color: th.text }}>{r.gigTitle}</div>
          <div style={{ fontSize: 12, color: th.muted, marginBottom: 10 }}>{r.sellerUsername ? `@${r.sellerUsername}` : ""} {r.niche ? `· ${r.niche}` : ""}</div>
          <div style={S.execSummary}>{r.executiveSummary}</div>
        </div>
      </div>

      <div style={S.tabBar}>
        {tabs.map(tab2 => (
          <button key={tab2} onClick={() => setTab(tab2)}
            style={{ ...S.tabBtn, background: tab === tab2 ? th.border : "none", color: tab === tab2 ? th.text : th.muted }}>
            {tab2 === "factors" ? t.algoFactors : tab2 === "seo" ? t.seoAudit : t.actionPlan}
          </button>
        ))}
      </div>

      {tab === "factors" && (
        <div>
          <WinLoss wins={r.topWins} losses={r.criticalIssues} winLabel={t.topWins} lossLabel={t.criticalIssues} th={th} S={S} />
          <div style={S.panel}>
            <div style={S.panelLabel}>2026 ALGORITHM FACTOR BREAKDOWN</div>
            {ALGO_FACTORS.map(f => <FactorBar key={f.key} factor={f} data={r.algorithmFactors?.[f.key]} t={t} th={th} S={S} />)}
          </div>
          {r.competitorEdge && <InfoBox label="🎯 COMPETITOR EDGE" text={r.competitorEdge} color="#0ea5e9" S={S} />}
        </div>
      )}

      {tab === "seo" && (
        <div>
          <div style={S.panel}>
            <div style={S.panelLabel}>TITLE SEO ANALYSIS</div>
            <div style={{ fontSize: 10, color: "#475569", marginBottom: 6 }}>CURRENT TITLE</div>
            <div style={{ background: th.bg, borderRadius: 8, padding: "10px 12px", fontFamily: "monospace", fontSize: 13, color: th.text, marginBottom: 12 }}>{r.titleAnalysis?.currentTitle || "—"}</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              {[
                { label: "Keyword at Start", ok: r.titleAnalysis?.hasMainKeywordFirst },
                { label: "Slug Optimized", ok: r.titleAnalysis?.slugOptimized },
              ].map((c, i) => (
                <div key={i} style={{ flex: 1, background: c.ok ? "rgba(0,212,170,0.06)" : "rgba(239,68,68,0.06)", border: `1px solid ${c.ok ? "#00d4aa33" : "#ef444433"}`, borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: 18, marginBottom: 4 }}>{c.ok ? "✅" : "❌"}</div>
                  <div style={{ fontSize: 10, color: "#475569" }}>{c.label}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 10, color: "#00d4aa", marginBottom: 6 }}>✨ SUGGESTED OPTIMIZED TITLE</div>
            <div style={{ background: "rgba(0,212,170,0.06)", border: "1px solid rgba(0,212,170,0.25)", borderRadius: 8, padding: "10px 12px", fontFamily: "monospace", fontSize: 13, color: "#00d4aa" }}>{r.titleAnalysis?.suggestedTitle || "—"}</div>
          </div>
          {r.titleAnalysis?.slugAnalysis && <InfoBox label="🆕 2026 — GIG URL SLUG ANALYSIS" text={r.titleAnalysis.slugAnalysis} color="#06b6d4" S={S} />}
          <div style={S.panel}>
            <div style={S.panelLabel}>GIG TAGS</div>
            <div style={{ marginBottom: 12 }}>
              {(r.tagAnalysis?.detectedTags || []).map((t, i) => <span key={i} style={{ ...S.tag, background: "rgba(0,212,170,0.08)", border: "1px solid #00d4aa33", color: "#00d4aa" }}>{t}</span>)}
            </div>
            <div style={{ fontSize: 10, color: "#f59e0b", marginBottom: 8 }}>💡 MISSING HIGH-VALUE KEYWORDS</div>
            {(r.tagAnalysis?.missingKeywords || []).map((t, i) => <span key={i} style={{ ...S.tag, background: "rgba(245,158,11,0.08)", border: "1px solid #f59e0b33", color: "#f59e0b" }}>+ {t}</span>)}
          </div>
          {r.pricingAnalysis && (
            <div style={S.panel}>
              <div style={S.panelLabel} style={{ color: "#84cc16" }}>🆕 2026 — PRICING SIGNAL</div>
              <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.7 }}>
                <span style={{ ...S.pill, background: "#84cc1622", color: "#84cc16", marginRight: 8 }}>{(r.pricingAnalysis.currentPricing || "").toUpperCase()}</span>
                {r.pricingAnalysis.suggestedMinPrice && <span style={{ color: "#84cc16", fontWeight: 700 }}>Min: ${r.pricingAnalysis.suggestedMinPrice}</span>}
                <br /><br />{r.pricingAnalysis.insight}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "action" && (
        <div>
          <div style={S.panel}>
            <div style={S.panelLabel}>PRIORITIZED ACTION PLAN</div>
            <ActionList actions={r.quickWins} t={t} th={th} S={S} />
          </div>
          {r.algorithmNote && <InfoBox label="📌 ALGORITHM NOTE" text={r.algorithmNote} color="#7c3aed" S={S} />}
          {r.freshnessTip && <InfoBox label="🆕 2026 — GIG FRESHNESS STRATEGY" text={r.freshnessTip} color="#fb923c" S={S} />}
          {r.multiGigStrategy && <InfoBox label="🆕 2026 — MULTI-GIG STRATEGY" text={r.multiGigStrategy} color="#84cc16" S={S} />}
        </div>
      )}
    </div>
  );
}

function CompetitorResult({ r, t, th, S }) {
  return (
    <div>
      <div style={{ ...S.panel, marginBottom: 12 }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: 3, color: "#0ea5e9", marginBottom: 8 }}>MARKET OVERVIEW</div>
        <div style={{ fontSize: 13, color: th.subtext, lineHeight: 1.7 }}>{r.marketOverview}</div>
      </div>
      <WinLoss wins={r.yourAdvantages} losses={r.yourGaps} winLabel={t.yourAdvantages} lossLabel={t.yourGaps} th={th} S={S} />
      <div style={S.panel}>
        <div style={S.panelLabel}>COMPETITOR BREAKDOWN</div>
        <div style={{ overflowX: "auto" }}>
          <table style={S.table}>
            <thead>
              <tr>
                {["Gig", "Score", "Price", "Reviews", "Key Differentiator"].map(h => <th key={h} style={S.th}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {(r.competitors || []).map((c, i) => (
                <tr key={i}>
                  <td style={S.td}><div style={{ fontWeight: 600, color: th.text }}>{c.gigTitle}</div><div style={{ color: th.muted, fontSize: 11 }}>@{c.sellerUsername}</div></td>
                  <td style={S.td}><span style={{ color: c.overallScore >= 70 ? "#00d4aa" : c.overallScore >= 45 ? "#f59e0b" : "#ef4444", fontWeight: 700, fontFamily: "'Syne', sans-serif" }}>{c.overallScore}</span></td>
                  <td style={S.td}>{c.pricePoint}</td>
                  <td style={S.td}>{c.reviewScore}⭐ ({c.reviewCount})</td>
                  <td style={S.td}>{c.keyDifferentiator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        <InfoBox label="💰 PRICING BENCHMARK" text={`Low: $${r.pricingBenchmark?.lowest} · Avg: $${r.pricingBenchmark?.average} · High: $${r.pricingBenchmark?.highest}\n\n${r.pricingBenchmark?.recommendation}`} color="#f59e0b" S={S} />
        <InfoBox label="🎯 MARKET GAPS" text={(r.marketGaps || []).join("\n\n")} color="#00d4aa" S={S} />
      </div>
      <InfoBox label="🏆 WINNING STRATEGY" text={r.winningStrategy} color="#0ea5e9" S={S} />
    </div>
  );
}

function PredictResult({ r, t, th, S }) {
  const days = [
    { label: "30 DAYS", d: r.predictions?.day30, col: "#f59e0b" },
    { label: "60 DAYS", d: r.predictions?.day60, col: "#0ea5e9" },
    { label: "90 DAYS", d: r.predictions?.day90, col: "#00d4aa" },
  ];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 12 }}>
        {days.map(({ label, d, col }) => (
          <div key={label} style={{ background: `${col}08`, border: `1px solid ${col}22`, borderRadius: 14, padding: 18, textAlign: "center" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: 3, color: col, marginBottom: 12 }}>{label}</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 900, color: col, lineHeight: 1 }}>{d?.score || "—"}</div>
            <div style={{ fontSize: 10, color: "#475569", marginBottom: 12 }}>/100</div>
            <div style={{ fontSize: 11, color: th.subtext, marginBottom: 6 }}>📦 ~{d?.ordersEstimate || 0} orders</div>
            <div style={{ fontSize: 11, color: "#84cc16", marginBottom: 8 }}>💰 ~${d?.revenueEstimate || 0}</div>
            <span style={{ ...S.pill, fontSize: 9, background: `${col}22`, color: col }}>Confidence: {d?.confidence || "—"}</span>
          </div>
        ))}
      </div>
      <WinLoss wins={r.growthDrivers} losses={r.riskFactors} winLabel={t.growthDrivers} lossLabel={t.riskFactors} th={th} S={S} />
      <div style={S.panel}>
        <div style={S.panelLabel}>KEY MILESTONES</div>
        {(r.keyMilestones || []).map((m, i) => (
          <div key={i} style={{ ...S.actionItem, marginBottom: 8 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: "#00d4aa", marginBottom: 4 }}>{m.milestone}</div>
            <div style={{ fontSize: 11, color: th.muted }}>Expected: {m.expectedDate} · {m.impact}</div>
          </div>
        ))}
      </div>
      <InfoBox label="📊 RECOMMENDATION" text={r.recommendation} color="#7c3aed" S={S} />
    </div>
  );
}

function RewriterResult({ r, t, th, S }) {
  const [copied, setCopied] = useState("");
  const copy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };
  const CopyBtn = ({ text, k }) => (
    <button onClick={() => copy(text, k)} style={{ background: copied === k ? "#00d4aa22" : "transparent", border: `1px solid ${copied === k ? "#00d4aa" : "#1e293b"}`, borderRadius: 6, padding: "4px 10px", color: copied === k ? "#00d4aa" : "#475569", fontSize: 10, cursor: "pointer", fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>
      {copied === k ? t.copied : t.copy}
    </button>
  );
  return (
    <div>
      <div style={S.panel}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={S.panelLabel}>✨ OPTIMIZED TITLE</div>
          <CopyBtn text={r.optimizedTitle} k="title" />
        </div>
        <div style={{ background: th.bg, borderRadius: 8, padding: "12px 14px", fontFamily: "monospace", fontSize: 14, color: "#00d4aa", marginBottom: 8 }}>{r.optimizedTitle}</div>
        <div style={{ fontSize: 11, color: th.muted }}>{r.titleExplanation}</div>
      </div>
      <div style={S.panel}>
        <div style={S.panelLabel}>🏷️ OPTIMIZED TAGS (5/5)</div>
        <div style={{ marginBottom: 12 }}>
          {(r.tags || []).map((t, i) => <span key={i} style={{ ...S.tag, background: "rgba(0,212,170,0.08)", border: "1px solid #00d4aa33", color: "#00d4aa" }}>{t}</span>)}
        </div>
        <div style={{ fontSize: 11, color: th.muted }}>{r.tagStrategy}</div>
      </div>
      <div style={S.panel}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={S.panelLabel}>📝 OPTIMIZED DESCRIPTION</div>
          <CopyBtn text={r.optimizedDescription} k="desc" />
        </div>
        <div style={{ background: "#030712", borderRadius: 8, padding: "14px", fontFamily: "monospace", fontSize: 12, color: th.subtext, whiteSpace: "pre-wrap", lineHeight: 1.7, maxHeight: 300, overflowY: "auto" }}>{r.optimizedDescription}</div>
      </div>
      <div style={S.panel}>
        <div style={S.panelLabel}>💼 PACKAGE SUGGESTIONS</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {["basic", "standard", "premium"].map(pkg => {
            const p = r.packages?.[pkg];
            const cols = { basic: "#475569", standard: "#0ea5e9", premium: "#f59e0b" };
            return p ? (
              <div key={pkg} style={{ background: `${cols[pkg]}08`, border: `1px solid ${cols[pkg]}22`, borderRadius: 12, padding: 14 }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: 2, color: cols[pkg], marginBottom: 8 }}>{pkg.toUpperCase()}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 900, color: "#e2e8f0", marginBottom: 4 }}>${p.suggestedPrice}</div>
                <div style={{ fontSize: 11, color: "#475569", marginBottom: 8 }}>{p.deliveryDays} days</div>
                <div style={{ fontSize: 11, color: th.subtext }}>{p.description}</div>
              </div>
            ) : null;
          })}
        </div>
      </div>
      {(r.faqs || []).length > 0 && (
        <div style={S.panel}>
          <div style={S.panelLabel}>❓ SUGGESTED FAQs</div>
          {r.faqs.map((f, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: th.text, marginBottom: 4 }}>Q: {f.q}</div>
              <div style={{ fontSize: 12, color: th.subtext }}>A: {f.a}</div>
            </div>
          ))}
        </div>
      )}
      <InfoBox label="📈 EXPECTED IMPROVEMENT" text={r.expectedRankingImprovement} color="#00d4aa" S={S} />
    </div>
  );
}

function RoadmapResult({ r, t, th, S }) {
  const weeks = ["week1", "week2", "week3", "week4"];
  const weekCols = ["#00d4aa", "#0ea5e9", "#7c3aed", "#f59e0b"];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 12 }}>
        {[
          { label: "CURRENT SCORE", val: `${r.currentScore}/100`, col: "#f59e0b" },
          { label: "TARGET SCORE", val: `${r.targetScore}/100`, col: "#00d4aa" },
          { label: "PROJECTED LEVEL", val: r.projectedLevel, col: "#0ea5e9" },
        ].map(({ label, val, col }) => (
          <div key={label} style={{ background: `${col}08`, border: `1px solid ${col}22`, borderRadius: 14, padding: 18, textAlign: "center" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: 2, color: col, marginBottom: 8 }}>{label}</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 900, color: "#e2e8f0" }}>{val}</div>
          </div>
        ))}
      </div>
      <div style={S.panel}>
        <div style={S.panelLabel}>📅 4-WEEK ROADMAP</div>
        {weeks.map((w, i) => {
          const week = r.roadmap?.[w];
          if (!week) return null;
          return (
            <div key={w} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${weekCols[i]}22`, border: `1px solid ${weekCols[i]}44`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 900, color: weekCols[i], flexShrink: 0 }}>{i + 1}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 800, color: weekCols[i] }}>WEEK {i + 1}: {week.theme}</div>
              </div>
              {(week.tasks || []).map((t, j) => (
                <div key={j} style={{ fontSize: 12, color: th.subtext, padding: "6px 0 6px 38px", borderBottom: "1px solid #0f172a" }}>▸ {t}</div>
              ))}
            </div>
          );
        })}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        {["month2", "month3"].map((m, i) => {
          const month = r.roadmap?.[m];
          if (!month) return null;
          const col = i === 0 ? "#0ea5e9" : "#00d4aa";
          return (
            <div key={m} style={{ background: `${col}06`, border: `1px solid ${col}20`, borderRadius: 14, padding: 16 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: 2, color: col, marginBottom: 8 }}>MONTH {i + 2}: {month.theme}</div>
              {(month.milestones || []).map((ml, j) => <div key={j} style={{ fontSize: 12, color: th.subtext, marginBottom: 6 }}>✓ {ml}</div>)}
            </div>
          );
        })}
      </div>
      <div style={S.panel}>
        <div style={S.panelLabel}>📊 KPI TARGETS</div>
        <table style={S.table}>
          <thead><tr>{["Metric", "Current", "30 Days", "90 Days"].map(h => <th key={h} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            {(r.kpis || []).map((k, i) => (
              <tr key={i}>
                <td style={S.td}><span style={{ fontWeight: 600, color: "#e2e8f0" }}>{k.metric}</span></td>
                <td style={S.td}>{k.current}</td>
                <td style={{ ...S.td, color: "#f59e0b" }}>{k.target30d}</td>
                <td style={{ ...S.td, color: "#00d4aa" }}>{k.target90d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <InfoBox label="💰 ESTIMATED REVENUE IMPACT" text={r.estimatedRevenueImpact} color="#84cc16" S={S} />
    </div>
  );
}

function KeywordResult({ r, t, th, S }) {
  const typeCols = { primary: "#00d4aa", secondary: "#0ea5e9", longtail: "#f59e0b", lsi: "#7c3aed" };
  const oppCols = { high: "#00d4aa", medium: "#f59e0b", low: "#ef4444" };
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        <InfoBox label="🎯 PRIMARY KEYWORD" text={r.primaryKeyword} color="#00d4aa" S={S} />
        <InfoBox label="📈 NICHE OPPORTUNITY" text={r.nicheOpportunity} color="#0ea5e9" S={S} />
      </div>
      <div style={S.panel}>
        <div style={S.panelLabel}>🔑 KEYWORD OPPORTUNITIES (10 KEYWORDS)</div>
        <div style={{ overflowX: "auto" }}>
          <table style={S.table}>
            <thead>
              <tr>{["Keyword", "Volume", "Competition", "Opportunity", "Use In"].map(h => <th key={h} style={S.th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {(r.keywords || []).map((k, i) => (
                <tr key={i}>
                  <td style={S.td}>
                    <span style={{ ...S.pill, background: `${typeCols[k.type] || "#475569"}22`, color: typeCols[k.type] || "#475569", marginRight: 6, fontSize: 8 }}>{k.type}</span>
                    <span style={{ color: th.text, fontWeight: 500 }}>{k.keyword}</span>
                  </td>
                  <td style={S.td}><span style={{ color: k.searchVolume === "high" ? "#00d4aa" : k.searchVolume === "medium" ? "#f59e0b" : "#475569" }}>{k.searchVolume}</span></td>
                  <td style={S.td}><span style={{ color: k.competition === "low" ? "#00d4aa" : k.competition === "medium" ? "#f59e0b" : "#ef4444" }}>{k.competition}</span></td>
                  <td style={S.td}><span style={{ color: oppCols[k.opportunity] || "#475569", fontWeight: 700 }}>{k.opportunity}</span></td>
                  <td style={S.td}>{k.suggestedUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={S.panel}>
        <div style={S.panelLabel}>✨ SUGGESTED TITLE USING TOP KEYWORDS</div>
        <div style={{ background: th.bg, borderRadius: 8, padding: "12px 14px", fontFamily: "monospace", fontSize: 14, color: "#00d4aa" }}>{r.suggestedTitle}</div>
      </div>
      <div style={S.panel}>
        <div style={S.panelLabel}>🏷️ SUGGESTED TAGS (5/5)</div>
        {(r.suggestedTags || []).map((t, i) => <span key={i} style={{ ...S.tag, background: "rgba(0,212,170,0.08)", border: "1px solid #00d4aa33", color: "#00d4aa" }}>{t}</span>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <InfoBox label="📅 SEASONAL TIPS" text={r.seasonalTips} color="#f59e0b" S={S} />
        <InfoBox label="🚫 AVOID KEYWORDS" text={(r.avoidKeywords || []).join(", ")} color="#ef4444" S={S} />
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
//  INPUT FORMS
// ══════════════════════════════════════════
function AnalyzerForm({ onSubmit, loading, t, th, S }) {
  const [mode, setMode] = useState("url");
  const [gigUrl, setGigUrl] = useState("");
  const [gigInfo, setGigInfo] = useState("");
  return (
    <div>
      <div style={{ display: "flex", background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: 12, padding: 4, marginBottom: 12 }}>
        {["url", "manual"].map(m => (
          <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: 10, borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: 1.5, background: mode === m ? "#00d4aa" : "transparent", color: mode === m ? "#030712" : (th||{}).muted||"#334155" }}>
            {m === "url" ? "🔗 GIG URL" : "📋 PASTE INFO"}
          </button>
        ))}
      </div>
      {mode === "url"
        ? <div style={S.panel}><label style={S.label}>FIVERR GIG URL</label><input style={S.input} value={gigUrl} onChange={e => setGigUrl(e.target.value)} placeholder="https://www.fiverr.com/username/gig-title" /></div>
        : <div style={S.panel}><label style={S.label}>GIG INFO — MORE DETAIL = BETTER ANALYSIS</label><textarea style={S.textarea} rows={8} value={gigInfo} onChange={e => setGigInfo(e.target.value)} placeholder={"Title: I will design a professional logo\nRating: 4.9 ⭐ (312 reviews)\nLevel: Level 2\nOrders in queue: 8\nResponse time: 1 hour\n\nPackages:\nBasic — $25 | 2-day delivery\n\nTags: logo design, minimalist logo\n\nDescription: ....."} /></div>
      }
      <button style={S.primaryBtn} onClick={() => onSubmit({ mode, gigUrl, gigInfo })} disabled={loading}>{loading ? "ANALYZING..." : "ANALYZE GIG RANKING →"}</button>
    </div>
  );
}

function CompetitorForm({ onSubmit, loading, t, th, S }) {
  const [myGig, setMyGig] = useState("");
  const [competitors, setCompetitors] = useState("");
  return (
    <div>
      <div style={S.panel}><label style={S.label}>YOUR GIG INFO</label><textarea style={S.textarea} rows={5} value={myGig} onChange={e => setMyGig(e.target.value)} placeholder="Your gig title, price, rating, tags, delivery time..." /></div>
      <div style={S.panel}><label style={S.label}>COMPETITOR GIGS (paste 2-5 competitors)</label><textarea style={S.textarea} rows={8} value={competitors} onChange={e => setCompetitors(e.target.value)} placeholder={"Competitor 1:\nURL or title, price, rating, reviews, delivery...\n\nCompetitor 2:\nURL or title, price, rating, reviews, delivery..."} /></div>
      <button style={S.primaryBtn} onClick={() => onSubmit({ myGig, competitors })} disabled={loading}>{loading ? "ANALYZING..." : "SPY ON COMPETITORS →"}</button>
    </div>
  );
}

function PredictForm({ onSubmit, loading, t, th, S }) {
  const [gigInfo, setGigInfo] = useState("");
  const [currentScore, setCurrentScore] = useState("");
  const [niche, setNiche] = useState("");
  return (
    <div>
      <div style={S.panel}><label style={S.label}>NICHE / CATEGORY</label><input style={S.input} value={niche} onChange={e => setNiche(e.target.value)} placeholder="e.g. Logo Design, WordPress Development, Video Editing..." /></div>
      <div style={S.panel}><label style={S.label}>CURRENT ANALYSIS SCORE (optional)</label><input style={S.input} value={currentScore} onChange={e => setCurrentScore(e.target.value)} placeholder="e.g. 72 (from Gig Analyzer)" /></div>
      <div style={S.panel}><label style={S.label}>GIG DETAILS</label><textarea style={S.textarea} rows={6} value={gigInfo} onChange={e => setGigInfo(e.target.value)} placeholder="Title, rating, orders, response rate, delivery rate, level, queue..." /></div>
      <button style={S.primaryBtn} onClick={() => onSubmit({ gigInfo, currentScore, niche })} disabled={loading}>{loading ? "PREDICTING..." : "PREDICT RANKING POTENTIAL →"}</button>
    </div>
  );
}

function RewriterForm({ onSubmit, loading, t, th, S }) {
  const [gigContent, setGigContent] = useState("");
  const [targetKeyword, setTargetKeyword] = useState("");
  const [niche, setNiche] = useState("");
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div style={S.panel}><label style={S.label}>TARGET KEYWORD</label><input style={S.input} value={targetKeyword} onChange={e => setTargetKeyword(e.target.value)} placeholder="e.g. minimalist logo design" /></div>
        <div style={S.panel}><label style={S.label}>NICHE</label><input style={S.input} value={niche} onChange={e => setNiche(e.target.value)} placeholder="e.g. Logo Design" /></div>
      </div>
      <div style={S.panel}><label style={S.label}>CURRENT GIG CONTENT (title + description + tags)</label><textarea style={S.textarea} rows={10} value={gigContent} onChange={e => setGigContent(e.target.value)} placeholder={"Title: ...\n\nDescription:\n...\n\nTags: ..., ..., ..."} /></div>
      <button style={S.primaryBtn} onClick={() => onSubmit({ gigContent, targetKeyword, niche })} disabled={loading}>{loading ? "REWRITING..." : "REWRITE GIG CONTENT →"}</button>
    </div>
  );
}

function RoadmapForm({ onSubmit, loading, t, th, S }) {
  const [gigInfo, setGigInfo] = useState("");
  const [currentMetrics, setCurrentMetrics] = useState("");
  return (
    <div>
      <div style={S.panel}><label style={S.label}>GIG INFO</label><textarea style={S.textarea} rows={6} value={gigInfo} onChange={e => setGigInfo(e.target.value)} placeholder="Title, niche, current rating, level, orders per month..." /></div>
      <div style={S.panel}><label style={S.label}>CURRENT METRICS (optional)</label><textarea style={S.textarea} rows={4} value={currentMetrics} onChange={e => setCurrentMetrics(e.target.value)} placeholder={"Orders this month: 12\nResponse rate: 95%\nOn-time delivery: 98%\nRepeat buyers: 30%"} /></div>
      <button style={S.primaryBtn} onClick={() => onSubmit({ gigInfo, currentMetrics })} disabled={loading}>{loading ? "BUILDING ROADMAP..." : "GENERATE 90-DAY ROADMAP →"}</button>
    </div>
  );
}

function KeywordForm({ onSubmit, loading, t, th, S }) {
  const [niche, setNiche] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  return (
    <div>
      <div style={S.panel}><label style={S.label}>NICHE / SERVICE TYPE *</label><input style={S.input} value={niche} onChange={e => setNiche(e.target.value)} placeholder="e.g. Logo Design, SEO, WordPress, Video Editing..." /></div>
      <div style={S.panel}><label style={S.label}>CURRENT GIG TITLE (optional)</label><input style={S.input} value={currentTitle} onChange={e => setCurrentTitle(e.target.value)} placeholder="Your existing gig title..." /></div>
      <div style={S.panel}><label style={S.label}>TARGET AUDIENCE (optional)</label><input style={S.input} value={targetAudience} onChange={e => setTargetAudience(e.target.value)} placeholder="e.g. Startups, E-commerce businesses, YouTubers..." /></div>
      <button style={S.primaryBtn} onClick={() => onSubmit({ niche, currentTitle, targetAudience })} disabled={loading}>{loading ? "RESEARCHING..." : "FIND RANKING KEYWORDS →"}</button>
    </div>
  );
}

// ══════════════════════════════════════════
//  PRICING MODAL
// ══════════════════════════════════════════
function PricingModal({ onClose, onCreditsAdded, t, th, S }) {
  const [licenseKey, setLicenseKey] = useState("");
  const [msg, setMsg] = useState({ text: "", ok: false });
  const [redeeming, setRedeeming] = useState(false);

  // Plans — display only, no direct credit addition
  const plans = [
    { name: "STARTER", credits: 10, price: 4.99, per: 0.50, stripe: "https://buy.stripe.com/your-starter-link", features: ["10 analyses", "All 7 modules", "2026 algorithm", "Never expire"] },
    { name: "PRO",     credits: 30, price: 9.99, per: 0.33, stripe: "https://buy.stripe.com/your-pro-link",     popular: true, features: ["30 analyses", "All 7 modules", "2026 algorithm", "Never expire"] },
    { name: "AGENCY",  credits: 100, price: 24.99, per: 0.25, stripe: "https://buy.stripe.com/your-agency-link", features: ["100 analyses", "All 7 modules", "2026 algorithm", "Never expire"] },
  ];

  // BUY NOW → opens Stripe payment page
  // After payment, seller manually sends license key via email
  const buyPlan = (plan) => {
    window.open(plan.stripe, "_blank");
  };

  const formatKey = (v) => {
    let s = v.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 16);
    return s.match(/.{1,4}/g)?.join("-") || s;
  };

  const redeem = async () => {
    const k = licenseKey.trim().toUpperCase();
    if (!/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(k)) {
      setMsg({ text: "Invalid key format. Example: ABCD-1234-EFGH-5678", ok: false }); return;
    }
    const used = JSON.parse(localStorage.getItem("gr_used_keys") || "[]");
    if (used.includes(k)) { setMsg({ text: "This key has already been redeemed on this device.", ok: false }); return; }

    setRedeeming(true);
    setMsg({ text: "Verifying key...", ok: false });
    try {
      const res  = await fetch("/api/redeem", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: k }) });
      const data = await res.json();
      if (data.success) {
        used.push(k);
        localStorage.setItem("gr_used_keys", JSON.stringify(used));
        addCredits(data.credits);
        onCreditsAdded(data.credits);
        setMsg({ text: `✅ ${data.credits} credits added successfully!`, ok: true });
        setTimeout(onClose, 1800);
      } else {
        setMsg({ text: data.error || "Invalid key.", ok: false });
      }
    } catch { setMsg({ text: "Network error. Please try again.", ok: false }); }
    finally { setRedeeming(false); }
  };

  return (
    <div style={S.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ ...S.modalBox, maxHeight: "90vh", overflowY: "auto" }}>

        {/* Header */}
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 900, letterSpacing: -0.5, marginBottom: 6 }}>Get Analysis Credits</div>
        <div style={{ fontSize: 13, color: "#475569", marginBottom: 6 }}>1 credit = 1 module use. Credits never expire.</div>
        <div style={{ background: "rgba(0,212,170,0.06)", border: "1px solid rgba(0,212,170,0.2)", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: th.subtext, marginBottom: 24 }}>
          ⚡ <strong style={{ color: "#00d4aa" }}>How it works:</strong> Purchase a plan → You receive a License Key via email → Enter the key below to activate credits.
        </div>

        {/* Plans */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
          {plans.map(p => (
            <div key={p.name} style={{ ...S.planCard, border: p.popular ? "1px solid #00d4aa" : "1px solid #1e293b" }}>
              {p.popular && <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: "#00d4aa", color: "#030712", fontFamily: "'Syne', sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: 2, padding: "3px 10px", borderRadius: 20 }}>POPULAR</div>}
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 800, color: "#475569", letterSpacing: 2, marginBottom: 8 }}>{p.name}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 900, color: "#e2e8f0", marginBottom: 4 }}>{p.credits} <span style={{ fontSize: 13, fontWeight: 400, color: "#475569" }}>credits</span></div>
              <div style={{ color: "#00d4aa", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>${p.price}</div>
              <div style={{ fontSize: 11, color: "#475569", marginBottom: 12 }}>${p.per} / credit</div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px" }}>
                {p.features.map((f, i) => <li key={i} style={{ fontSize: 11, color: th.subtext, marginBottom: 4, paddingLeft: 14, position: "relative" }}><span style={{ position: "absolute", left: 0, color: "#00d4aa" }}>✓</span>{f}</li>)}
              </ul>
              <button onClick={() => buyPlan(p)} style={{ width: "100%", padding: 10, border: p.popular ? "none" : "1px solid #1e293b", borderRadius: 8, background: p.popular ? "#00d4aa" : "transparent", color: p.popular ? "#030712" : "#e2e8f0", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 11, cursor: "pointer" }}>
                BUY NOW →
              </button>
            </div>
          ))}
        </div>

        {/* License Key Redeem */}
        <div style={{ borderTop: "1px solid #1e293b", paddingTop: 20 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#00d4aa", marginBottom: 4 }}>REDEEM LICENSE KEY</div>
          <div style={{ fontSize: 11, color: "#475569", marginBottom: 12 }}>Enter the key you received via email after purchase.</div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              style={{ ...S.input, flex: 1, borderColor: msg.ok ? "#00d4aa" : msg.text && !msg.ok ? "#ef4444" : "#1e293b" }}
              value={licenseKey}
              onChange={e => { setLicenseKey(formatKey(e.target.value)); setMsg({ text: "", ok: false }); }}
              placeholder="XXXX-XXXX-XXXX-XXXX"
              maxLength={19}
            />
            <button onClick={redeem} disabled={redeeming || licenseKey.length < 19}
              style={{ ...S.buyBtn, whiteSpace: "nowrap", padding: "10px 18px", opacity: licenseKey.length < 19 ? 0.5 : 1 }}>
              {redeeming ? t.checking : t.redeem}
            </button>
          </div>
          {msg.text && (
            <div style={{ fontSize: 11, color: msg.ok ? "#00d4aa" : "#ef4444", marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
              {msg.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
//  MAIN APP
// ══════════════════════════════════════════
export default function App() {
  const [credits, setCredits] = useState(0);
  const [activeModule, setActiveModule] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("en");

  const th = THEMES[theme];
  const S  = makeStyles(th);
  const t  = T[lang];

  useEffect(() => {
    setCredits(getCredits());
    const savedTheme = localStorage.getItem("gr_theme") || "dark";
    const savedLang  = localStorage.getItem("gr_lang")  || "en";
    setTheme(savedTheme);
    setLang(savedLang);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("gr_theme", next);
  };

  const toggleLang = () => {
    const next = lang === "en" ? "bn" : "en";
    setLang(next);
    localStorage.setItem("gr_lang", next);
  };

  const updateCredits = () => setCredits(getCredits());

  const handleModuleSelect = (mod) => {
    if (credits < mod.cost) { setShowModal(true); return; }
    setActiveModule(mod);
    setResult(null);
    setError("");
  };

  const handleSubmit = useCallback(async (payload) => {
    if (!activeModule) return;
    if (credits < activeModule.cost) { setShowModal(true); return; }
    setLoading(true);
    setError("");
    setResult(null);

    const endpointMap = { analyzer: "analyze", competitor: "competitor", predict: "predict", rewriter: "rewriter", roadmap: "roadmap", keyword: "keyword" };
    const endpoint = endpointMap[activeModule.id];

    try {
      const res = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const raw = await res.text();
      let data;
      try { data = JSON.parse(raw); } catch { throw new Error(`Server error (${res.status}). Check Vercel logs.`); }
      if (!res.ok || !data.success) throw new Error(data.error || "Analysis failed.");
      useCredits(activeModule.cost);
      updateCredits();
      setResult(data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [activeModule, credits]);

  const resetToModules = () => { setActiveModule(null); setResult(null); setError(""); };

  const FORMS = { analyzer: AnalyzerForm, competitor: CompetitorForm, predict: PredictForm, rewriter: RewriterForm, roadmap: RoadmapForm, keyword: KeywordForm };
  const RESULTS = { analyzer: AnalyzerResult, competitor: CompetitorResult, predict: PredictResult, rewriter: RewriterResult, roadmap: RoadmapResult, keyword: KeywordResult };

  const FormComponent = activeModule ? FORMS[activeModule.id] : null;
  const ResultComponent = activeModule ? RESULTS[activeModule.id] : null;

  const tierCol = { elite: "#00d4aa", strong: "#0ea5e9", average: "#f59e0b", weak: "#ef4444" };

  return (
    <div style={{ ...S.wrap, transition: 'background 0.3s' }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } input::placeholder, textarea::placeholder { color: ${th.border}; } @keyframes spin { to { transform: rotate(360deg); } } @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`}</style>
      <div style={S.grid} />
      <div style={S.glow1} />
      <div style={S.glow2} />

      {/* NAV */}
      <div style={S.nav}>
        <div style={S.brand} onClick={resetToModules} role="button" title="Home">
          Gig<span style={{ color: "#00d4aa" }}>Rank</span> <span style={{ color: "#0ea5e9" }}>AI</span>
        </div>
        <div style={S.navRight}>
          {/* Language toggle */}
          <button onClick={toggleLang} title="Switch Language" style={{ background: th.surface, border: `1px solid ${th.border}`, borderRadius: 20, padding: "6px 12px", cursor: "pointer", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 11, color: th.muted, transition: "all 0.2s", display: "flex", alignItems: "center", gap: 5 }}>
            <span>{lang === "en" ? "🇧🇩" : "🇺🇸"}</span>
            <span>{lang === "en" ? "বাংলা" : "EN"}</span>
          </button>
          {/* Theme toggle */}
          <button onClick={toggleTheme} title="Toggle Theme" style={{ background: th.surface, border: `1px solid ${th.border}`, borderRadius: 20, padding: "6px 12px", cursor: "pointer", fontSize: 14, transition: "all 0.2s" }}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          {/* Credits */}
          <div style={{ ...S.creditBadge, borderColor: credits <= 3 && credits > 0 ? "rgba(239,68,68,0.4)" : th.border }} onClick={() => setShowModal(true)}>
            <span>⚡</span>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 13, color: credits <= 3 && credits > 0 ? "#ef4444" : "#00d4aa" }}>{credits}</span>
            <span style={{ fontSize: 10, color: th.muted }}>{t.credits}</span>
          </div>
          <button style={S.buyBtn} onClick={() => setShowModal(true)}>{t.buyCredits}</button>
        </div>
      </div>

      <div style={S.main}>
        {/* HEADER — shown on homepage */}
        {!activeModule && (
          <div style={S.header}>
            <div style={S.badge}><div style={S.dot} /><span style={S.badgeText}>{t.tagline}</span></div>
            <h1 style={{ ...S.h1, color: th.text }}>{t.h1line1}<br /><span style={S.outline}>{t.h1line2}</span></h1>
            <p style={S.desc}>{t.headerDesc}</p>
            {/* Algo pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 32 }}>
              {ALGO_FACTORS.map(f => (
                <div key={f.key} style={{ display: "flex", alignItems: "center", gap: 5, background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: 20, padding: "4px 10px" }}>
                  <span style={{ fontSize: 8, color: f.color }}>●</span>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: "#64748b" }}>{f.label}</span>
                  {f.new && <span style={{ fontSize: 8, background: "#00d4aa22", color: "#00d4aa", padding: "1px 4px", borderRadius: 3 }}>NEW</span>}
                  <span style={{ fontSize: 9, color: "#1e293b" }}>|</span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: f.color }}>{f.weight}%</span>
                </div>
              ))}
            </div>

            {/* Module grid */}
            {credits === 0 && (
              <div style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 14, padding: "20px 24px", marginBottom: 20, textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>⚡</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 900, color: "#ef4444", marginBottom: 6 }}>{t.noCredits}</div>
                <div style={{ fontSize: 13, color: th.muted, marginBottom: 16 }}>{t.noCreditsDesc}</div>
                <button style={{ ...S.buyBtn, padding: "12px 28px", fontSize: 13 }} onClick={() => setShowModal(true)}>{t.getCredits}</button>
              </div>
            )}

            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: 3, color: th.muted, marginBottom: 14 }}>{t.selectModule}</div>
            <div style={{ ...S.modGrid, gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
              {MODULES.map((mod, mi) => (
                <div key={mod.id} style={{ ...S.modCard }}
                  onClick={() => handleModuleSelect(mod)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = mod.color; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 32px ${mod.color}22`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = th.border; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ ...S.modIcon, color: mod.color }}>{mod.icon}</div>
                  <div style={{ ...S.modLabel, color: th.text }}>{t.modules[mi]?.label || mod.label}</div>
                  <div style={S.modDesc}>{t.modules[mi]?.desc || mod.desc}</div>
                  <div style={{ ...S.modCost, color: mod.color }}>⚡ {mod.cost} {mod.cost > 1 ? t.credits2 : t.credit}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE VIEW */}
        {activeModule && (
          <div style={{ paddingTop: 32, animation: "fadeUp 0.4s ease" }}>
            {/* Module header */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <span style={{ fontSize: 28, color: activeModule.color }}>{activeModule.icon}</span>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 900, letterSpacing: -0.5, color: th.text }}>{t.modules[MODULES.findIndex(m=>m.id===activeModule.id)]?.label || activeModule.label}</div>
                <div style={{ fontSize: 12, color: th.muted }}>{t.modules[MODULES.findIndex(m=>m.id===activeModule.id)]?.desc || activeModule.desc} · <span style={{ color: activeModule.color }}>⚡ {activeModule.cost} {activeModule.cost > 1 ? t.credits2 : t.credit}</span></div>
              </div>
            </div>

            <ErrorBox msg={error} S={S} />

            {loading && <Spinner label={`${t.runningModule} ${t.modules[MODULES.findIndex(m=>m.id===activeModule.id)]?.label || activeModule.label}...`} th={th} S={S} />}

            {!loading && !result && FormComponent && (
              <FormComponent onSubmit={handleSubmit} loading={loading} t={t} th={th} S={S} />
            )}

            {!loading && result && ResultComponent && (
              <div style={{ animation: "fadeUp 0.5s ease" }}>
                <ResultComponent r={result} t={t} th={th} S={S} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 }}>
                  <button style={S.backBtn} onClick={() => { setResult(null); setError(""); }}>{t.tryAgain}</button>
                  <button style={S.backBtn} onClick={resetToModules}>{t.allModules}</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showModal && (
        <PricingModal
          onClose={() => setShowModal(false)}
          onCreditsAdded={() => updateCredits()}
          t={t} th={th} S={S}
        />
      )}
    </div>
  );
}
