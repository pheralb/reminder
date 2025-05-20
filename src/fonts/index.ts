import localFont from "next/font/local";
import { Onest } from "next/font/google";

export const fontSans = localFont({
  variable: "--font-sans",
  src: "./InterVariable.woff2",
  weight: "100 900",
  display: "swap",
  preload: true,
});

export const fontOnest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  preload: true,
});
