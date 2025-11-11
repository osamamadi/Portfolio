import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Osama Madi",
  description:
    "Portfolio of Osama Madi",
  keywords: ["Ai","developer", "portfolio", "full stack", "react", "next.js", "web development"],
  authors: [{ name: "Osama Madi" }],
  creator: "Osama Madi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "",
    title: "Osama Madi",
    description: "Portfolio showcasing my work in web development, design, and software engineering.",
    siteName: "Osama Madi Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Osama Madi Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Osama Madi",
    description: "Portfolio showcasing my work in web development, design, and software engineering.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
