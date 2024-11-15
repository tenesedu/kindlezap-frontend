import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavigationHeader from '@/components/fixed/header'
import Footer from '@/components/fixed/footer'
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "KindleZAP",
  description: "Send PDFs to Your Kindle in Seconds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-pink-100">
          <NavigationHeader />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
