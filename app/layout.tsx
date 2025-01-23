import { PreviewBanner } from "@/components/Preview";
import { Sidebar } from "@/components/Sidebar";
import { getRecentRecaps } from "@/lib/contentful";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from "next";
import '../styles/main.css';
import "./globals.css";

export const metadata: Metadata = {
  title: "Recaps of Men's Group",
  description: "Notes from what was discussed during group.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pages = await getRecentRecaps(4);
  
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-RS5PY4F2CD" />
      <body>
        <PreviewBanner />
        <div id="wrapper">
          {children}
          <Sidebar pages={pages}/>
        </div>
      </body>
      <Analytics />
    </html>
  );
}
