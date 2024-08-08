import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { nunito } from "@/components/fonts";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Clone Trello",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`overflow-hidden" ${nunito.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="ligth"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Image
            src={"/images/background.jpg"}
            width={1920}
            height={1080}
            alt="background"
            className="fixed w-screen h-screen object-cover  top-0 -z-10 opacity-45"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
