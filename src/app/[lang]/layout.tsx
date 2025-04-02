import type React from "react"
import { Inter } from "next/font/google"
import "@/app/[lang]/globals.css";
import Header from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

// Define the supported languages
export const supportedLanguages = ["en", "cs", "de"]

// Generate static params for all supported languages
export async function generateStaticParams() {
  return supportedLanguages.map((lang) => ({ lang }))
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <Header currentLang={params.lang} />
        {children}
      </body>
    </html>
  )
}

