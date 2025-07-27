import { useEffect, useRef } from 'react';
import type { SubtitleLineProps } from '../types';
import './SubtitleLine.css';

const SubtitleLine: React.FC<SubtitleLineProps> = ({ subtitle, isActive, onClick }) => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && lineRef.current) {
      lineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [isActive]);

  const formatTime = (timeMs: number) => {
    const seconds = Math.floor(timeMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleClick = () => {
    onClick(subtitle);
  };

  return (
    <div
      ref={lineRef}
      className={`subtitle-line ${isActive ? 'active' : ''}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="subtitle-time">
        {formatTime(subtitle.start)} - {formatTime(subtitle.end)}
      </div>
      <div className="subtitle-text">
        {subtitle.text.split('\n').map((line, idx) => (
          <div key={`line-${idx}-${line.substring(0, 10)}`}>{line}</div>
        ))}
      </div>
    </div>
  );
};

export default SubtitleLine;
