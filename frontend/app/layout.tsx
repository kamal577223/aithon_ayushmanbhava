import "./globals.css";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";

export const metadata = {
  title: "Ayushman Bhava",
  description: "Unified Healthcare Platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="gradient-bg">
        <Navbar />
        <main className="mx-auto max-w-6xl p-4">
          <PageTransition>{children}</PageTransition>
        </main>
      </body>
    </html>
  );
}
