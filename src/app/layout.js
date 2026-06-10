// src/app/layout.js
export const metadata = {
  title: "GigRank AI — Fiverr Growth Intelligence Platform",
  description: "AI-powered Fiverr gig analyzer, competitor spy, rank predictor, gig rewriter, and 90-day growth roadmap generator.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#030712", color: "#e2e8f0", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
