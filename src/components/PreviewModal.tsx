import { useEffect } from 'react';
import type { PreviewModalProps } from '../types';
import './PreviewModal.css';

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, subtitles }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const formatTime = (timeMs: number) => {
    const seconds = Math.floor(timeMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div
      className="preview-modal-overlay"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClose();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Close modal"
    >
      <div
        className="preview-modal-content"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="preview-modal-title"
      >
        <div className="preview-modal-header">
          <h2 id="preview-modal-title">Selected Subtitles Preview</h2>
          <button type="button" className="preview-modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="preview-modal-body">
          {subtitles.length === 0 ? (
            <p className="no-selection">No subtitles selected for preview</p>
          ) : (
            <div className="preview-subtitle-list">
              {subtitles.map((subtitle, index) => (
                <div
                  key={`preview-${subtitle.start}-${subtitle.end}-${index}`}
                  className="preview-subtitle-item"
                >
                  <div className="preview-subtitle-info">
                    {subtitle.index && (
                      <span className="preview-subtitle-index">#{subtitle.index}</span>
                    )}
                    <span className="preview-subtitle-time">
                      {formatTime(subtitle.start)} - {formatTime(subtitle.end)}
                    </span>
                  </div>
                  <div className="preview-subtitle-text">
                    {subtitle.text.split('\n').map((line, lineIndex) => (
                      <div
                        key={`${subtitle.start}-${subtitle.end}-line-${lineIndex}-${line.slice(0, 10)}`}
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="preview-modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
