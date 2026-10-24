import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/site-header";
import { bricolageGrotesque, dmSans, instrumentSerif } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Syed Israruddin - Product Designer",
  description: "Portfolio of Syed Israruddin, a product designer and design engineer.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${dmSans.variable} ${bricolageGrotesque.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
