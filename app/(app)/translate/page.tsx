"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { LanguageSelector } from "@/app/components/language-selector"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useRecordings } from "@/app/contexts/RecordingContext"
import { translateText } from "@/app/utils/gemini"
import { TextActions } from "@/app/components/text-actions"
import { AudioPlayer } from "@/app/components/audio-player"
import { useRouter } from "next/navigation"

// Language names for translation
const LANGUAGE_NAMES: Record<string, string> = {
  'eng': 'English',
  'can': 'Canadian English',
  'ind': 'Indonesian',
  'spa': 'Spanish',
  'mex': 'Mexican Spanish',
  'deu': 'German',
  'ita': 'Italian',
  'por': 'Portuguese',
  'jpn': 'Japanese',
  'kor': 'Korean',
  'hin': 'Hindi',
  'gle': 'Irish',
  'gre': 'Greek'
};

export default function TranslatePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const { recordings, updateRecording } = useRecordings()
  const [targetLanguage, setTargetLanguage] = useState("eng")
  const [isTranslating, setIsTranslating] = useState(false)

  const recordingId = searchParams.get("recordingId")
  const recording = recordings.find(r => r.id === recordingId)

  useEffect(() => {
    // If target language is different from current translation, and not the source language
    if (recording?.transcript && 
        recording.sourceLanguage !== targetLanguage && 
        (!recording.translation || recording.translation.targetLanguage !== targetLanguage)) {
      handleTranslation()
    }
  }, [recording, targetLanguage])

  const handleTranslation = async () => {
    if (!recording?.transcript || !recording.sourceLanguage) return

    setIsTranslating(true)
    try {
      const translatedText = await translateText(
        recording.transcript,
        LANGUAGE_NAMES[recording.sourceLanguage] || "Unknown",
        LANGUAGE_NAMES[targetLanguage]
      )

      updateRecording(recording.id, {
        translation: {
          text: translatedText,
          targetLanguage
        }
      })

      toast({
        title: "Success",
        description: "Text has been translated successfully.",
      })
    } catch (error) {
      console.error("Translation error:", error)
      toast({
        title: "Error",
        description: "Failed to translate the text. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsTranslating(false)
    }
  }

  // If no recording ID is provided, show the list of recordings
  if (!recordingId) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start p-4">
        <div className="bg-white rounded-3xl shadow-lg max-w-4xl w-full overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Recordings</h1>
            </div>

            {recordings.length === 0 ? (
              <p className="text-gray-500">No recordings yet. Start by recording something on the voice page.</p>
            ) : (
              <div className="space-y-4">
                {recordings.map((rec) => (
                  <div
                    key={rec.id}
                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 cursor-pointer transition-colors"
                    onClick={() => router.push(`/translate?recordingId=${rec.id}`)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {LANGUAGE_NAMES[rec.sourceLanguage || "eng"]} Recording
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(rec.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <AudioPlayer audioBlob={rec.blob} />
                    </div>
                    {rec.transcript && (
                      <p className="text-gray-600 line-clamp-2">
                        {rec.transcript}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Rest of your existing code for showing a specific recording...
  if (!recording) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start p-4">
        <div className="bg-white rounded-3xl shadow-lg max-w-4xl w-full overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Translation</h1>
            <p className="text-gray-500">Recording not found.</p>
          </div>
        </div>
      </div>
    )
  }

  const sourceLangName = recording.sourceLanguage ? LANGUAGE_NAMES[recording.sourceLanguage] : 'Unknown'

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start p-4">
      <div className="bg-white rounded-3xl shadow-lg max-w-4xl w-full overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Translation</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Translate to:</span>
              <LanguageSelector
                value={targetLanguage}
                onChange={setTargetLanguage}
                disabled={isTranslating}
              />
            </div>
          </div>

          <div className="space-y-6">
            {recording.blob && (
              <div className="flex items-center justify-center">
                <AudioPlayer audioBlob={recording.blob} />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Original Text */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-sm font-medium text-gray-700">
                    Original Text ({sourceLangName})
                  </h2>
                </div>
                {recording.transcript ? (
                  <>
                    <p className="text-gray-600 whitespace-pre-wrap">
                      {recording.transcript}
                    </p>
                    <TextActions text={recording.transcript} />
                  </>
                ) : (
                  <p className="text-gray-500">No transcript available</p>
                )}
              </div>

              {/* Translation */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-sm font-medium text-gray-700">
                    Translation ({LANGUAGE_NAMES[targetLanguage]})
                  </h2>
                </div>
                {recording.translation && recording.translation.targetLanguage === targetLanguage ? (
                  <>
                    <p className="text-gray-600 whitespace-pre-wrap">
                      {recording.translation.text}
                    </p>
                    <TextActions text={recording.translation.text} />
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center min-h-[100px]">
                    {isTranslating ? (
                      <p className="text-gray-500">Translating...</p>
                    ) : (
                      <Button
                        onClick={handleTranslation}
                        disabled={recording.sourceLanguage === targetLanguage}
                      >
                        Translate
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 