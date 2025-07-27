import type { SubtitlePanelProps } from '../types';
import SubtitleLine from './SubtitleLine';
import './SubtitlePanel.css';

const SubtitlePanel: React.FC<SubtitlePanelProps> = ({
  subtitles,
  currentTime,
  onSubtitleClick
}) => {
  const timeInMs = currentTime * 1000;

  return (
    <div className="subtitle-panel">
      <h2>Subtitles</h2>
      <div className="subtitle-list">
        {subtitles.length > 0 ? (
          subtitles.map((subtitle, index) => {
            const isActive = timeInMs >= subtitle.start && timeInMs <= subtitle.end;
            return (
              <SubtitleLine
                key={index}
                subtitle={subtitle}
                isActive={isActive}
                onClick={onSubtitleClick}
              />
            );
          })
        ) : (
          <p className="no-subtitles">No subtitles loaded</p>
        )}
      </div>
    </div>
  );
};

export default SubtitlePanel;
