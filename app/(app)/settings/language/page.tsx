"use client"

import { useState } from "react"
import { ArrowLeft, Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { LanguageListItem } from "@/app/components/language-list-item"
import { FlagIndonesia, FlagIreland, FlagIndia, FlagItaly, FlagJapan, FlagKorea } from "@/app/components/flags"

const languages = [
  { id: "id", name: "Indonesia", flag: FlagIndonesia },
  { id: "ie", name: "Ireland", flag: FlagIreland },
  { id: "in", name: "India", flag: FlagIndia },
  { id: "it", name: "Italy", flag: FlagItaly },
  { id: "jp", name: "Japan", flag: FlagJapan },
  { id: "kr", name: "Korea", flag: FlagKorea },
]

export default function LanguageSettingsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("id")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredLanguages = languages.filter((lang) => lang.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="bg-white min-h-screen w-full max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b">
        <Link href="/settings" className="text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-semibold">Language</h1>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search language here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Language list */}
      <div className="p-4 space-y-2">
        {filteredLanguages.map((lang) => (
          <LanguageListItem
            key={lang.id}
            flag={<lang.flag className="w-full h-full" />}
            name={lang.name}
            selected={selectedLanguage === lang.id}
            onClick={() => setSelectedLanguage(lang.id)}
          />
        ))}
      </div>
    </div>
  )
}

