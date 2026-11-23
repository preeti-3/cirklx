import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], variable: "--font-serif", weight: "400", style: ["normal", "italic"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://papaya-maamoul-bd89e6.netlify.app"),
  title: { default: "CirklX — Social Media Marketing Agency", template: "%s | CirklX" },
  description: "CirklX plans, shoots, edits and publishes scroll-stopping social content for brands and creators.",
  icons: { icon: "/favicon.svg" },
  openGraph: { title: "CirklX", description: "Content that makes your brand impossible to scroll past.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="font-sans antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
