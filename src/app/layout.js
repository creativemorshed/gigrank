export const metadata = {
  title: "GigRanking — Fiverr Growth Intelligence",
  description: "Analyze gigs, spy on competitors, predict rankings, rewrite content, and generate 90-day growth roadmaps — Powered by Fiverr's 2026 Algorithm.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
