import type { Metadata, Viewport } from "next";
import { Anton, Bebas_Neue, IBM_Plex_Sans_Thai, Kanit, Space_Mono } from "next/font/google";
import "./globals.css";
import { site, siteUrl } from "@/data/site";
import { introBootScript } from "@/lib/intro";
import { AppProvider } from "@/components/providers/AppProvider";
import { Intro } from "@/components/chrome/Intro";
import { Header } from "@/components/chrome/Header";
import { Cursor } from "@/components/chrome/Cursor";
import { DemoBanner, Footer } from "@/components/chrome/Footer";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas", display: "swap" });
const kanit = Kanit({ weight: ["400", "500", "700", "800"], subsets: ["thai", "latin"], variable: "--font-kanit", display: "swap" });
const plexThai = IBM_Plex_Sans_Thai({ weight: ["300", "400", "500"], subsets: ["thai", "latin"], variable: "--font-plex-thai", display: "swap" });
const mono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.seo.title, template: `%s — THE RED ARCHIVE` },
  description: site.seo.description,
  keywords: site.seo.keywords,
  authors: [{ name: site.owner.displayName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.seo.locale,
    url: "/",
    siteName: "THE RED ARCHIVE",
    title: site.seo.title,
    description: site.seo.description,
  },
  twitter: { card: "summary_large_image", title: site.seo.title, description: site.seo.description },
};

export const viewport: Viewport = { themeColor: "#09090b", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="th"
      data-intro="playing"
      suppressHydrationWarning
      className={`${anton.variable} ${bebas.variable} ${kanit.variable} ${plexThai.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introBootScript }} />
        <noscript>
          <style>{`.intro{display:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a href="#main" className="skip-link">ข้ามไปยังเนื้อหา</a>
        <AppProvider>
          <Intro />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <Cursor />
          <DemoBanner />
        </AppProvider>
        <div className="vignette" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
