"use client";
import { useState, useEffect, useCallback } from "react";

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
//  STYLES
// ══════════════════════════════════════════
const S = {
  wrap: { minHeight: "100vh", background: "#030712", position: "relative", overflow: "hidden" },
  grid: { position: "fixed", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, #1e293b 1px, transparent 0)", backgroundSize: "32px 32px", opacity: 0.35, pointerEvents: "none", zIndex: 0 },
  glow1: { position: "fixed", top: -300, right: -200, width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,170,0.06), transparent 65%)", pointerEvents: "none", zIndex: 0 },
  glow2: { position: "fixed", bottom: -200, left: -200, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.05), transparent 65%)", pointerEvents: "none", zIndex: 0 },
  main: { position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "0 20px 80px" },

  // Nav
  nav: { position: "sticky", top: 0, zIndex: 100, background: "rgba(3,7,18,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid #1e293b", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  brand: { fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 16, letterSpacing: -0.5, color: "#e2e8f0" },
  navRight: { display: "flex", alignItems: "center", gap: 10 },
  creditBadge: { display: "flex", alignItems: "center", gap: 7, background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: 20, padding: "6px 14px", cursor: "pointer", transition: "all 0.2s" },
  buyBtn: { background: "linear-gradient(135deg, #00d4aa, #0ea5e9)", border: "none", borderRadius: 20, padding: "7px 16px", color: "#030712", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: 1, cursor: "pointer" },

  // Header
  header: { padding: "44px 0 36px" },
  badge: { display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18 },
  dot: { width: 8, height: 8, borderRadius: "50%", background: "#00d4aa", boxShadow: "0 0 12px #00d4aa" },
  badgeText: { fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 3, color: "#475569" },
  h1: { fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,6vw,56px)", fontWeight: 900, lineHeight: 1, letterSpacing: -2, marginBottom: 12 },
  outline: { WebkitTextStroke: "1px #1e293b", color: "transparent" },
  desc: { color: "#475569", fontSize: 14, lineHeight: 1.7, maxWidth: 500, fontWeight: 300, marginBottom: 24 },

  // Module grid
  modGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 28 },
  modCard: { borderRadius: 14, padding: "18px 16px", border: "1px solid #1e293b", cursor: "pointer", transition: "all 0.2s", background: "#0a0f1e", position: "relative" },
  modIcon: { fontSize: 22, marginBottom: 8 },
  modLabel: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 12, marginBottom: 4 },
  modDesc: { fontSize: 11, color: "#475569", marginBottom: 10 },
  modCost: { fontSize: 10, fontFamily: "'Syne', sans-serif", fontWeight: 700, letterSpacing: 1 },

  // Panel
  panel: { background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: 14, padding: "20px 22px", marginBottom: 12 },
  panelLabel: { fontFamily: "'Syne', sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: 3, color: "#334155", marginBottom: 12, textTransform: "uppercase" },

  // Input
  input: { width: "100%", background: "#030712", border: "1px solid #1e293b", borderRadius: 10, padding: "12px 14px", color: "#e2e8f0", fontSize: 13, outline: "none", fontFamily: "monospace", boxSizing: "border-box" },
  textarea: { width: "100%", background: "#030712", border: "1px solid #1e293b", borderRadius: 10, padding: "12px 14px", color: "#e2e8f0", fontSize: 13, outline: "none", fontFamily: "monospace", resize: "vertical", lineHeight: 1.7, boxSizing: "border-box" },
  label: { fontSize: 10, color: "#475569", marginBottom: 6, display: "block", fontFamily: "'Syne', sans-serif", fontWeight: 700, letterSpacing: 1 },

  // Buttons
  primaryBtn: { width: "100%", padding: 16, border: "none", borderRadius: 12, background: "linear-gradient(135deg, #00d4aa, #0ea5e9)", color: "#030712", fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 14, letterSpacing: 2, cursor: "pointer" },
  secondaryBtn: { background: "transparent", border: "1px solid #1e293b", borderRadius: 10, padding: "10px 18px", color: "#475569", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 1, cursor: "pointer" },
  backBtn: { width: "100%", marginTop: 16, background: "transparent", border: "1px solid #1e293b", borderRadius: 10, padding: "12px", color: "#334155", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 2, cursor: "pointer" },

  // Error
  error: { background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#ef4444", marginBottom: 12 },

  // Score ring
  heroCard: { borderRadius: 20, padding: 28, marginBottom: 12, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" },
  heroInfo: { flex: 1, minWidth: 200 },
  tierBadge: { fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 800, letterSpacing: 3, marginBottom: 8 },
  gigTitle: { fontFamily: "'Syne', sans-serif", fontSize: "clamp(16px,3vw,22px)", fontWeight: 900, lineHeight: 1.2, marginBottom: 10 },
  execSummary: { fontSize: 13, color: "#94a3b8", lineHeight: 1.7 },

  // Factor bar
  factorItem: { borderRadius: 12, padding: "12px 14px", marginBottom: 8 },
  barTrack: { height: 5, background: "#030712", borderRadius: 5, overflow: "hidden", marginTop: 8 },
  barFill: { height: "100%", borderRadius: 5 },
  factorInsight: { fontSize: 11, color: "#475569", marginTop: 6 },

  // Tag chip
  tag: { borderRadius: 20, padding: "4px 12px", fontSize: 11, display: "inline-block", margin: "3px 3px" },

  // Action item
  actionItem: { background: "#030712", border: "1px solid #1e293b", borderRadius: 12, padding: 16, marginBottom: 10 },
  stepNum: { width: 26, height: 26, borderRadius: "50%", background: "#0a0f1e", border: "1px solid #1e293b", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 900, color: "#475569", flexShrink: 0 },
  pill: { fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20, fontFamily: "'Syne', sans-serif", letterSpacing: 1 },

  // Info box
  infoBox: { borderRadius: 14, padding: "16px 18px", marginBottom: 10 },
  infoLabel: { fontFamily: "'Syne', sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: 3, marginBottom: 8 },
  infoText: { fontSize: 12, color: "#94a3b8", lineHeight: 1.7 },

  // Table
  table: { width: "100%", borderCollapse: "collapse", fontSize: 12 },
  th: { textAlign: "left", padding: "8px 12px", fontFamily: "'Syne', sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: 2, color: "#334155", borderBottom: "1px solid #1e293b" },
  td: { padding: "10px 12px", borderBottom: "1px solid #0f172a", color: "#94a3b8", verticalAlign: "top" },

  // Modal
  overlay: { position: "fixed", inset: 0, zIndex: 1000, background: "rgba(3,7,18,0.92)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
  modalBox: { background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: 24, padding: 32, maxWidth: 600, width: "100%" },
  planCard: { borderRadius: 14, padding: 20, border: "1px solid #1e293b", cursor: "pointer", background: "#030712", transition: "all 0.2s", position: "relative" },

  // Tabs
  tabBar: { display: "flex", gap: 4, background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: 12, padding: 4, marginBottom: 12 },
  tabBtn: { flex: 1, background: "none", border: "none", cursor: "pointer", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: 1.5, padding: "8px 12px", borderRadius: 6, transition: "all 0.2s" },

  // Loading
  spinner: { width: 44, height: 44, border: "3px solid #1e293b", borderTopColor: "#00d4aa", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" },
};

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
function Spinner({ label = "Analyzing..." }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={S.spinner} />
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, color: "#475569" }}>{label}</div>
    </div>
  );
}

function ErrorBox({ msg }) {
  if (!msg) return null;
  return <div style={S.error}>⚠ {msg}</div>;
}

function InfoBox({ label, text, color = "#7c3aed" }) {
  return (
    <div style={{ ...S.infoBox, background: `${color}08`, border: `1px solid ${color}22` }}>
      <div style={{ ...S.infoLabel, color }}>{label}</div>
      <div style={S.infoText}>{text}</div>
    </div>
  );
}

function WinLoss({ wins = [], losses = [], winLabel = "TOP WINS", lossLabel = "CRITICAL ISSUES" }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
      <div style={{ background: "rgba(0,212,170,0.04)", border: "1px solid rgba(0,212,170,0.12)", borderRadius: 14, padding: 16 }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: 3, color: "#00d4aa", marginBottom: 10 }}>{winLabel}</div>
        {wins.map((w, i) => <div key={i} style={{ fontSize: 12, color: "#94a3b8", marginBottom: 7, paddingLeft: 14, position: "relative" }}><span style={{ position: "absolute", left: 0, color: "#00d4aa" }}>✓</span>{w}</div>)}
      </div>
      <div style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.12)", borderRadius: 14, padding: 16 }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: 3, color: "#ef4444", marginBottom: 10 }}>{lossLabel}</div>
        {losses.map((w, i) => <div key={i} style={{ fontSize: 12, color: "#94a3b8", marginBottom: 7, paddingLeft: 14, position: "relative" }}><span style={{ position: "absolute", left: 0, color: "#ef4444" }}>✗</span>{w}</div>)}
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

function FactorBar({ factor, data }) {
  const col = factor.color;
  const score = data?.score ?? 50;
  const isGood = score >= 70, isMid = score >= 45;
  const c = isGood ? "#00d4aa" : isMid ? "#f59e0b" : "#ef4444";
  const status = isGood ? "STRONG" : isMid ? "AVG" : "WEAK";
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

function ActionList({ actions = [] }) {
  return actions.map((q, i) => {
    const ic = q.impact === "high" ? "#00d4aa" : "#f59e0b";
    const tc = q.timeframe === "24h" ? "#ef4444" : q.timeframe === "1week" ? "#f59e0b" : "#94a3b8";
    return (
      <div key={i} style={S.actionItem}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <div style={{ ...S.stepNum, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</div>
          <span style={{ ...S.pill, background: `${ic}22`, color: ic }}>{(q.impact || "").toUpperCase()} IMPACT</span>
          <span style={{ ...S.pill, background: `${tc}22`, color: tc }}>⏱ {q.timeframe || ""}</span>
        </div>
        <div style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.6, paddingLeft: 34 }}>{q.action}</div>
      </div>
    );
  });
}

// ══════════════════════════════════════════
//  RESULT VIEWS
// ══════════════════════════════════════════
function AnalyzerResult({ r }) {
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
          <div style={S.gigTitle}>{r.gigTitle}</div>
          <div style={{ fontSize: 12, color: "#475569", marginBottom: 10 }}>{r.sellerUsername ? `@${r.sellerUsername}` : ""} {r.niche ? `· ${r.niche}` : ""}</div>
          <div style={S.execSummary}>{r.executiveSummary}</div>
        </div>
      </div>

      <div style={S.tabBar}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ ...S.tabBtn, background: tab === t ? "#1e293b" : "none", color: tab === t ? "#e2e8f0" : "#475569" }}>
            {t === "factors" ? "ALGO FACTORS" : t === "seo" ? "SEO AUDIT" : "ACTION PLAN"}
          </button>
        ))}
      </div>

      {tab === "factors" && (
        <div>
          <WinLoss wins={r.topWins} losses={r.criticalIssues} />
          <div style={S.panel}>
            <div style={S.panelLabel}>2026 ALGORITHM FACTOR BREAKDOWN</div>
            {ALGO_FACTORS.map(f => <FactorBar key={f.key} factor={f} data={r.algorithmFactors?.[f.key]} />)}
          </div>
          {r.competitorEdge && <InfoBox label="🎯 COMPETITOR EDGE" text={r.competitorEdge} color="#0ea5e9" />}
        </div>
      )}

      {tab === "seo" && (
        <div>
          <div style={S.panel}>
            <div style={S.panelLabel}>TITLE SEO ANALYSIS</div>
            <div style={{ fontSize: 10, color: "#475569", marginBottom: 6 }}>CURRENT TITLE</div>
            <div style={{ background: "#030712", borderRadius: 8, padding: "10px 12px", fontFamily: "monospace", fontSize: 13, color: "#cbd5e1", marginBottom: 12 }}>{r.titleAnalysis?.currentTitle || "—"}</div>
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
          {r.titleAnalysis?.slugAnalysis && <InfoBox label="🆕 2026 — GIG URL SLUG ANALYSIS" text={r.titleAnalysis.slugAnalysis} color="#06b6d4" />}
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
            <ActionList actions={r.quickWins} />
          </div>
          {r.algorithmNote && <InfoBox label="📌 ALGORITHM NOTE" text={r.algorithmNote} color="#7c3aed" />}
          {r.freshnessTip && <InfoBox label="🆕 2026 — GIG FRESHNESS STRATEGY" text={r.freshnessTip} color="#fb923c" />}
          {r.multiGigStrategy && <InfoBox label="🆕 2026 — MULTI-GIG STRATEGY" text={r.multiGigStrategy} color="#84cc16" />}
        </div>
      )}
    </div>
  );
}

