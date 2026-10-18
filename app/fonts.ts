import localFont from "next/font/local";

export const instrumentSerif = localFont({
  src: [
    {
      path: "./fonts/instrument-serif-regular-latin.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/instrument-serif-italic-latin.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
  fallback: ["Georgia", "serif"],
  adjustFontFallback: "Times New Roman",
  variable: "--font-instrument-serif",
});

export const dmSans = localFont({
  src: [
    {
      path: "./fonts/dm-sans-latin.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./fonts/dm-sans-italic-latin.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: "Arial",
  variable: "--font-dm-sans",
});

export const bricolageGrotesque = localFont({
  src: "./fonts/bricolage-grotesque-latin.woff2",
  weight: "200 800",
  style: "normal",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: "Arial",
  variable: "--font-bricolage-grotesque",
});
