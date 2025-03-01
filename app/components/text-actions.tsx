"use client"

import { Button } from "@/components/ui/button"
import { Copy, Share2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export interface TextActionsProps {
  text: string
}

export function TextActions({ text }: TextActionsProps) {
  const { toast } = useToast()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: "Text copied to clipboard.",
      })
    } catch (error) {
      console.error("Failed to copy text:", error)
      toast({
        title: "Error",
        description: "Failed to copy text to clipboard.",
        variant: "destructive",
      })
    }
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          text: text,
        })
      } else {
        throw new Error("Web Share API not supported")
      }
    } catch (error) {
      console.error("Failed to share text:", error)
      toast({
        title: "Error",
        description: "Failed to share text. Try copying instead.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex gap-2 mt-4">
      <Button variant="outline" size="sm" onClick={handleCopy}>
        <Copy className="w-4 h-4 mr-2" />
        Copy
      </Button>
      <Button variant="outline" size="sm" onClick={handleShare}>
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>
    </div>
  )
}

