import { useRef, useEffect, useState } from 'react';
import type { VideoPlayerProps, Subtitle } from '../types';
import './VideoPlayer.css';

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoFile,
  subtitles,
  currentTime,
  onTimeUpdate,
  onVideoRef
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
    // Find current subtitle based on video time
    const timeInMs = currentTime * 1000;
    const subtitle = subtitles.find(sub => 
      timeInMs >= sub.start && timeInMs <= sub.end
    );
    setCurrentSubtitle(subtitle || null);
  }, [currentTime, subtitles]);

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement;
    onTimeUpdate(video.currentTime);
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
