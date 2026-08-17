import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Onappattorma",
  description: "A memory of Onam preserved through songs.",
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white selection:bg-accent selection:text-black">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
