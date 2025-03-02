"use client"

import { Home, FileText, Mic, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'

export function BottomNav() {
  const pathname = usePathname()
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/auth/signin')
  }

  if (!isAuthenticated) {
    return null
  }

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

        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center flex-1 min-w-0 text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