function CompetitorResult({ r }) {
  return (
    <div>
      <div style={{ ...S.panel, marginBottom: 12 }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: 3, color: "#0ea5e9", marginBottom: 8 }}>MARKET OVERVIEW</div>
        <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>{r.marketOverview}</div>
      </div>
      <WinLoss wins={r.yourAdvantages} losses={r.yourGaps} winLabel="YOUR ADVANTAGES" lossLabel="YOUR GAPS" />
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
                  <td style={S.td}><div style={{ fontWeight: 600, color: "#e2e8f0" }}>{c.gigTitle}</div><div style={{ color: "#475569", fontSize: 11 }}>@{c.sellerUsername}</div></td>
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
        <InfoBox label="💰 PRICING BENCHMARK" text={`Low: $${r.pricingBenchmark?.lowest} · Avg: $${r.pricingBenchmark?.average} · High: $${r.pricingBenchmark?.highest}\n\n${r.pricingBenchmark?.recommendation}`} color="#f59e0b" />
        <InfoBox label="🎯 MARKET GAPS" text={(r.marketGaps || []).join("\n\n")} color="#00d4aa" />
      </div>
      <InfoBox label="🏆 WINNING STRATEGY" text={r.winningStrategy} color="#0ea5e9" />
    </div>
  );
}

