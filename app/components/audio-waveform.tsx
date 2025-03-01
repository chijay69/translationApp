"use client"

import { useEffect, useRef } from "react"

interface AudioWaveformProps {
  isPlaying: boolean
  onStop: () => void
}

export function AudioWaveform({ isPlaying, onStop }: AudioWaveformProps) {
  const waveformRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const analyserRef = useRef<AnalyserNode>()

  useEffect(() => {
    if (!waveformRef.current) return

    const setupAudioContext = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const audioContext = new AudioContext()
        const source = audioContext.createMediaStreamSource(stream)
        const analyser = audioContext.createAnalyser()

        analyser.fftSize = 256
        source.connect(analyser)
        analyserRef.current = analyser

        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)
        const canvas = waveformRef.current!
        const canvasCtx = canvas.getContext("2d")!

        const draw = () => {
          if (!isPlaying) return

          animationRef.current = requestAnimationFrame(draw)
          analyser.getByteTimeDomainData(dataArray)

          canvasCtx.fillStyle = "rgb(255, 255, 255)"
          canvasCtx.fillRect(0, 0, canvas.width, canvas.height)

          canvasCtx.lineWidth = 2
          canvasCtx.strokeStyle = "rgb(99, 102, 241)"
          canvasCtx.beginPath()

          const sliceWidth = canvas.width / bufferLength
          let x = 0

          for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0
            const y = (v * canvas.height) / 2

            if (i === 0) {
              canvasCtx.moveTo(x, y)
            } else {
              canvasCtx.lineTo(x, y)
            }

            x += sliceWidth
          }

          canvasCtx.lineTo(canvas.width, canvas.height / 2)
          canvasCtx.stroke()
        }

        draw()
      } catch (err) {
        console.error("Error setting up audio visualization:", err)
      }
    }

    if (isPlaying) {
      setupAudioContext()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying])

  return (
    <div className="w-full my-6 flex flex-col items-center">
      <canvas ref={waveformRef} className="w-full h-24" width={300} height={100} />

      {isPlaying && (
        <button onClick={onStop} className="mt-4 text-gray-400 font-medium">
          Stop
        </button>
      )}
    </div>
  )
}

