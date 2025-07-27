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
}
