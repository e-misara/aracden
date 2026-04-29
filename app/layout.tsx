import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "AraçDen - Türk Araç Deneyim Platformu",
  description: "Araç sahiplerinin gerçek deneyimleri",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${nunito.variable} h-full`}>
      <body className="min-h-full bg-gray-50 font-nunito">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
