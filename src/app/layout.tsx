import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL("https://crispbowl.com"),
  title: "CrispBowl — Fresh Recipes, Bold Flavors",
  description: "Discover fresh recipes and bold flavors on CrispBowl. Your ultimate food blog for breakfast, lunch, dinner, desserts, and more.",
  alternates: {
    canonical: "https://crispbowl.com",
  },
  verification: {
    google: "oUPhF11wn-gnPRkFfLOZoA7nIULrlfWvyVzxItKwR_o",
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "",
    },
  },
  openGraph: {
    title: "CrispBowl — Fresh Recipes, Bold Flavors",
    description: "Discover fresh recipes and bold flavors on CrispBowl.",
    url: "https://crispbowl.com",
    siteName: "CrispBowl",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://crispbowl.com/og-image.jpg", width: 1200, height: 630, alt: "CrispBowl - Food Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CrispBowl — Fresh Recipes, Bold Flavors",
    description: "Discover fresh recipes and bold flavors on CrispBowl.",
    images: ["https://crispbowl.com/twitter-image.jpg"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CrispBowl",
    "url": "https://crispbowl.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://crispbowl.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-background text-accent antialiased flex flex-col min-h-screen`}>
        <GoogleAnalytics />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
