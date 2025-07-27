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
  const [autoPauseEnabled, setAutoPauseEnabled] = useState(false)
  const [lastActiveSubtitleIndex, setLastActiveSubtitleIndex] = useState<number | null>(null)
  const [manualSeekInProgress, setManualSeekInProgress] = useState(false)

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
      // Set flag to indicate manual seek is in progress
      setManualSeekInProgress(true)
      
      const timeInSeconds = subtitle.start / 1000 // Convert milliseconds to seconds
      videoRef.currentTime = timeInSeconds
      setCurrentTime(timeInSeconds) // Update the current time state
      
      // Update the last active subtitle index to the clicked subtitle
      const clickedIndex = subtitles.findIndex(sub => sub.start === subtitle.start && sub.end === subtitle.end)
      setLastActiveSubtitleIndex(clickedIndex)
      
      videoRef.play()
      
      // Clear the manual seek flag after a short delay
      setTimeout(() => {
        setManualSeekInProgress(false)
      }, 100)
    }
  }

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time)
    
    // Auto-pause logic when subtitle changes (skip if manual seek is in progress)
    if (autoPauseEnabled && videoRef && subtitles.length > 0 && !manualSeekInProgress) {
      const timeInMs = time * 1000
      const currentActiveSubtitleIndex = subtitles.findIndex(subtitle => 
        timeInMs >= subtitle.start && timeInMs <= subtitle.end
      )
      
      // Check if we've moved to a new subtitle
      if (lastActiveSubtitleIndex !== null && 
          currentActiveSubtitleIndex !== lastActiveSubtitleIndex &&
          currentActiveSubtitleIndex !== -1) {
        videoRef.pause()
      }
      
      setLastActiveSubtitleIndex(currentActiveSubtitleIndex)
    }
  }

  const handleResize = (newLeftWidth: number) => {
    setLeftPanelWidth(newLeftWidth)
  }

  const toggleAutoPause = () => {
    setAutoPauseEnabled(!autoPauseEnabled)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Video Scene Player</h1>
        <div className="header-controls">
          <FileUploader 
            onVideoLoad={handleVideoLoad}
            onSubtitlesLoad={handleSubtitlesLoad}
          />
          <button 
            onClick={toggleAutoPause}
            className={`auto-pause-toggle ${autoPauseEnabled ? 'active' : ''}`}
            title={autoPauseEnabled ? 'Disable auto-pause on subtitle change' : 'Enable auto-pause on subtitle change'}
          >
            ⏸️ Auto-pause: {autoPauseEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
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
