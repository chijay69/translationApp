"use client"

import { useRef, useState, useEffect } from "react"
import { Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface AudioPlayerProps {
  audioBlob: Blob
  onPlaybackStart?: () => void
  onPlaybackEnd?: () => void
}

export function AudioPlayer({ audioBlob, onPlaybackStart, onPlaybackEnd }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Create object URL when component mounts or audioBlob changes
  useEffect(() => {
    const url = URL.createObjectURL(audioBlob)
    setAudioUrl(url)

    // Clean up the object URL when component unmounts or audioBlob changes
    return () => {
      URL.revokeObjectURL(url)
    }
  }, [audioBlob])

  // Set up audio event listeners
  useEffect(() => {
    if (!audioRef.current) return

    const audio = audioRef.current

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleTimeUpdate = () => {
      setProgress((audio.currentTime * 100) / (audio.duration || 1))
    }

    const handleEnded = () => {
      setIsPlaying(false)
      onPlaybackEnd?.()
    }

    const handlePause = () => {
      onPlaybackEnd?.()
    }

    const handlePlay = () => {
      onPlaybackStart?.()
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("pause", handlePause)
    audio.addEventListener("play", handlePlay)

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("play", handlePlay)
    }
  }, [onPlaybackStart, onPlaybackEnd])

  const togglePlayback = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  const handleProgressChange = (value: number[]) => {
    if (!audioRef.current) return

    const newTime = (value[0] * audioRef.current.duration) / 100
    audioRef.current.currentTime = newTime
    setProgress(value[0])
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex items-center gap-4 min-w-[200px]">
      <Button onClick={togglePlayback} variant="outline" size="icon" className="rounded-full shrink-0">
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>

      <div className="flex-1">
        <Slider value={[progress]} onValueChange={handleProgressChange} max={100} step={0.1} className="w-full" />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{formatTime((progress * duration) / 100)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {audioUrl && <audio ref={audioRef} src={audioUrl} className="hidden" />}
    </div>
  )
}

