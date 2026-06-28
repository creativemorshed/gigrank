// src/lib/groq.js
const rateMap = new Map();
export function checkRateLimit(ip, max = 10, ms = 60000) {
  const now = Date.now();
  const e = rateMap.get(ip);
  if (!e || now - e.t > ms) { rateMap.set(ip, { t: now, c: 1 }); return { ok: true }; }
  if (e.c >= max) return { ok: false, wait: Math.ceil((ms - (now - e.t)) / 1000) };
  e.c++; return { ok: true };
}
export function sanitize(s, max = 4000) {
  return typeof s === "string" ? s.replace(/<[^>]*>/g, "").trim().slice(0, max) : "";
}
export async function callGroq({ sys, user, tokens = 3000, temp = 0.2 }) {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error("GROQ_API_KEY not set in Vercel environment variables.");
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 28000);
  try {
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST", signal: ctrl.signal,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ model: "llama-3.3-70b-versatile", temperature: temp, max_tokens: tokens, messages: [{ role: "system", content: sys }, { role: "user", content: user }] }),
    });
    clearTimeout(timer);
    const raw = await r.text();
    if (!r.ok) {
      let msg = `Groq error ${r.status}`;
      try { msg = JSON.parse(raw).error?.message || msg; } catch (_) {}
      if (r.status === 401) msg = "Invalid GROQ_API_KEY.";
      if (r.status === 429) msg = "Rate limit. Please wait a moment.";
      throw new Error(msg);
    }
    return JSON.parse(raw).choices?.[0]?.message?.content || "";
  } catch (err) {
    clearTimeout(timer);
    if (err.name === "AbortError") throw new Error("Request timed out. Please try again.");
    throw err;
  }
}
export function extractJSON(text) {
  let s = text.replace(/```json|```/g, "").trim();
  const i = s.indexOf("{");
  if (i === -1) throw new Error("No JSON in AI response.");
  s = s.slice(i);
  const last = s.lastIndexOf("}");
  if (last !== -1) s = s.slice(0, last + 1);
  else {
    s = s.replace(/,\s*"[^"]*$/, "").replace(/,\s*$/, "");
    let o = 0, a = 0;
    for (const c of s) { if (c === "{") o++; else if (c === "}") o--; else if (c === "[") a++; else if (c === "]") a--; }
    s += "]".repeat(Math.max(0, a)) + "}".repeat(Math.max(0, o));
  }
  return JSON.parse(s);
}
