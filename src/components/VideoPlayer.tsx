import { useRef, useEffect, useState } from 'react';
import type { VideoPlayerProps, Subtitle } from '../types';
import './VideoPlayer.css';

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoFile,
  subtitles,
  currentTime,
  onTimeUpdate,
  onVideoRef,
  autoPauseEnabled,
  subtitleFontSize,
  resetPositionTrigger
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [currentSubtitle, setCurrentSubtitle] = useState<Subtitle | null>(null);
  const [subtitlePosition, setSubtitlePosition] = useState(() => {
    // Load saved position from localStorage or use default
    const saved = localStorage.getItem('subtitlePosition');
    return saved ? JSON.parse(saved) : { x: 50, y: 85 }; // Default: center horizontally, near bottom
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (videoRef.current) {
      onVideoRef(videoRef.current);
    }
  }, [onVideoRef, videoUrl]); // Added videoUrl dependency

  useEffect(() => {
    if (videoFile) {
      const url = URL.createObjectURL(videoFile);
      setVideoUrl(url);
      
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [videoFile]);

  useEffect(() => {
    // Find current subtitle based on video time with millisecond precision
    const timeInMs = Math.round(currentTime * 1000);
    
    if (autoPauseEnabled) {
      // When auto-pause is enabled, extend subtitle display until next subtitle starts
      let displaySubtitle = subtitles.find(sub => 
        timeInMs >= sub.start && timeInMs <= sub.end
      );
      
      // If no current subtitle, check if we should display the last one until next one starts
      if (!displaySubtitle) {
        // Find the last subtitle that ended
        const lastEndedSubtitle = subtitles
          .filter(sub => timeInMs > sub.end)
          .sort((a, b) => b.end - a.end)[0];
        
        if (lastEndedSubtitle) {
          // Check if there's a next subtitle coming up
          const nextSubtitle = subtitles.find(sub => timeInMs < sub.start);
          
          // Display the last subtitle if there's no next subtitle yet, or if we're still before the next one
          if (!nextSubtitle || timeInMs < nextSubtitle.start) {
            displaySubtitle = lastEndedSubtitle;
          }
        }
      }
      
      setCurrentSubtitle(displaySubtitle || null);
    } else {
      // Normal behavior when auto-pause is disabled
      const subtitle = subtitles.find(sub => 
        timeInMs >= sub.start && timeInMs <= sub.end
      );
      setCurrentSubtitle(subtitle || null);
    }
  }, [currentTime, subtitles, autoPauseEnabled]);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement;
    // Round to millisecond precision for consistent timing
    const preciseTime = Math.round(video.currentTime * 1000) / 1000;
    onTimeUpdate(preciseTime);
  };

  const handleVideoLoad = () => {
    if (videoRef.current) {
      onVideoRef(videoRef.current);
    }
  };

  // Subtitle dragging handlers
  const handleSubtitleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - (subtitlePosition.x * window.innerWidth / 100),
      y: e.clientY - (subtitlePosition.y * window.innerHeight / 100)
    });
  };

  // Reset subtitle position to default
  const resetSubtitlePosition = () => {
    const defaultPosition = { x: 50, y: 85 };
    setSubtitlePosition(defaultPosition);
    localStorage.setItem('subtitlePosition', JSON.stringify(defaultPosition));
  };

  // Trigger reset when resetPositionTrigger changes
  useEffect(() => {
    if (resetPositionTrigger && resetPositionTrigger > 0) {
      resetSubtitlePosition();
    }
  }, [resetPositionTrigger]);

  // Add global mouse event listeners for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newX = ((e.clientX - dragStart.x) / window.innerWidth) * 100;
      const newY = ((e.clientY - dragStart.y) / window.innerHeight) * 100;
      
      // Constrain position within video container bounds (5% margin)
      const constrainedX = Math.max(5, Math.min(95, newX));
      const constrainedY = Math.max(5, Math.min(95, newY));
      
      const newPosition = { x: constrainedX, y: constrainedY };
      setSubtitlePosition(newPosition);
      localStorage.setItem('subtitlePosition', JSON.stringify(newPosition));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart, subtitlePosition.x, subtitlePosition.y]);

  return (
    <div className="video-player">
      {videoUrl ? (
        <div className="video-container">
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            onTimeUpdate={handleTimeUpdate}
            onLoadedData={handleVideoLoad}
            className="video-element"
          />
          {currentSubtitle && (
            <div 
              className="subtitle-overlay"
              style={{ 
                fontSize: `${subtitleFontSize}rem`,
                left: `${subtitlePosition.x}%`,
                top: `${subtitlePosition.y}%`,
                bottom: 'auto',
                transform: 'translate(-50%, -50%)',
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none'
              }}
              onMouseDown={handleSubtitleMouseDown}
              title="Drag to reposition subtitles"
            >
              {currentSubtitle.text.split('\n').map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="video-placeholder">
          <p>Please select a video file to start playing</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
