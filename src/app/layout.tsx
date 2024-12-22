import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Footer, Navbar } from "@/layouts/home";
import { ReactQueryClientProvider } from "@/providers/reactQueryClientProvider";
import { Suspense } from "react";
import { Loader } from "@/components/loader/loader";

const poppins = Poppins({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "SEF PRO",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <ReactQueryClientProvider>
          <Navbar />
          <Suspense fallback={<div className="flex items-center justify-center h-[100vh]"><Loader className="hidden" /></div>}>
            {children}
          </Suspense>
          <Footer />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
