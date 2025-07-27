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
  const [manualSeekInProgress, setManualSeekInProgress] = useState(false)
  const [lastPausedSubtitleIndex, setLastPausedSubtitleIndex] = useState<number | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [subtitleFontSize, setSubtitleFontSize] = useState(() => {
    // Load saved font size from localStorage or use default
    const saved = localStorage.getItem('subtitleFontSize');
    return saved ? parseFloat(saved) : 1.2;
  });

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
      
      // Reset the paused subtitle tracking when manually seeking
      setLastPausedSubtitleIndex(null)
      
      // Convert milliseconds to seconds with millisecond precision
      const timeInSeconds = Math.round(subtitle.start) / 1000
      videoRef.currentTime = timeInSeconds
      setCurrentTime(timeInSeconds) // Update the current time state
      
      videoRef.play()
      
      // Clear the manual seek flag after a short delay
      setTimeout(() => {
        setManualSeekInProgress(false)
      }, 100)
    }
  }

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time)
    
    // Auto-pause logic: pause at the END of each subtitle (skip if manual seek is in progress)
    if (autoPauseEnabled && videoRef && subtitles.length > 0 && !manualSeekInProgress) {
      // Convert time to milliseconds with precision
      const timeInMs = Math.round(time * 1000)
      
      // Find current active subtitle
      const currentActiveSubtitleIndex = subtitles.findIndex(subtitle => 
        timeInMs >= subtitle.start && timeInMs <= subtitle.end
      )
      
      // If we have an active subtitle, check if we've reached its end time
      if (currentActiveSubtitleIndex !== -1) {
        const currentSubtitle = subtitles[currentActiveSubtitleIndex]
        
        // Pause when we reach the end time of the current subtitle (with small tolerance for precision)
        // Only pause if we haven't already paused for this subtitle
        if (timeInMs >= currentSubtitle.end - 100 && lastPausedSubtitleIndex !== currentActiveSubtitleIndex) {
          console.log(`Auto-pausing at end of subtitle ${currentActiveSubtitleIndex + 1}: "${currentSubtitle.text.substring(0, 50)}..."`)
          videoRef.pause()
          setLastPausedSubtitleIndex(currentActiveSubtitleIndex)
        }
      }
      // Also pause if we're between subtitles (no active subtitle) and we haven't paused recently
      else if (currentActiveSubtitleIndex === -1 && lastPausedSubtitleIndex !== -1) {
        // Find if we just passed a subtitle
        const justPassedSubtitleIndex = subtitles.findIndex(subtitle => 
          timeInMs > subtitle.end && timeInMs <= subtitle.end + 200 // within 200ms after subtitle end
        )
        
        if (justPassedSubtitleIndex !== -1 && lastPausedSubtitleIndex !== justPassedSubtitleIndex) {
          console.log(`Auto-pausing after subtitle ${justPassedSubtitleIndex + 1} ended`)
          videoRef.pause()
          setLastPausedSubtitleIndex(justPassedSubtitleIndex)
        }
      }
    }
  }

  const handleResize = (newLeftWidth: number) => {
    setLeftPanelWidth(newLeftWidth)
  }

  const toggleAutoPause = () => {
    setAutoPauseEnabled(!autoPauseEnabled)
    // Reset paused subtitle tracking when toggling auto-pause
    setLastPausedSubtitleIndex(null)
  }

  const handleFontSizeChange = (newSize: number) => {
    setSubtitleFontSize(newSize)
    localStorage.setItem('subtitleFontSize', newSize.toString())
  }

  // Close settings popup with Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showSettings) {
        setShowSettings(false)
      }
    }

    if (showSettings) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [showSettings])

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
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="settings-button"
            title="Video Settings"
          >
            ⚙️
          </button>
        </div>
      </header>
      
      {/* Settings Popup */}
      {showSettings && (
        <>
          <div 
            className="settings-backdrop"
            onClick={() => setShowSettings(false)}
          />
          <div className="settings-popup">
            <div className="settings-header">
              <h3>Video Settings</h3>
              <button 
                className="close-button"
                onClick={() => setShowSettings(false)}
              >
                ×
              </button>
            </div>
            <div className="settings-content">
              <div className="font-size-control">
                <label htmlFor="font-size-slider" className="control-label">
                  Subtitle Size
                </label>
                <input
                  id="font-size-slider"
                  type="range"
                  min="0.8"
                  max="2.5"
                  step="0.1"
                  value={subtitleFontSize}
                  onChange={(e) => handleFontSizeChange(parseFloat(e.target.value))}
                  className="font-size-slider"
                />
                <span className="size-display">{subtitleFontSize.toFixed(1)}rem</span>
              </div>
            </div>
          </div>
        </>
      )}
      
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
            autoPauseEnabled={autoPauseEnabled}
            subtitleFontSize={subtitleFontSize}
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
