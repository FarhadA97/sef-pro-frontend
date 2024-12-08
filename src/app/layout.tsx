import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Footer, Navbar } from "@/layouts/home";
import { ReactQueryClientProvider } from "@/providers/reactQueryClientProvider";

const roboto = Roboto({
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
        className={`${roboto.className} antialiased`}
      >
        <ReactQueryClientProvider>
          <Navbar />
          {children}
          <Footer />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
