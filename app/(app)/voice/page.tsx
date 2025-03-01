"use client"

import { useState, useRef, useEffect } from "react"
import { LanguageSelector } from "../../components/language-selector"
import { TextActions } from "../../components/text-actions"
import { AudioPlayer } from "../../components/audio-player"
import { Mic, Square, Trash2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { transcribeAudio, translateText } from "../../utils/gemini"
import { useRecordings } from "../../contexts/RecordingContext"
import { useRouter } from "next/navigation"

// Language code mapping
const LANGUAGE_CODES: Record<string, string> = {
  'eng': 'en-US',
  'can': 'en-CA',
  'ind': 'id-ID',
  'spa': 'es-ES',
  'mex': 'es-MX',
  'deu': 'de-DE',
  'ita': 'it-IT',
  'por': 'pt-BR',
  'jpn': 'ja-JP',
  'kor': 'ko-KR',
  'hin': 'hi-IN',
  'gle': 'ga-IE',
  'gre': 'el-GR'
};

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

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  abort(): void;
  start(): void;
  stop(): void;
}

interface SpeechRecognitionConstructor {
  prototype: SpeechRecognition;
  new(): SpeechRecognition;
}

declare global {
  var SpeechRecognition: SpeechRecognitionConstructor | undefined;
  var webkitSpeechRecognition: SpeechRecognitionConstructor | undefined;
}

