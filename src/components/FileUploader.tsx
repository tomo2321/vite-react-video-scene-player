import { useRef } from 'react';
import type { FileUploaderProps, Subtitle } from '../types';
import './FileUploader.css';

const FileUploader: React.FC<FileUploaderProps> = ({
  onVideoLoad,
  onSubtitlesLoad
}) => {
  const videoInputRef = useRef<HTMLInputElement>(null);
  const subtitleInputRef = useRef<HTMLInputElement>(null);

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      onVideoLoad(file);
    } else {
      alert('Please select a valid video file');
    }
  };

  const handleSubtitleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const text = await file.text();
        
        // Clean up the text before parsing
        const cleanText = text
          .replace(/\r\n/g, '\n')  // Normalize line endings
          .replace(/\r/g, '\n')    // Handle old Mac line endings
          .trim();
        
        console.log('Raw SRT content:', cleanText.substring(0, 500)); // Debug log
        
        // Use manual parsing for better control
        const parsed = manualSrtParse(cleanText);
        
        console.log('Parsed subtitles:', parsed); // Debug log
        
        if (!parsed || parsed.length === 0) {
          throw new Error('No subtitles found in file');
        }
        
        const subtitles: Subtitle[] = parsed.map((item, index: number) => ({
          start: item.start,
          end: item.end,
          text: cleanSubtitleText(item.text),
          index
        }));
        
        console.log('Final subtitles:', subtitles); // Debug log
        onSubtitlesLoad(subtitles);
      } catch (error) {
        console.error('Error parsing subtitle file:', error);
        alert(`Error parsing subtitle file: ${error instanceof Error ? error.message : 'Unknown error'}. Please check the file format.`);
      }
    }
  };

  const manualSrtParse = (content: string) => {
    const subtitles = [];
    
    // Split by double newlines to separate subtitle blocks
    const blocks = content.split(/\n\s*\n/);
    
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i].trim();
      if (!block) continue;
      
      const lines = block.split('\n');
      if (lines.length < 3) continue;
      
      // First line should be sequence number
      const sequenceNumber = lines[0].trim();
      if (!/^\d+$/.test(sequenceNumber)) continue;
      
      // Second line should be timecode
      const timecodeLine = lines[1].trim();
      const timecodeMatch = timecodeLine.match(/(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})/);
      
      if (!timecodeMatch) continue;
      
      const [, h1, m1, s1, ms1, h2, m2, s2, ms2] = timecodeMatch;
      const start = (parseInt(h1) * 3600 + parseInt(m1) * 60 + parseInt(s1)) * 1000 + parseInt(ms1);
      const end = (parseInt(h2) * 3600 + parseInt(m2) * 60 + parseInt(s2)) * 1000 + parseInt(ms2);
      
      // Remaining lines are the subtitle text
      const textLines = lines.slice(2).filter(line => line.trim());
      const text = textLines.join('\n');
      
      if (text) {
        subtitles.push({
          start,
          end,
          text
        });
      }
    }
    
    console.log(`Parsed ${subtitles.length} subtitle entries`);
    return subtitles;
  };

  const cleanSubtitleText = (text: string): string => {
    if (!text) return '';
    
    return text
      // Remove HTML tags
      .replace(/<[^>]*>/g, '')
      // Replace common SRT formatting
      .replace(/\{[^}]*\}/g, '')  // Remove {formatting}
      .replace(/\\N/g, '\n')      // Replace \N with newlines
      .replace(/\\n/g, '\n')      // Replace \n with newlines
      // Handle special characters
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      // Clean up multiple spaces but preserve intentional line breaks
      .replace(/[ \t]+/g, ' ')    // Multiple spaces/tabs to single space
      .replace(/\n +/g, '\n')     // Remove spaces at start of lines
      .replace(/ +\n/g, '\n')     // Remove spaces at end of lines
      .replace(/\n{3,}/g, '\n\n') // Max 2 consecutive newlines
      .trim();
  };

  const triggerVideoUpload = () => {
    videoInputRef.current?.click();
  };

  const triggerSubtitleUpload = () => {
    subtitleInputRef.current?.click();
  };

  return (
    <div className="file-uploader">
      <div className="upload-section">
        <button onClick={triggerVideoUpload} className="upload-button">
          📹 Load Video
        </button>
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          style={{ display: 'none' }}
        />
      </div>

      <div className="upload-section">
        <button onClick={triggerSubtitleUpload} className="upload-button">
          📝 Load Subtitles
        </button>
        <input
          ref={subtitleInputRef}
          type="file"
          accept=".srt,.vtt"
          onChange={handleSubtitleChange}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default FileUploader;
