"use client"

import { Home, FileText, Mic, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function BottomNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6 z-50">
      <div className="flex justify-between items-center max-w-sm mx-auto">
        <Link
          href="/"
          className={`flex flex-col items-center ${pathname === "/" ? "text-indigo-600" : "text-gray-400"}`}
        >
          <Home className="w-6 h-6" />
        </Link>

        <Link
          href="/documents"
          className={`flex flex-col items-center ${pathname === "/documents" ? "text-indigo-600" : "text-gray-400"}`}
        >
          <FileText className="w-6 h-6" />
        </Link>

        <Link
          href="/voice"
          className={`flex flex-col items-center ${pathname === "/voice" ? "text-indigo-600" : "text-gray-400"}`}
        >
          <div
            className={`p-3 rounded-full ${pathname === "/voice" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-400"}`}
          >
            <Mic className="w-6 h-6" />
          </div>
        </Link>

        <Link
          href="/settings"
          className={`flex flex-col items-center ${pathname === "/settings" ? "text-indigo-600" : "text-gray-400"}`}
        >
          <Settings className="w-6 h-6" />
        </Link>
      </div>
    </div>
  )
}

