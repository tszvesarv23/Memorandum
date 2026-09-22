import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter, Newsreader } from "next/font/google";
import { siteConfig } from "@/config/site";
import { parseTheme, themeInitScript } from "@/lib/theme";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: siteConfig.name,
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieJar = await cookies();
  const theme = parseTheme(cookieJar.get("memorandum_theme")?.value);

  return (
    <html
      lang="es"
      data-theme={theme}
      suppressHydrationWarning
      className={`${newsreader.variable} ${inter.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript() }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
