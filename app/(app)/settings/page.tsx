import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="bg-white rounded-3xl shadow-lg max-w-sm w-full overflow-hidden min-h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <div className="space-y-6">
          {/* Language Settings */}
          <Link href="/settings/language" className="flex items-center justify-between py-2 hover:text-indigo-600">
            <span>Language</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>

          {/* Translation Settings */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Translation</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Auto-detect language</span>
                <div className="w-12 h-6 bg-indigo-600 rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span>Save translations</span>
                <div className="w-12 h-6 bg-indigo-600 rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Voice Settings */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Voice & Audio</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Auto-play translations</span>
                <div className="w-12 h-6 bg-gray-200 rounded-full relative">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span>Voice feedback</span>
                <div className="w-12 h-6 bg-indigo-600 rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* App Settings */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">App</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Dark Mode</span>
                <div className="w-12 h-6 bg-gray-200 rounded-full relative">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span>Notifications</span>
                <div className="w-12 h-6 bg-indigo-600 rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

