import type { SubtitlePanelProps } from '../types';
import SubtitleLine from './SubtitleLine';
import './SubtitlePanel.css';

const SubtitlePanel: React.FC<SubtitlePanelProps> = ({
  subtitles,
  currentTime,
  onSubtitleClick,
  onSubtitleSelectionChange,
  onDownloadSelected,
  onPreviewSelected,
  onSelectAll,
  onClearSelection,
  hideLettersEnabled = false,
  textTypingEnabled = false,
}) => {
  const timeInMs = currentTime * 1000;
  const selectedCount = subtitles.filter((subtitle) => subtitle.selected).length;
  const totalCount = subtitles.length;
  const allSelected = totalCount > 0 && selectedCount === totalCount;

  return (
    <div className="subtitle-panel">
      <div className="subtitle-panel-header">
        <h2>Subtitles</h2>
        <div className="subtitle-panel-actions">
          <button
            type="button"
            className="btn-action btn-preview"
            onClick={onPreviewSelected}
            disabled={selectedCount === 0}
            title={
              selectedCount === 0
                ? 'Select subtitles to preview'
                : `Preview ${selectedCount} selected subtitle${selectedCount > 1 ? 's' : ''}`
            }
          >
            Preview
          </button>
          <button
            type="button"
            className="btn-action btn-download"
            onClick={onDownloadSelected}
            disabled={selectedCount === 0}
            title={
              selectedCount === 0
                ? 'Select subtitles to download'
                : `Download ${selectedCount} selected subtitle${selectedCount > 1 ? 's' : ''}`
            }
          >
            Download
          </button>
        </div>
      </div>

      {subtitles.length > 0 && (
        <div className="subtitle-selection-controls">
          <div className="selection-info">
            {selectedCount > 0 ? (
              <span className="selection-count">
                {selectedCount} of {totalCount} selected
              </span>
            ) : (
              <span className="selection-count">No subtitles selected</span>
            )}
          </div>
          <div className="selection-buttons">
            <button
              type="button"
              className="btn-selection btn-select-all"
              onClick={onSelectAll}
              disabled={allSelected}
              title={allSelected ? 'All subtitles are already selected' : 'Select all subtitles'}
            >
              Select All
            </button>
            <button
              type="button"
              className="btn-selection btn-clear"
              onClick={onClearSelection}
              disabled={selectedCount === 0}
              title={selectedCount === 0 ? 'No subtitles to clear' : 'Clear all selections'}
            >
              Clear
            </button>
          </div>
        </div>
      )}

      <div className="subtitle-list">
        {subtitles.length > 0 ? (
          subtitles.map((subtitle, index) => {
            const isActive = timeInMs >= subtitle.start && timeInMs <= subtitle.end;
            return (
              <SubtitleLine
                key={`subtitle-${subtitle.start}-${subtitle.end}-${index}`}
                subtitle={subtitle}
                isActive={isActive}
                onClick={onSubtitleClick}
                onSelectionChange={(selected) => onSubtitleSelectionChange(index, selected)}
                hideLettersEnabled={hideLettersEnabled}
                textTypingEnabled={textTypingEnabled}
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
