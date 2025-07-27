# Video Scene Player

A React-based web application for interactive video playback with synchronized subtitle functionality. Load local video files and SRT or VTT subtitle files, then click on subtitle lines to jump to corresponding video scenes. Enhanced with subtitle selection, export, and preview capabilities.

## Features

### Core Functionality

- 📹 **Video Playback**: Load and play local video files
- 📝 **Subtitle Support**: Parse and display SRT and VTT subtitle files with index numbers
- 🎯 **Interactive Navigation**: Click subtitle lines to jump to specific video scenes
- ⏸️ **Auto-Pause Mode**: Toggle auto-pause to stop video at each subtitle end
- 🎬 **Subtitle Overlay**: Display subtitles overlaid on the video player with adjustable size
- 🖱️ **Draggable Subtitles**: Click and drag subtitles on the video to reposition them
- ⚙️ **Settings Panel**: Customize subtitle appearance with easy-to-use controls
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⚡ **Real-time Sync**: Automatic highlighting of current subtitle based on video time
- 💾 **Persistent Settings**: User preferences saved automatically across sessions

### Subtitle Management

- ✅ **Subtitle Selection**: Check individual subtitles using checkboxes
- 🔢 **Index Display**: Show original subtitle index numbers from SRT files
- 🎨 **Visual Selection**: Selected subtitles highlighted in yellow
- 📄 **Preview Modal**: Preview selected subtitles in a clean modal interface
- 💾 **JSON Export**: Download selected subtitles as JSON files
- 📋 **Bulk Actions**: Select All and Clear All subtitle selections
- 📊 **Selection Status**: Real-time display of selection count

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd vite-react-video-scene-player
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Usage

#### Basic Video and Subtitle Loading

1. **Load a Video**: Click the "📹 Load Video" button to select a local video file (MP4, WebM, AVI, etc.)
2. **Load Subtitle**: Click the "📝 Load Subtitle" button to select an SRT or VTT subtitle file
3. **Auto-Pause Mode** (Optional): Toggle the "⏸️ Auto-pause" button to enable/disable automatic pausing at subtitle end times
4. **Settings** (Optional): Click the "⚙️" settings button to:
   - Adjust subtitle text size (0.8rem to 2.5rem)
   - Reset subtitle position to default
   - Preferences are automatically saved

#### Interactive Playback

- Click any subtitle line in the right panel to jump to that scene
- **Drag subtitles** on the video to reposition them anywhere on screen
- The video will automatically play from the selected timestamp
- Current subtitle is highlighted both in the panel and overlaid on the video
- With auto-pause enabled: Video automatically pauses at the end of each subtitle
- With auto-pause enabled: Subtitles remain visible until the next subtitle starts
- With auto-pause enabled: Clicking a subtitle jumps to that scene and continues playing until the subtitle ends

#### Subtitle Selection and Export

1. **Select Subtitles**: Use checkboxes on the right of each subtitle line to select specific subtitles
2. **Bulk Selection**:
   - Click "Select All" to select all subtitles
   - Click "Clear" to deselect all subtitles
3. **Preview Selection**: Click the "Preview" button to view selected subtitles in a modal
4. **Export Selection**: Click the "Download" button to export selected subtitles as a JSON file
5. **Visual Feedback**: Selected subtitles are highlighted in yellow for easy identification

### Supported Formats

- **Video**: MP4, WebM, AVI, MOV, and other formats supported by HTML5 video
- **Subtitles**: SRT (SubRip Text) and VTT (WebVTT) formats
- **Export**: JSON format for selected subtitles

## Technology Stack

- **React 18** - UI framework with hooks and state management
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Biome** - Fast linter and formatter for JavaScript/TypeScript
- **Custom Parsers** - Manual SRT and VTT subtitle parsing with index extraction
- **CSS3** - Modern styling with animations and responsive design
- **localStorage** - Persistent user settings storage

## Project Structure

```
src/
├── components/
│   ├── VideoPlayer.tsx       # Video player with subtitle overlay
│   ├── SubtitlePanel.tsx     # Subtitle list panel with selection controls
│   ├── SubtitleLine.tsx      # Individual subtitle entry with checkbox
│   ├── PreviewModal.tsx      # Modal for previewing selected subtitles
│   ├── ResizableSplitter.tsx # Resizable panel splitter
│   └── FileUploader.tsx      # File upload interface with enhanced parsing
├── types.ts                  # TypeScript type definitions
├── App.tsx                  # Main application component
└── main.tsx                 # Application entry point
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run Biome linter
- `npm run lint:fix` - Run Biome linter with auto-fix

### Code Quality

The project uses Biome for linting and formatting:

- Enforces consistent code style
- Accessibility best practices (a11y rules)
- TypeScript best practices
- React best practices

### Adding Features

The application is designed to be extensible. Recent implementations and future ideas:

#### ✅ Recently Implemented

- **Auto-pause mode** - Automatically pause at subtitle end times
- **VTT support** - Support for WebVTT subtitle format
- **Settings panel** - Adjustable subtitle text size with persistent storage
- **Extended subtitle display** - Subtitles remain visible during auto-pause
- **Draggable subtitles** - Click and drag to reposition subtitles
- **Subtitle selection** - Checkbox-based selection system
- **Index numbers** - Display original subtitle indices from files
- **Preview modal** - Clean preview interface for selected subtitles
- **JSON export** - Download selected subtitles as JSON
- **Bulk actions** - Select All and Clear All functionality
- **Visual feedback** - Yellow highlighting for selected subtitles

#### 🚀 Future Enhancement Ideas

- Support for additional subtitle formats (ASS, SUB)
- Video playback speed controls
- Subtitle text search functionality
- Keyboard shortcuts for navigation
- Loop mode for current subtitle
- Export functionality for edited subtitles (SRT/VTT)
- Subtitle timing adjustment tools
- Theme customization (dark/light mode)
- Multiple subtitle track support
- Cloud storage integration
- Collaborative subtitle editing

## API Reference

### Subtitle Object Structure

```typescript
interface Subtitle {
  start: number; // Start time in milliseconds
  end: number; // End time in milliseconds
  text: string; // Subtitle text content
  index?: number; // Original subtitle index from file
  selected?: boolean; // Selection state for export/preview
}
```

### Export Format

Selected subtitles are exported as JSON with the following structure:

```json
[
  {
    "start": 1000,
    "end": 3000,
    "text": "Hello, world!",
    "index": 1,
    "selected": true
  }
]
```

## Browser Compatibility

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Accessibility

The application includes comprehensive accessibility features:

- Keyboard navigation support
- Screen reader compatibility
- Proper ARIA labels and roles
- Focus management for modals
- Accessible color contrast ratios

## License

MIT License
