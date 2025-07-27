import { useRef, useEffect, useState } from 'react';
import type { VideoPlayerProps, Subtitle } from '../types';
import './VideoPlayer.css';

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoFile,
  subtitles,
  currentTime,
  onTimeUpdate,
  onVideoRef,
  autoPauseEnabled
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [currentSubtitle, setCurrentSubtitle] = useState<Subtitle | null>(null);

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
            <div className="subtitle-overlay">
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
