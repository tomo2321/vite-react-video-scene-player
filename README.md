# Vi## Features

- 📹 **Video Playback**: Load and play local video files
- 📝 **Subtitle Support**: Parse### Adding Features

The application is designed to be extensible. Some ideas for enhancement:

- ✅ **Auto-pause mode** - Implemented! Automatically pause at subtitle end times
- ✅ **VTT support** - Implemented! Support for WebVTT subtitle format
- ✅ **Settings panel** - Implemented! Adjustable subtitle text size with persistent storage
- ✅ **Extended subtitle display** - Implemented! Subtitles remain visible during auto-pause
- Support for additional subtitle formats (ASS, SUB)
- Video playback speed controls
- Subtitle text search functionality
- Keyboard shortcuts for navigation
- Loop mode for current subtitle
- Export functionality for edited subtitles
- Subtitle timing adjustment tools
- Theme customization (dark/light mode)
- Subtitle position adjustment
- Multiple subtitle track supportSRT and VTT subtitle files
- 🎯 **Interactive Navigation**: Click subtitle lines to jump to specific video scenes
- ⏸️ **Auto-Pause Mode**: Toggle auto-pause to stop video at each subtitle end
- 🎬 **Subtitle Overlay**: Display subtitles overlaid on the video player with adjustable size
- ⚙️ **Settings Panel**: Customize subtitle appearance with easy-to-use controls
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⚡ **Real-time Sync**: Automatic highlighting of current subtitle based on video time
- 💾 **Persistent Settings**: User preferences saved automatically across sessions Player

A React-based web application for interactive video playback with synchronized subtitle functionality. Load local video files and SRT or VTT subtitle files, then click on subtitle lines to jump to corresponding video scenes.

## Features

- 📹 **Video Playback**: Load and play local video files
- 📝 **Subtitle Support**: Parse and display SRT and VTT subtitle files
- 🎯 **Interactive Navigation**: Click subtitle lines to jump to specific video scenes
- ⏸️ **Auto-Pause Mode**: Toggle auto-pause to stop video at each subtitle transition
- 🎬 **Subtitle Overlay**: Display subtitles overlaid on the video player
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⚡ **Real-time Sync**: Automatic highlighting of current subtitle based on video time

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

1. **Load a Video**: Click the "📹 Load Video" button to select a local video file (MP4, WebM, AVI, etc.)
2. **Load Subtitle**: Click the "📝 Load Subtitle" button to select an SRT or VTT subtitle file
3. **Auto-Pause Mode** (Optional): Toggle the "⏸️ Auto-pause" button to enable/disable automatic pausing at subtitle end times
4. **Settings** (Optional): Click the "⚙️" settings button to:
   - Adjust subtitle text size (0.8rem to 2.5rem)
   - Preferences are automatically saved
5. **Interactive Playback**:
   - Click any subtitle line in the right panel to jump to that scene
   - The video will automatically play from the selected timestamp
   - Current subtitle is highlighted both in the panel and overlaid on the video
   - With auto-pause enabled: Video automatically pauses at the end of each subtitle
   - With auto-pause enabled: Subtitles remain visible until the next subtitle starts
   - With auto-pause enabled: Clicking a subtitle jumps to that scene and continues playing until the subtitle ends

### Supported Formats

- **Video**: MP4, WebM, AVI, MOV, and other formats supported by HTML5 video
- **Subtitles**: SRT (SubRip Text) and VTT (WebVTT) formats

## Technology Stack

- **React 18** - UI framework with hooks and state management
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Custom Parsers** - Manual SRT and VTT subtitle parsing
- **CSS3** - Modern styling with animations and responsive design
- **localStorage** - Persistent user settings storage

## Project Structure

```
src/
├── components/
│   ├── VideoPlayer.tsx    # Video player with subtitle overlay
│   ├── SubtitlePanel.tsx  # Subtitle list panel
│   ├── SubtitleLine.tsx   # Individual subtitle entry
│   └── FileUploader.tsx   # File upload interface
├── types.ts               # TypeScript type definitions
├── App.tsx               # Main application component
└── main.tsx              # Application entry point
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding Features

The application is designed to be extensible. Some ideas for enhancement:

- ✅ **Auto-pause mode** - Implemented! Automatically pause at subtitle transitions
- ✅ **VTT support** - Implemented! Support for WebVTT subtitle format
- Support for additional subtitle formats (ASS, SUB)
- Video playback speed controls
- Subtitle text search functionality
- Keyboard shortcuts for navigation
- Loop mode for current subtitle
- Export functionality for edited subtitles
- Subtitle timing adjustment tools

## Browser Compatibility

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## License

MIT License

````

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
````
