export interface Subtitle {
  start: number;
  end: number;
  text: string;
  index?: number;
}

export interface VideoPlayerProps {
  videoFile: File | null;
  subtitles: Subtitle[];
  currentTime: number;
  onTimeUpdate: (time: number) => void;
  onVideoRef: (ref: HTMLVideoElement | null) => void;
  autoPauseEnabled: boolean;
}

export interface SubtitlePanelProps {
  subtitles: Subtitle[];
  currentTime: number;
  onSubtitleClick: (subtitle: Subtitle) => void;
}

export interface FileUploaderProps {
  onVideoLoad: (file: File) => void;
  onSubtitlesLoad: (subtitles: Subtitle[]) => void;
}

export interface SubtitleLineProps {
  subtitle: Subtitle;
  isActive: boolean;
  onClick: (subtitle: Subtitle) => void;
}
