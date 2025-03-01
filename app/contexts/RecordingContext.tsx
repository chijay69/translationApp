"use client"

import { createContext, useContext, useState, useEffect } from "react"

interface Recording {
  id: string
  blob: Blob
  timestamp: Date
  transcript?: string
  sourceLanguage?: string
  translation?: {
    text: string
    targetLanguage: string
  }
}

interface RecordingContextType {
  recordings: Recording[]
  addRecording: (recording: Recording) => void
  deleteRecording: (id: string) => void
  updateRecording: (id: string, updates: Partial<Recording>) => void
  sourceLanguage: string
  targetLanguage: string
  setSourceLanguage: (lang: string) => void
  setTargetLanguage: (lang: string) => void
}

const RecordingContext = createContext<RecordingContextType | undefined>(undefined)

export function RecordingProvider({ children }: { children: React.ReactNode }) {
  const [recordings, setRecordings] = useState<Recording[]>([])
  const [sourceLanguage, setSourceLanguage] = useState<string>(() => {
    // Initialize from localStorage or default to 'eng'
    const saved = localStorage.getItem("sourceLanguage")
    return saved || "eng"
  })
  const [targetLanguage, setTargetLanguage] = useState<string>(() => {
    // Initialize from localStorage or default to 'eng'
    const saved = localStorage.getItem("targetLanguage")
    return saved || "eng"
  })

  // Save language preferences when they change
  useEffect(() => {
    localStorage.setItem("sourceLanguage", sourceLanguage)
  }, [sourceLanguage])

  useEffect(() => {
    localStorage.setItem("targetLanguage", targetLanguage)
  }, [targetLanguage])

  // Load recordings from localStorage on mount
  useEffect(() => {
    loadRecordings()
  }, [])

  const loadRecordings = () => {
    const savedRecordings = localStorage.getItem("recordings")
    if (savedRecordings) {
      try {
        const parsed = JSON.parse(savedRecordings)
        const loadedRecordings = parsed.map((recording: any) => {
          const uint8Array = new Uint8Array(recording.blobData)
          return {
            id: recording.id,
            blob: new Blob([uint8Array.buffer], { type: "audio/wav" }),
            timestamp: new Date(recording.timestamp),
            transcript: recording.transcript,
            sourceLanguage: recording.sourceLanguage,
            translation: recording.translation
          }
        })
        setRecordings(loadedRecordings)
      } catch (error) {
        console.error("Error loading recordings:", error)
      }
    }
  }

  const saveRecordings = async (recordingsToSave: Recording[]) => {
    try {
      const recordingsData = await Promise.all(
        recordingsToSave.map(async recording => {
          const arrayBuffer = await recording.blob.arrayBuffer()
          const uint8Array = new Uint8Array(arrayBuffer)
          return {
            id: recording.id,
            blobData: Array.from(uint8Array),
            timestamp: recording.timestamp.toISOString(),
            transcript: recording.transcript,
            sourceLanguage: recording.sourceLanguage,
            translation: recording.translation
          }
        })
      )
      localStorage.setItem("recordings", JSON.stringify(recordingsData))
    } catch (error) {
      console.error("Error saving recordings:", error)
    }
  }

  // Save recordings to localStorage whenever they change
  useEffect(() => {
    if (recordings.length > 0) {
      saveRecordings(recordings)
    } else {
      localStorage.removeItem("recordings")
    }
  }, [recordings])

  const addRecording = async (recording: Recording) => {
    const newRecordings = [...recordings, recording]
    setRecordings(newRecordings)
    await saveRecordings(newRecordings)
  }

  const deleteRecording = async (id: string) => {
    const newRecordings = recordings.filter(recording => recording.id !== id)
    setRecordings(newRecordings)
    if (newRecordings.length > 0) {
      await saveRecordings(newRecordings)
    } else {
      localStorage.removeItem("recordings")
    }
  }

  const updateRecording = async (id: string, updates: Partial<Recording>) => {
    const newRecordings = recordings.map(recording =>
      recording.id === id ? { ...recording, ...updates } : recording
    )
    setRecordings(newRecordings)
    await saveRecordings(newRecordings)
  }

  return (
    <RecordingContext.Provider 
      value={{ 
        recordings, 
        addRecording, 
        deleteRecording, 
        updateRecording,
        sourceLanguage,
        targetLanguage,
        setSourceLanguage,
        setTargetLanguage
      }}
    >
      {children}
    </RecordingContext.Provider>
  )
}

export function useRecordings() {
  const context = useContext(RecordingContext)
  if (context === undefined) {
    throw new Error("useRecordings must be used within a RecordingProvider")
  }
  return context
} 