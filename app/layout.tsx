import type React from "react"
// Update the layout to include BottomNav
import { BottomNav } from "./components/bottom-nav"
import { Inter } from "next/font/google"
import { RecordingProvider } from "./contexts/RecordingContext"
import { AuthProvider } from "./contexts/AuthContext"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <RecordingProvider>
            <main className="pb-20">{children}</main>
            <BottomNav />
          </RecordingProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
export const metadata = {
      generator: 'v0.dev'
    };

