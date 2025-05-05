import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import { ImageProvider } from "./context/ImageContext";
import "./globals.css";

const titilliumWeb = Titillium_Web({
  variable: "--font-titillium-web",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Photo Opp",
  description: "Gere uma imagem divertida com uma moldura",
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${titilliumWeb.variable}`}>
      <ImageProvider>{children}</ImageProvider>
      </body>
    </html>
  );
}
