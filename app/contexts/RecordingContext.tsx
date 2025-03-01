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
}

const RecordingContext = createContext<RecordingContextType | undefined>(undefined)

export function RecordingProvider({ children }: { children: React.ReactNode }) {
  const [recordings, setRecordings] = useState<Recording[]>([])

  // Load recordings from localStorage on mount
  useEffect(() => {
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
  }, [])

  // Save recordings to localStorage whenever they change
  useEffect(() => {
    if (recordings.length > 0) {
      const saveRecordings = async () => {
        const recordingsToSave = await Promise.all(
          recordings.map(async recording => {
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
        localStorage.setItem("recordings", JSON.stringify(recordingsToSave))
      }
      saveRecordings()
    } else {
      localStorage.removeItem("recordings")
    }
  }, [recordings])

  const addRecording = (recording: Recording) => {
    setRecordings(prev => [...prev, recording])
  }

  const deleteRecording = (id: string) => {
    setRecordings(prev => prev.filter(recording => recording.id !== id))
  }

  const updateRecording = (id: string, updates: Partial<Recording>) => {
    setRecordings(prev =>
      prev.map(recording =>
        recording.id === id ? { ...recording, ...updates } : recording
      )
    )
  }

  return (
    <RecordingContext.Provider value={{ recordings, addRecording, deleteRecording, updateRecording }}>
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