function PredictResult({ r }) {
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
            <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 6 }}>📦 ~{d?.ordersEstimate || 0} orders</div>
            <div style={{ fontSize: 11, color: "#84cc16", marginBottom: 8 }}>💰 ~${d?.revenueEstimate || 0}</div>
            <span style={{ ...S.pill, fontSize: 9, background: `${col}22`, color: col }}>Confidence: {d?.confidence || "—"}</span>
          </div>
        ))}
      </div>
      <WinLoss wins={r.growthDrivers} losses={r.riskFactors} winLabel="GROWTH DRIVERS" lossLabel="RISK FACTORS" />
      <div style={S.panel}>
        <div style={S.panelLabel}>KEY MILESTONES</div>
        {(r.keyMilestones || []).map((m, i) => (
          <div key={i} style={{ ...S.actionItem, marginBottom: 8 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: "#00d4aa", marginBottom: 4 }}>{m.milestone}</div>
            <div style={{ fontSize: 11, color: "#475569" }}>Expected: {m.expectedDate} · {m.impact}</div>
          </div>
        ))}
      </div>
      <InfoBox label="📊 RECOMMENDATION" text={r.recommendation} color="#7c3aed" />
    </div>
  );
}

function RewriterResult({ r }) {
  const [copied, setCopied] = useState("");
  const copy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };
  const CopyBtn = ({ text, k }) => (
    <button onClick={() => copy(text, k)} style={{ background: copied === k ? "#00d4aa22" : "transparent", border: `1px solid ${copied === k ? "#00d4aa" : "#1e293b"}`, borderRadius: 6, padding: "4px 10px", color: copied === k ? "#00d4aa" : "#475569", fontSize: 10, cursor: "pointer", fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>
      {copied === k ? "COPIED ✓" : "COPY"}
    </button>
  );
  return (
    <div>
      <div style={S.panel}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={S.panelLabel}>✨ OPTIMIZED TITLE</div>
          <CopyBtn text={r.optimizedTitle} k="title" />
        </div>
        <div style={{ background: "#030712", borderRadius: 8, padding: "12px 14px", fontFamily: "monospace", fontSize: 14, color: "#00d4aa", marginBottom: 8 }}>{r.optimizedTitle}</div>
        <div style={{ fontSize: 11, color: "#475569" }}>{r.titleExplanation}</div>
      </div>
      <div style={S.panel}>
        <div style={S.panelLabel}>🏷️ OPTIMIZED TAGS (5/5)</div>
        <div style={{ marginBottom: 12 }}>
          {(r.tags || []).map((t, i) => <span key={i} style={{ ...S.tag, background: "rgba(0,212,170,0.08)", border: "1px solid #00d4aa33", color: "#00d4aa" }}>{t}</span>)}
        </div>
        <div style={{ fontSize: 11, color: "#475569" }}>{r.tagStrategy}</div>
      </div>
      <div style={S.panel}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={S.panelLabel}>📝 OPTIMIZED DESCRIPTION</div>
          <CopyBtn text={r.optimizedDescription} k="desc" />
        </div>
        <div style={{ background: "#030712", borderRadius: 8, padding: "14px", fontFamily: "monospace", fontSize: 12, color: "#94a3b8", whiteSpace: "pre-wrap", lineHeight: 1.7, maxHeight: 300, overflowY: "auto" }}>{r.optimizedDescription}</div>
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
                <div style={{ fontSize: 11, color: "#94a3b8" }}>{p.description}</div>
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
              <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0", marginBottom: 4 }}>Q: {f.q}</div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>A: {f.a}</div>
            </div>
          ))}
        </div>
      )}
      <InfoBox label="📈 EXPECTED IMPROVEMENT" text={r.expectedRankingImprovement} color="#00d4aa" />
    </div>
  );
}

