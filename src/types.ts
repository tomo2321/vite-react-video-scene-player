/**
 * Subtitle data structure for both SRT and VTT formats
 */
export interface Subtitle {
  /** Start time in milliseconds */
  start: number;
  /** End time in milliseconds */
  end: number;
  /** Subtitle text content */
  text: string;
  /** Optional subtitle index/sequence number */
  index?: number;
  /** Whether this subtitle is selected */
  selected?: boolean;
  /** Typed characters for text typing mode */
  typedText?: string;
  /** Whether there was a recent typing mistake (for visual feedback) */
  hasTypingMistake?: boolean;
}

/**
 * Props for the VideoPlayer component
 */
export interface VideoPlayerProps {
  /** Video file to be played */
  videoFile: File | null;
  /** Array of subtitle data */
  subtitles: Subtitle[];
  /** Current video time in seconds */
  currentTime: number;
  /** Callback when video time updates */
  onTimeUpdate: (time: number) => void;
  /** Callback to get video element reference */
  onVideoRef: (ref: HTMLVideoElement | null) => void;
  /** Whether auto-pause mode is enabled */
  autoPauseEnabled: boolean;
  /** Subtitle font size in rem units */
  subtitleFontSize: number;
  /** Trigger number to reset subtitle position (increment to trigger reset) */
  resetPositionTrigger?: number;
  /** Whether hide letters mode is enabled */
  hideLettersEnabled?: boolean;
  /** Whether text typing mode is enabled */
  textTypingEnabled?: boolean;
  /** Callback when correct letters are typed in typing mode */
  onTextTyped?: (subtitleIndex: number, typedText: string) => void;
  /** Callback when a typing mistake occurs */
  onTypingMistake?: (subtitleIndex: number) => void;
}

/**
 * Props for the SubtitlePanel component
 */
export interface SubtitlePanelProps {
  /** Array of subtitle data */
  subtitles: Subtitle[];
  /** Current video time in seconds */
  currentTime: number;
  /** Callback when subtitle is clicked */
  onSubtitleClick: (subtitle: Subtitle) => void;
  /** Callback when subtitle selection changes */
  onSubtitleSelectionChange: (subtitleIndex: number, selected: boolean) => void;
  /** Callback to download selected subtitles */
  onDownloadSelected: () => void;
  /** Callback to preview selected subtitles */
  onPreviewSelected: () => void;
  /** Callback to select all subtitles */
  onSelectAll: () => void;
  /** Callback to clear all selections */
  onClearSelection: () => void;
  /** Whether hide letters mode is enabled */
  hideLettersEnabled?: boolean;
  /** Whether text typing mode is enabled */
  textTypingEnabled?: boolean;
}

/**
 * Props for the FileUploader component
 */
export interface FileUploaderProps {
  /** Callback when video file is loaded */
  onVideoLoad: (file: File) => void;
  /** Callback when subtitle file is loaded and parsed */
  onSubtitlesLoad: (subtitles: Subtitle[]) => void;
}

/**
 * Props for individual SubtitleLine component
 */
export interface SubtitleLineProps {
  /** Subtitle data for this line */
  subtitle: Subtitle;
  /** Whether this subtitle is currently active */
  isActive: boolean;
  /** Callback when subtitle line is clicked */
  onClick: (subtitle: Subtitle) => void;
  /** Callback when checkbox is toggled */
  onSelectionChange: (selected: boolean) => void;
  /** Whether hide letters mode is enabled */
  hideLettersEnabled?: boolean;
  /** Whether text typing mode is enabled */
  textTypingEnabled?: boolean;
}

/**
 * Props for the PreviewModal component
 */
export interface PreviewModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Array of selected subtitles to preview */
  subtitles: Subtitle[];
}
