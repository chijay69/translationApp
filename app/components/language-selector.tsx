"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface LanguageSelectorProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function LanguageSelector({ value, onChange, disabled }: LanguageSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="eng">English (US)</SelectItem>
        <SelectItem value="can">English (CA)</SelectItem>
        <SelectItem value="ind">Indonesian</SelectItem>
        <SelectItem value="spa">Spanish (ES)</SelectItem>
        <SelectItem value="mex">Spanish (MX)</SelectItem>
        <SelectItem value="deu">German</SelectItem>
        <SelectItem value="ita">Italian</SelectItem>
        <SelectItem value="por">Portuguese</SelectItem>
        <SelectItem value="jpn">Japanese</SelectItem>
        <SelectItem value="kor">Korean</SelectItem>
        <SelectItem value="hin">Hindi</SelectItem>
        <SelectItem value="gle">Irish</SelectItem>
        <SelectItem value="gre">Greek</SelectItem>
      </SelectContent>
    </Select>
  )
}

