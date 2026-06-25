// src/lib/groq.js — Groq API helper + credit system logic

// ── Rate limiter (in-memory, resets on cold start)
const rateLimitMap = new Map();
export function checkRateLimit(ip, max = 10, windowMs = 60000) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.windowStart > windowMs) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return { allowed: true };
  }
  if (entry.count >= max) {
    const retryAfter = Math.ceil((windowMs - (now - entry.windowStart)) / 1000);
    return { allowed: false, retryAfter };
  }
  entry.count++;
  return { allowed: true };
}

// ── Input sanitizer
export function sanitize(str, max = 4000) {
  if (typeof str !== "string") return "";
  return str.replace(/<[^>]*>/g, "").trim().slice(0, max);
}

// ── Groq API caller
export async function callGroq({ systemPrompt, userPrompt, maxTokens = 3000, temperature = 0.2 }) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY not configured in environment variables.");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 28000);

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature,
        max_tokens: maxTokens,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user",   content: userPrompt },
        ],
      }),
    });

    clearTimeout(timeout);
    const raw = await res.text();

    if (!res.ok) {
      let msg = `Groq error ${res.status}`;
      try { msg = JSON.parse(raw).error?.message || msg; } catch (_) {}
      if (res.status === 401) msg = "Invalid GROQ_API_KEY.";
      if (res.status === 429) msg = "Rate limit hit. Please wait a moment.";
      throw new Error(msg);
    }

    const data = JSON.parse(raw);
    return data.choices?.[0]?.message?.content || "";
  } catch (err) {
    clearTimeout(timeout);
    if (err.name === "AbortError") throw new Error("Request timed out. Please try again.");
    throw err;
  }
}

// ── Robust JSON extractor from AI response
export function extractJSON(text) {
  let clean = text.replace(/```json|```/g, "").trim();
  const start = clean.indexOf("{");
  if (start === -1) throw new Error("No JSON found in AI response.");
  clean = clean.slice(start);
  const last = clean.lastIndexOf("}");
  if (last !== -1) {
    clean = clean.slice(0, last + 1);
  } else {
    clean = clean.replace(/,\s*"[^"]*$/, "").replace(/,\s*$/, "");
    let o = 0, a = 0;
    for (const c of clean) {
      if (c === "{") o++; else if (c === "}") o--;
      else if (c === "[") a++; else if (c === "]") a--;
    }
    clean += "]".repeat(Math.max(0, a)) + "}".repeat(Math.max(0, o));
  }
  return JSON.parse(clean);
}

// ── DEMO license keys (validate server-side in /api/redeem)
export const CREDIT_COSTS = {
  analyze:    1,
  competitor: 2,
  predict:    1,
  rewrite:    2,
  roadmap:    3,
  keyword:    1,
};
