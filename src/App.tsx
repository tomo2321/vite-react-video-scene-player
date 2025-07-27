import { useState, useEffect } from 'react'
import VideoPlayer from './components/VideoPlayer'
import SubtitlePanel from './components/SubtitlePanel'
import FileUploader from './components/FileUploader'
import ResizableSplitter from './components/ResizableSplitter'
import type { Subtitle } from './types'
import './App.css'

function App() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [subtitles, setSubtitles] = useState<Subtitle[]>([])
  const [currentTime, setCurrentTime] = useState(0)
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null)
  const [leftPanelWidth, setLeftPanelWidth] = useState(70) // percentage
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleWindowResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  const handleVideoLoad = (file: File) => {
    setVideoFile(file)
  }

  const handleSubtitlesLoad = (parsedSubtitles: Subtitle[]) => {
    setSubtitles(parsedSubtitles)
  }

  const handleSubtitleClick = (subtitle: Subtitle) => {
    if (videoRef) {
      const timeInSeconds = subtitle.start / 1000 // Convert milliseconds to seconds
      videoRef.currentTime = timeInSeconds
      setCurrentTime(timeInSeconds) // Update the current time state
      videoRef.play()
    }
  }

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time)
  }

  const handleResize = (newLeftWidth: number) => {
    setLeftPanelWidth(newLeftWidth)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Video Scene Player</h1>
        <FileUploader 
          onVideoLoad={handleVideoLoad}
          onSubtitlesLoad={handleSubtitlesLoad}
        />
      </header>
      
      <main className="app-main">
        <div 
          className="video-section"
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: isMobile ? '100%' : `${leftPanelWidth}%`,
            height: isMobile ? '60%' : '100%'
          }}
        >
          <VideoPlayer
            videoFile={videoFile}
            subtitles={subtitles}
            currentTime={currentTime}
            onTimeUpdate={handleTimeUpdate}
            onVideoRef={setVideoRef}
          />
        </div>
        
        {!isMobile && (
          <ResizableSplitter
            onResize={handleResize}
            initialLeftWidth={leftPanelWidth}
            minLeftWidth={30}
            maxLeftWidth={85}
          />
        )}
        
        <div 
          className="subtitle-section"
          style={{ 
            position: 'absolute',
            top: isMobile ? '60%' : 0,
            right: 0,
            width: isMobile ? '100%' : `${100 - leftPanelWidth}%`,
            height: isMobile ? '40%' : '100%',
            borderLeft: isMobile ? 'none' : '1px solid #ddd',
            borderTop: isMobile ? '1px solid #ddd' : 'none'
          }}
        >
          <SubtitlePanel
            subtitles={subtitles}
            currentTime={currentTime}
            onSubtitleClick={handleSubtitleClick}
          />
        </div>
      </main>
    </div>
  )
}

export default App
