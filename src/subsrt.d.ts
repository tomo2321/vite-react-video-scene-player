declare module 'subsrt' {
  export interface SubtitleEntry {
    start: number;
    end: number;
    text: string;
  }

  export function parse(srtContent: string): SubtitleEntry[];
  export function build(subtitles: SubtitleEntry[]): string;
}
