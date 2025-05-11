import localFont from "next/font/local";
import { Instrument_Serif } from "next/font/google";

export const fontSans = localFont({
  variable: "--font-sans",
  src: "./InterVariable.woff2",
  weight: "100 900",
  display: "swap",
  preload: true,
});

export const instrumentSans = Instrument_Serif({
  variable: "--font-instrument-sans",
  display: "swap",
  weight: "400",
  preload: true,
});