function RoadmapResult({ r }) {
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
                <div key={j} style={{ fontSize: 12, color: "#94a3b8", padding: "6px 0 6px 38px", borderBottom: "1px solid #0f172a" }}>▸ {t}</div>
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
              {(month.milestones || []).map((ml, j) => <div key={j} style={{ fontSize: 12, color: "#94a3b8", marginBottom: 6 }}>✓ {ml}</div>)}
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
      <InfoBox label="💰 ESTIMATED REVENUE IMPACT" text={r.estimatedRevenueImpact} color="#84cc16" />
    </div>
  );
}

function KeywordResult({ r }) {
  const typeCols = { primary: "#00d4aa", secondary: "#0ea5e9", longtail: "#f59e0b", lsi: "#7c3aed" };
  const oppCols = { high: "#00d4aa", medium: "#f59e0b", low: "#ef4444" };
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        <InfoBox label="🎯 PRIMARY KEYWORD" text={r.primaryKeyword} color="#00d4aa" />
        <InfoBox label="📈 NICHE OPPORTUNITY" text={r.nicheOpportunity} color="#0ea5e9" />
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
                    <span style={{ color: "#e2e8f0", fontWeight: 500 }}>{k.keyword}</span>
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
        <div style={{ background: "#030712", borderRadius: 8, padding: "12px 14px", fontFamily: "monospace", fontSize: 14, color: "#00d4aa" }}>{r.suggestedTitle}</div>
      </div>
      <div style={S.panel}>
        <div style={S.panelLabel}>🏷️ SUGGESTED TAGS (5/5)</div>
        {(r.suggestedTags || []).map((t, i) => <span key={i} style={{ ...S.tag, background: "rgba(0,212,170,0.08)", border: "1px solid #00d4aa33", color: "#00d4aa" }}>{t}</span>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <InfoBox label="📅 SEASONAL TIPS" text={r.seasonalTips} color="#f59e0b" />
        <InfoBox label="🚫 AVOID KEYWORDS" text={(r.avoidKeywords || []).join(", ")} color="#ef4444" />
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
//  INPUT FORMS
// ══════════════════════════════════════════
function AnalyzerForm({ onSubmit, loading }) {
  const [mode, setMode] = useState("url");
  const [gigUrl, setGigUrl] = useState("");
  const [gigInfo, setGigInfo] = useState("");
  return (
    <div>
      <div style={{ display: "flex", background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: 12, padding: 4, marginBottom: 12 }}>
        {["url", "manual"].map(m => (
          <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: 10, borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: 1.5, background: mode === m ? "#00d4aa" : "transparent", color: mode === m ? "#030712" : "#334155" }}>
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

function CompetitorForm({ onSubmit, loading }) {
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

function PredictForm({ onSubmit, loading }) {
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

function RewriterForm({ onSubmit, loading }) {
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

function RoadmapForm({ onSubmit, loading }) {
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

function KeywordForm({ onSubmit, loading }) {
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
function PricingModal({ onClose, onCreditsAdded }) {
  const [licenseKey, setLicenseKey] = useState("");
  const [msg, setMsg] = useState({ text: "", ok: false });
  const [redeeming, setRedeeming] = useState(false);

  const DEMO_KEYS = { "GIGA-FREE-DEMO-0001": 5, "STAR-TER1-TEST-0001": 10, "PRO1-2025-TEST-0001": 30 };

  const plans = [
    { name: "STARTER", credits: 10, price: 4.99, per: 0.50, features: ["10 analyses", "All 7 modules", "2026 algorithm", "Never expire"] },
    { name: "PRO", credits: 30, price: 9.99, per: 0.33, popular: true, features: ["30 analyses", "All 7 modules", "2026 algorithm", "Never expire"] },
    { name: "AGENCY", credits: 100, price: 24.99, per: 0.25, features: ["100 analyses", "All 7 modules", "2026 algorithm", "Never expire"] },
  ];

  const buyPlan = (plan) => {
    if (confirm(`[DEMO MODE]\n\nIn production, this opens Stripe for $${plan.price}.\n\nAdd ${plan.credits} demo credits now?`)) {
      addCredits(plan.credits);
      onCreditsAdded(plan.credits);
      onClose();
    }
  };

  const formatKey = (v) => {
    let s = v.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 16);
    return s.match(/.{1,4}/g)?.join("-") || s;
  };

  const redeem = async () => {
    const k = licenseKey.trim().toUpperCase();
    if (!/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(k)) {
      setMsg({ text: "Invalid key format.", ok: false }); return;
    }
    const used = JSON.parse(localStorage.getItem("gr_used_keys") || "[]");
    if (used.includes(k)) { setMsg({ text: "Key already redeemed.", ok: false }); return; }

    if (DEMO_KEYS[k] !== undefined) {
      used.push(k);
      localStorage.setItem("gr_used_keys", JSON.stringify(used));
      addCredits(DEMO_KEYS[k]);
      onCreditsAdded(DEMO_KEYS[k]);
      setMsg({ text: `✅ ${DEMO_KEYS[k]} credits added!`, ok: true });
      setTimeout(onClose, 1500);
      return;
    }

    setRedeeming(true);
    try {
      const res = await fetch("/api/redeem", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: k }) });
      const data = await res.json();
      if (data.success) {
        used.push(k);
        localStorage.setItem("gr_used_keys", JSON.stringify(used));
        addCredits(data.credits);
        onCreditsAdded(data.credits);
        setMsg({ text: `✅ ${data.credits} credits added!`, ok: true });
        setTimeout(onClose, 1500);
      } else {
        setMsg({ text: data.error || "Invalid key.", ok: false });
      }
    } catch { setMsg({ text: "Network error. Try again.", ok: false }); }
    finally { setRedeeming(false); }
  };

  return (
    <div style={S.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ ...S.modalBox, maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 900, letterSpacing: -0.5, marginBottom: 6 }}>Buy Analysis Credits</div>
        <div style={{ fontSize: 13, color: "#475569", marginBottom: 24 }}>1 credit = 1 module use. Credits never expire.</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
          {plans.map(p => (
            <div key={p.name} style={{ ...S.planCard, border: p.popular ? "1px solid #00d4aa" : "1px solid #1e293b" }}>
              {p.popular && <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: "#00d4aa", color: "#030712", fontFamily: "'Syne', sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: 2, padding: "3px 10px", borderRadius: 20 }}>POPULAR</div>}
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 800, color: "#475569", letterSpacing: 2, marginBottom: 8 }}>{p.name}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 900, color: "#e2e8f0", marginBottom: 4 }}>{p.credits} <span style={{ fontSize: 13, fontWeight: 400, color: "#475569" }}>credits</span></div>
              <div style={{ color: "#00d4aa", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>${p.price}</div>
              <div style={{ fontSize: 11, color: "#475569", marginBottom: 12 }}>${p.per} / credit</div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px" }}>
                {p.features.map((f, i) => <li key={i} style={{ fontSize: 11, color: "#94a3b8", marginBottom: 4, paddingLeft: 14, position: "relative" }}><span style={{ position: "absolute", left: 0, color: "#00d4aa" }}>✓</span>{f}</li>)}
              </ul>
              <button onClick={() => buyPlan(p)} style={{ width: "100%", padding: 10, border: p.popular ? "none" : "1px solid #1e293b", borderRadius: 8, background: p.popular ? "#00d4aa" : "transparent", color: p.popular ? "#030712" : "#e2e8f0", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 11, cursor: "pointer" }}>BUY NOW →</button>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #1e293b", paddingTop: 20 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#475569", marginBottom: 10 }}>REDEEM LICENSE KEY</div>
          <div style={{ display: "flex", gap: 8 }}>
            <input style={{ ...S.input, flex: 1 }} value={licenseKey} onChange={e => setLicenseKey(formatKey(e.target.value))} placeholder="XXXX-XXXX-XXXX-XXXX" maxLength={19} />
            <button onClick={redeem} disabled={redeeming} style={{ ...S.buyBtn, whiteSpace: "nowrap", padding: "10px 18px" }}>{redeeming ? "..." : "REDEEM"}</button>
          </div>
          {msg.text && <div style={{ fontSize: 11, color: msg.ok ? "#00d4aa" : "#ef4444", marginTop: 6 }}>{msg.text}</div>}
          <div style={{ fontSize: 11, color: "#334155", marginTop: 8 }}>Demo key: GIGA-FREE-DEMO-0001 (5 credits)</div>
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

  useEffect(() => { setCredits(getCredits()); }, []);

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
    <div style={S.wrap}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } input::placeholder, textarea::placeholder { color: #1e293b; } @keyframes spin { to { transform: rotate(360deg); } } @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`}</style>
      <div style={S.grid} />
      <div style={S.glow1} />
      <div style={S.glow2} />

      {/* NAV */}
      <div style={S.nav}>
        <div style={S.brand} onClick={resetToModules} role="button" title="Home">
          Gig<span style={{ color: "#00d4aa" }}>Rank</span> <span style={{ color: "#0ea5e9" }}>AI</span>
        </div>
        <div style={S.navRight}>
          <div style={{ ...S.creditBadge, borderColor: credits <= 3 && credits > 0 ? "rgba(239,68,68,0.4)" : "#1e293b" }} onClick={() => setShowModal(true)}>
            <span>⚡</span>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 13, color: credits <= 3 && credits > 0 ? "#ef4444" : "#00d4aa" }}>{credits}</span>
            <span style={{ fontSize: 10, color: "#475569" }}>CREDITS</span>
          </div>
          <button style={S.buyBtn} onClick={() => setShowModal(true)}>BUY CREDITS</button>
        </div>
      </div>

      <div style={S.main}>
        {/* HEADER — shown on homepage */}
        {!activeModule && (
          <div style={S.header}>
            <div style={S.badge}><div style={S.dot} /><span style={S.badgeText}>FIVERR GROWTH INTELLIGENCE — 2026 ALGORITHM</span></div>
            <h1 style={S.h1}>GIG RANK<br /><span style={S.outline}>ANALYZER</span></h1>
            <p style={S.desc}>AI-powered Fiverr growth platform. Analyze gigs, spy on competitors, predict rankings, rewrite content, and generate 90-day growth roadmaps — powered by Fiverr's 2026 algorithm.</p>
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
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 900, color: "#ef4444", marginBottom: 6 }}>No Credits</div>
                <div style={{ fontSize: 13, color: "#475569", marginBottom: 16 }}>Redeem key <strong style={{ color: "#e2e8f0" }}>GIGA-FREE-DEMO-0001</strong> to get 5 free credits</div>
                <button style={{ ...S.buyBtn, padding: "12px 28px", fontSize: 13 }} onClick={() => setShowModal(true)}>GET CREDITS →</button>
              </div>
            )}

            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: 3, color: "#334155", marginBottom: 14 }}>SELECT A MODULE</div>
            <div style={{ ...S.modGrid, gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
              {MODULES.map(mod => (
                <div key={mod.id} style={{ ...S.modCard, borderColor: credits >= mod.cost ? "#1e293b" : "#1e293b", opacity: credits > 0 || true ? 1 : 0.5 }}
                  onClick={() => handleModuleSelect(mod)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = mod.color; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 32px ${mod.color}22`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e293b"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ ...S.modIcon, color: mod.color }}>{mod.icon}</div>
                  <div style={{ ...S.modLabel, color: "#e2e8f0" }}>{mod.label}</div>
                  <div style={S.modDesc}>{mod.desc}</div>
                  <div style={{ ...S.modCost, color: mod.color }}>⚡ {mod.cost} credit{mod.cost > 1 ? "s" : ""}</div>
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
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 900, letterSpacing: -0.5 }}>{activeModule.label}</div>
                <div style={{ fontSize: 12, color: "#475569" }}>{activeModule.desc} · <span style={{ color: activeModule.color }}>⚡ {activeModule.cost} credit{activeModule.cost > 1 ? "s" : ""}</span></div>
              </div>
            </div>

            <ErrorBox msg={error} />

            {loading && <Spinner label={`Running ${activeModule.label}...`} />}

            {!loading && !result && FormComponent && (
              <FormComponent onSubmit={handleSubmit} loading={loading} />
            )}

            {!loading && result && ResultComponent && (
              <div style={{ animation: "fadeUp 0.5s ease" }}>
                <ResultComponent r={result} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 }}>
                  <button style={S.backBtn} onClick={() => { setResult(null); setError(""); }}>← TRY AGAIN</button>
                  <button style={S.backBtn} onClick={resetToModules}>← ALL MODULES</button>
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
        />
      )}
    </div>
  );
}
