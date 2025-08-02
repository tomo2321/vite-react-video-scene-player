import { useCallback, useEffect, useRef, useState } from 'react';
import type { Subtitle, VideoPlayerProps } from '../types';
import {
  convertLettersToUnderscores,
  extractLettersOnly,
  revealTypedCharacters,
} from '../utils/textUtils';
import './VideoPlayer.css';

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoFile,
  subtitles,
  currentTime,
  onTimeUpdate,
  onVideoRef,
  autoPauseEnabled,
  subtitleFontSize,
  resetPositionTrigger,
  hideLettersEnabled = false,
  textTypingEnabled = false,
  onTextTyped,
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
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState<number>(-1);

  useEffect(() => {
    if (videoRef.current) {
      onVideoRef(videoRef.current);
    }
  }, [onVideoRef]); // Added videoUrl dependency

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
    let displaySubtitle: Subtitle | null = null;
    let subtitleIndex = -1;

    if (autoPauseEnabled) {
      // When auto-pause is enabled, extend subtitle display until next subtitle starts
      const foundIndex = subtitles.findIndex((sub) => timeInMs >= sub.start && timeInMs <= sub.end);

      if (foundIndex !== -1) {
        displaySubtitle = subtitles[foundIndex];
        subtitleIndex = foundIndex;
      } else {
        // If no current subtitle, check if we should display the last one until next one starts
        const lastEndedIndex = subtitles
          .map((sub, index) => ({ sub, index }))
          .filter(({ sub }) => timeInMs > sub.end)
          .sort((a, b) => b.sub.end - a.sub.end)[0];

        if (lastEndedIndex) {
          // Check if there's a next subtitle coming up
          const nextSubtitle = subtitles.find((sub) => timeInMs < sub.start);

          // Display the last subtitle if there's no next subtitle yet, or if we're still before the next one
          if (!nextSubtitle || timeInMs < nextSubtitle.start) {
            displaySubtitle = lastEndedIndex.sub;
            subtitleIndex = lastEndedIndex.index;
          }
        }
      }
    } else {
      // Normal behavior when auto-pause is disabled
      const foundIndex = subtitles.findIndex((sub) => timeInMs >= sub.start && timeInMs <= sub.end);
      if (foundIndex !== -1) {
        displaySubtitle = subtitles[foundIndex];
        subtitleIndex = foundIndex;
      }
    }

    setCurrentSubtitle(displaySubtitle);
    setCurrentSubtitleIndex(subtitleIndex);
  }, [currentTime, subtitles, autoPauseEnabled]);

  // Keyboard event handler for text typing mode
  useEffect(() => {
    if (!textTypingEnabled || currentSubtitleIndex === -1) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle letter and number keys
      if (!/^[a-zA-Z0-9]$/.test(event.key)) return;

      // Prevent default to avoid any browser shortcuts
      event.preventDefault();

      const currentSub = subtitles[currentSubtitleIndex];
      if (!currentSub) return;

      const currentTypedText = currentSub.typedText || '';
      const targetText = extractLettersOnly(currentSub.text);

      // Check if the typed key matches the next expected character
      if (
        currentTypedText.length < targetText.length &&
        event.key.toLowerCase() === targetText[currentTypedText.length]
      ) {
        const newTypedText = currentTypedText + event.key.toLowerCase();
        onTextTyped?.(currentSubtitleIndex, newTypedText);
      }
    };

    // Add event listener to document so it works globally when video player is focused
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [textTypingEnabled, currentSubtitleIndex, subtitles, onTextTyped]);

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
      x: e.clientX - (subtitlePosition.x * window.innerWidth) / 100,
      y: e.clientY - (subtitlePosition.y * window.innerHeight) / 100,
    });
  };

  // Reset subtitle position to default
  const resetSubtitlePosition = useCallback(() => {
    const defaultPosition = { x: 50, y: 85 };
    setSubtitlePosition(defaultPosition);
    localStorage.setItem('subtitlePosition', JSON.stringify(defaultPosition));
  }, []);

  // Trigger reset when resetPositionTrigger changes
  useEffect(() => {
    if (resetPositionTrigger && resetPositionTrigger > 0) {
      resetSubtitlePosition();
    }
  }, [resetPositionTrigger, resetSubtitlePosition]);

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
  }, [isDragging, dragStart]);

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
            <>
              {textTypingEnabled && (
                <div className="typing-indicator">
                  <span>🔤 Text Typing Mode Active - Type to reveal letters!</span>
                  <span className="typing-progress">
                    Progress: {currentSubtitle.typedText?.length || 0} /{' '}
                    {extractLettersOnly(currentSubtitle.text).length}
                  </span>
                </div>
              )}
              <div
                className="subtitle-overlay"
                style={{
                  fontSize: `${subtitleFontSize}rem`,
                  left: `${subtitlePosition.x}%`,
                  top: `${subtitlePosition.y}%`,
                  bottom: 'auto',
                  transform: 'translate(-50%, -50%)',
                  cursor: isDragging ? 'grabbing' : 'grab',
                  userSelect: 'none',
                }}
                onMouseDown={handleSubtitleMouseDown}
                title="Drag to reposition subtitles"
                role="button"
                tabIndex={0}
                aria-label="Draggable subtitle text"
              >
                {currentSubtitle.text.split('\n').map((line, idx) => {
                  let displayText: string;

                  if (textTypingEnabled && currentSubtitleIndex !== -1) {
                    // In text typing mode, reveal typed characters with full context
                    const typedText = currentSubtitle.typedText || '';
                    displayText = revealTypedCharacters(line, typedText, currentSubtitle.text);
                  } else if (hideLettersEnabled) {
                    // Regular hide letters mode
                    displayText = convertLettersToUnderscores(line);
                  } else {
                    // Normal display
                    displayText = line;
                  }

                  return (
                    <div key={`subtitle-line-${idx}-${line.substring(0, 10)}`}>{displayText}</div>
                  );
                })}
              </div>
            </>
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