export default function VoicePage() {
  const { toast } = useToast()
  const router = useRouter()
  const { addRecording, recordings } = useRecordings()
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [sourceLanguage, setSourceLanguage] = useState("eng")
  const [targetLanguage, setTargetLanguage] = useState("eng")
  const [isProcessingFinal, setIsProcessingFinal] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const [transcribedText, setTranscribedText] = useState("")
  const [audioData, setAudioData] = useState<Blob | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const interimTranscriptRef = useRef("")

  const startRecording = async () => {
    try {
      // Start speech recognition immediately
      const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition
      if (!SpeechRecognitionConstructor) {
        throw new Error("Speech recognition is not supported in this browser")
      }
      
      const recognition = new SpeechRecognitionConstructor()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = LANGUAGE_CODES[sourceLanguage]

      // Optimize transcription handling
      let finalTranscriptParts: string[] = []
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i]
          if (result.isFinal) {
            finalTranscriptParts.push(result[0].transcript)
            interimTranscriptRef.current = finalTranscriptParts.join(' ')
          } else {
            interimTranscript = result[0].transcript
          }
        }

        // Update transcript only with necessary changes
        const newTranscript = finalTranscriptParts.join(' ') + (interimTranscript ? ' ' + interimTranscript : '')
        if (newTranscript !== transcript) {
          setTranscript(newTranscript)
        }
      }

      // Start recognition before media recorder setup
      recognition.start()
      recognitionRef.current = recognition as SpeechRecognition

      // Setup media recorder in parallel
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/ogg'
      })
      
      mediaRecorder.start()
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      // Handle audio data
      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data)
      }

      setIsRecording(true)
      setTranscript("")
      setTranscribedText("")
      setAudioData(null)
    } catch (error) {
      console.error("Error starting recording:", error)
      toast({
        title: "Error",
        description: "Failed to start recording. Please check your microphone permissions.",
        variant: "destructive",
      })
    }
  }

  const handleRecordingStop = () => {
    if (!mediaRecorderRef.current || !recognitionRef.current) return

      // Stop recognition first to get final results
      recognitionRef.current.stop()
      
    // Stop media recorder and process audio
    mediaRecorderRef.current.stop()
    setIsRecording(false)

    mediaRecorderRef.current.onstop = async () => {
      const blob = new Blob(chunksRef.current, { 
        type: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/ogg'
      })
      setAudioData(blob)
      chunksRef.current = []

      // Process final transcript
      const currentTranscript = interimTranscriptRef.current.trim()
      if (!currentTranscript) return

      setIsProcessingFinal(true)
      try {
        // Process transcript enhancement and translation in parallel
        const [enhancedTranscript, translatedText] = await Promise.all([
          transcribeAudio(currentTranscript),
          sourceLanguage !== targetLanguage ? translateText(
            currentTranscript,
            LANGUAGE_NAMES[sourceLanguage],
            LANGUAGE_NAMES[targetLanguage]
          ) : null
        ])

        setTranscribedText(enhancedTranscript)

        // Create and save recording
        const recordingId = Date.now().toString()
        const newRecording = {
          id: recordingId,
          blob,
          timestamp: new Date(),
          transcript: enhancedTranscript,
          sourceLanguage,
          translation: translatedText ? {
            text: translatedText,
            targetLanguage
          } : undefined
        }

        addRecording(newRecording)
      } catch (error) {
        console.error("Processing error:", error)
        toast({
          title: "Error",
          description: "Failed to process the recording. Saving original transcript.",
          variant: "destructive",
        })
        // Save with original transcript
        const newRecording = {
          id: Date.now().toString(),
          blob,
          timestamp: new Date(),
          transcript: currentTranscript,
          sourceLanguage
        }
        addRecording(newRecording)
      } finally {
        setIsProcessingFinal(false)
      }
    }
  }

  

  // Add effect to automatically translate when target language changes
  useEffect(() => {
    const translateLatestRecording = async () => {
      const latestRecording = recordings[recordings.length - 1]
      if (!latestRecording?.transcript || !latestRecording.sourceLanguage) return
      if (latestRecording.translation?.targetLanguage === targetLanguage) return

      setIsTranslating(true)
      try {
        const translatedText = await translateText(
          latestRecording.transcript,
          LANGUAGE_NAMES[latestRecording.sourceLanguage],
          LANGUAGE_NAMES[targetLanguage]
        )

        const updatedRecording = {
          ...latestRecording,
          translation: {
            text: translatedText,
            targetLanguage
          }
        }
        addRecording(updatedRecording)
      } catch (error) {
        console.error("Auto-translation error:", error)
        toast({
          title: "Warning",
          description: "Automatic translation failed. You can try manual translation.",
          variant: "default",
        })
      } finally {
        setIsTranslating(false)
      }
    }

    if (recordings.length > 0) {
      translateLatestRecording()
    }
  }, [targetLanguage, recordings, addRecording])

  const handleRetryTranscription = async () => {
    if (transcript) {
      setIsProcessingFinal(true)
      try {
        const enhancedTranscript = await transcribeAudio(transcript)
        setTranscribedText(enhancedTranscript)
      } catch (error) {
        console.error("Transcript enhancement error:", error)
        toast({
          title: "Error",
          description: "Failed to enhance the transcript. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsProcessingFinal(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start p-4 space-y-4">
      {/* Recording Section */}
      <div className="bg-white rounded-3xl shadow-lg max-w-4xl w-full overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold text-gray-900">Voice Recorder</h1>
            </div>
            <LanguageSelector
              value={sourceLanguage}
              onChange={setSourceLanguage}
              disabled={isRecording}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-center">
              <Button
                variant={isRecording ? "destructive" : "default"}
                size="lg"
                className="rounded-full w-16 h-16 p-0"
                onClick={isRecording ? handleRecordingStop : startRecording}
              >
                {isRecording ? (
                  <Square className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </Button>
            </div>

            {audioData && (
              <div className="flex items-center justify-center gap-4 mt-4">
                <AudioPlayer audioBlob={audioData} />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setAudioData(null)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            )}
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-sm font-medium text-gray-700">Real-time Transcript</h2>
                {transcript && !isRecording && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRetryTranscription}
                    disabled={isProcessingFinal}
                    className="text-gray-400 hover:text-indigo-600"
                  >
                    <RefreshCw className={`w-4 h-4 ${isProcessingFinal ? 'animate-spin' : ''}`} />
                  </Button>
                )}
              </div>
              <p className="text-gray-600 whitespace-pre-wrap min-h-[100px]">
                {transcript || "Start speaking after clicking the microphone button..."}
              </p>
            </div>

            {transcribedText && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h2 className="text-sm font-medium text-gray-700 mb-2">Enhanced Transcript</h2>
                <p className="text-gray-600 whitespace-pre-wrap">
                  {transcribedText}
                </p>
                <TextActions text={transcribedText} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recordings List */}
      <div className="bg-white rounded-3xl shadow-lg max-w-4xl w-full overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Translated Text</h2>
            {recordings.length > 0 && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">Language:</span>
                <LanguageSelector
                  value={targetLanguage}
                  onChange={setTargetLanguage}
                  disabled={isTranslating}
                />
              </div>
            )}
          </div>

          {recordings.length === 0 && transcript ? (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-gray-700">
                  Original Text ({LANGUAGE_NAMES[sourceLanguage]})
                </h3>
              </div>
              <p className="text-gray-600 whitespace-pre-wrap mb-4">
                {transcript}
              </p>
              {transcribedText && (
                <>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Enhanced Text
                  </h3>
                  <p className="text-gray-600 whitespace-pre-wrap">
                    {transcribedText}
                  </p>
                </>
              )}
            </div>
          ) : recordings.length === 0 ? (
            <p className="text-gray-500">Start speaking after clicking the microphone button above...</p>
          ) : (
            <div className="space-y-4">
              {recordings.slice(-1).map((rec) => (
                <div
                  key={rec.id}
                  className="bg-gray-50 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {LANGUAGE_NAMES[rec.sourceLanguage || "eng"]} Text
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(rec.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <AudioPlayer audioBlob={rec.blob} />
                  </div>
                  
                  {/* Original Text */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Original Text
                    </h4>
                    <p className="text-gray-600 whitespace-pre-wrap mb-2">
                      {rec.transcript}
                    </p>
                    <TextActions text={rec.transcript || ""} />
                  </div>

                  {/* Translation */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Translation ({LANGUAGE_NAMES[targetLanguage]})
                    </h4>
                    {rec.translation && rec.translation.targetLanguage === targetLanguage ? (
                      <>
                        <p className="text-gray-600 whitespace-pre-wrap mb-2">
                          {rec.translation.text}
                        </p>
                        <TextActions text={rec.translation.text} />
                      </>
                    ) : (
                      <div className="flex items-center justify-start h-12">
                        <p className="text-gray-500">
                          {isTranslating ? "Translating..." : "Translation will appear automatically"}
                        </p>
                      </div>
                    )}
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