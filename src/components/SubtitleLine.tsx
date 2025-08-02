import { useEffect, useRef } from 'react';
import type { SubtitleLineProps } from '../types';
import { convertLettersToUnderscores, revealTypedCharacters } from '../utils/textUtils';
import './SubtitleLine.css';

const SubtitleLine: React.FC<SubtitleLineProps> = ({
  subtitle,
  isActive,
  onClick,
  onSelectionChange,
  hideLettersEnabled = false,
  textTypingEnabled = false,
}) => {
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

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation(); // Prevent triggering the subtitle click
    onSelectionChange(event.target.checked);
  };

  return (
    <div
      ref={lineRef}
      className={`subtitle-line ${isActive ? 'active' : ''} ${subtitle.selected ? 'selected' : ''}`}
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
      <div className="subtitle-header">
        <div className="subtitle-time">
          {subtitle.index && <span className="subtitle-index">#{subtitle.index}</span>}
          {formatTime(subtitle.start)} - {formatTime(subtitle.end)}
        </div>
        <div className="subtitle-checkbox-container">
          <input
            type="checkbox"
            checked={subtitle.selected || false}
            onChange={handleCheckboxChange}
            className="subtitle-checkbox"
            aria-label={`Select subtitle ${subtitle.index || 'item'}`}
          />
        </div>
      </div>
      <div className="subtitle-text">
        {subtitle.text.split('\n').map((line, idx) => {
          let displayText: string;

          if (textTypingEnabled) {
            // In text typing mode, reveal typed characters with full context
            const typedText = subtitle.typedText || '';
            displayText = revealTypedCharacters(line, typedText, subtitle.text);
          } else if (hideLettersEnabled) {
            // Regular hide letters mode
            displayText = convertLettersToUnderscores(line);
          } else {
            // Normal display
            displayText = line;
          }

          return <div key={`line-${idx}-${line.substring(0, 10)}`}>{displayText}</div>;
        })}
      </div>
    </div>
  );
};

export default SubtitleLine;
