import type React from "react"
// Update the container padding
export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 pb-20">{children}</div>
}

