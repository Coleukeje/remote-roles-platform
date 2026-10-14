import type { Metadata } from "next";
import { DM_Sans, Nunito_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-display",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Remote Roles — Training Academy",
  description:
    "Remote Roles onboarding and training platform for remote professionals.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${nunitoSans.variable} h-full`}>
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
