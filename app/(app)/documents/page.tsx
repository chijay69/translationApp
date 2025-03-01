"use client"

import { AudioPlayer } from "@/app/components/audio-player"
import { Button } from "@/components/ui/button"
import { Trash2, RefreshCw } from "lucide-react"
import { useRecordings } from "@/app/contexts/RecordingContext"
import { useToast } from "@/components/ui/use-toast"
import { transcribeAudio } from "@/app/utils/gemini"

export default function DocumentsPage() {
  const { recordings, deleteRecording, updateRecording } = useRecordings()
  const { toast } = useToast()

  const handleRetryTranscription = async (id: string, transcript: string) => {
    try {
      const enhancedTranscript = await transcribeAudio(transcript)
      // Update the recording with the new transcript
      updateRecording(id, { transcript: enhancedTranscript })
      toast({
        title: "Success",
        description: "Transcript has been enhanced.",
      })
    } catch (error) {
      console.error("Transcript enhancement error:", error)
      toast({
        title: "Error",
        description: "Failed to enhance the transcript. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start p-4">
      <div className="bg-white rounded-3xl shadow-lg max-w-4xl w-full overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Recording History</h1>
          
          {recordings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No recordings yet. Start recording from the voice screen!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recordings.map((recording) => (
                <div key={recording.id} className="flex flex-col gap-2 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <AudioPlayer audioBlob={recording.blob} />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {new Date(recording.timestamp).toLocaleString()}
                        </span>
                        {recording.transcript && (
                          <p className="text-sm text-gray-600 mt-2 whitespace-pre-wrap">
                            {recording.transcript}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {recording.transcript && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRetryTranscription(recording.id, recording.transcript!)}
                          className="text-gray-400 hover:text-indigo-600"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteRecording(recording.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

