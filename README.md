# Video Scene Player

A React-based web application for interactive video playback with synchronized subtitle functionality and advanced language learning features. Load local video files and SRT or VTT subtitle files, then use powerful navigation shortcuts and typing practice modes for an enhanced learning experience.

## Features

### Core Video & Subtitle Features

- 📹 **Video Playback**: Load and play local video files (MP4, WebM, AVI, MOV)
- 📝 **Subtitle Support**: Parse and display SRT and VTT subtitle files with index numbers
- 🎯 **Interactive Navigation**: Click subtitle lines to jump to specific video scenes
- ⚙️ **Configurable Keyboard Shortcuts**: Customizable navigation shortcuts (default: Ctrl+R to replay, Ctrl+B for previous, Ctrl+N for next)
- ⏸️ **Auto-Pause Mode**: Toggle auto-pause to stop video at each subtitle end
- 🎬 **Subtitle Overlay**: Display subtitles overlaid on the video player with adjustable size
- 🖱️ **Draggable Subtitles**: Click and drag subtitles on the video to reposition them
- ⚙️ **Settings Panel**: Comprehensive settings with visual keyboard shortcut display
- 💾 **Persistent Settings**: All preferences saved automatically across sessions

### Advanced Language Learning Features

- 🔤 **Hide Letters Mode**: Convert letters to bullet points (•) for comprehension practice
  - Preserves first letter of each word, punctuation, and [bracketed] content
  - Smart preservation of speaker names and sound effects in brackets
- ⌨️ **Text Typing Mode**: Interactive typing practice with enhanced visual feedback
  - Letter-by-letter revelation as you type correctly
  - Target letter emphasis with pulsing yellow/amber highlight
  - Red blinking feedback for typing mistakes (600ms duration)
  - Smart detection of next typeable character
  - Automatic enabling of hide letters mode and auto-pause
  - Works seamlessly with keyboard navigation shortcuts
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⚡ **Real-time Sync**: Automatic highlighting of current subtitle based on video time

### Subtitle Management & Export

- ✅ **Subtitle Selection**: Check individual subtitles using checkboxes
- 🔢 **Index Display**: Show original subtitle index numbers from SRT files
- 🎨 **Visual Selection**: Selected subtitles highlighted in yellow
- 📄 **Preview Modal**: Preview selected subtitles in a clean modal interface
- 💾 **JSON Export**: Download selected subtitles as JSON files with metadata
- 📋 **Bulk Actions**: Select All and Clear All subtitle selections with one click
- 📊 **Selection Status**: Real-time display of selection count and feedback

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
4. **Settings Panel** (Optional): Click the "⚙️" settings button to access:
   - **Subtitle Size**: Adjust text size (0.8rem to 2.5rem)
   - **Position Reset**: Reset subtitle position to default center-bottom
   - **Hide Letters Mode**: Toggle for language learning practice
   - **Text Typing Mode**: Toggle for interactive typing practice
   - **Keyboard Shortcuts**: View current navigation shortcuts (Ctrl+R, Ctrl+B, Ctrl+N by default)
   - All preferences are automatically saved to localStorage

#### Interactive Playbook & Navigation

**Click Navigation:**

- Click any subtitle line in the right panel to jump to that scene
- **Drag subtitles** on the video to reposition them anywhere on screen
- The video will automatically play from the selected timestamp
- Current subtitle is highlighted both in the panel and overlaid on the video

**Keyboard Navigation (New!):**

- **Ctrl+R**: Replay current subtitle from start (works with auto-pause)
- **Ctrl+B**: Go to previous subtitle (works with auto-pause)
- **Ctrl+N**: Go to next subtitle (works with auto-pause)
- Navigation shortcuts work seamlessly with Text Typing Mode enabled
- Shortcuts are configurable and displayed in the settings panel

**Auto-Pause Behavior:**

- With auto-pause enabled: Video automatically pauses at the end of each subtitle
- With auto-pause enabled: Subtitles remain visible until the next subtitle starts
- With auto-pause enabled: Navigation shortcuts (Ctrl+R/Ctrl+B/Ctrl+N) reset pause tracking for smooth playback
- Manual navigation (clicking subtitles or using shortcuts) automatically resumes playback

#### Subtitle Selection and Export

1. **Select Subtitles**: Use checkboxes on the right of each subtitle line to select specific subtitles
2. **Bulk Selection**:
   - Click "Select All" to select all subtitles
   - Click "Clear" to deselect all subtitles
3. **Preview Selection**: Click the "Preview" button to view selected subtitles in a modal
4. **Export Selection**: Click the "Download" button to export selected subtitles as a JSON file
5. **Visual Feedback**: Selected subtitles are highlighted in yellow for easy identification

#### Hide Letters Mode for Language Learning

The Hide Letters Mode is perfect for language learning and comprehension practice:

1. **Enable the Feature**: In settings, toggle "Hide Letters Mode" on
2. **Text Conversion**: Letters are converted to bullet points (•) while preserving:
   - First letter of each word
   - All punctuation marks (periods, commas, semicolons, etc.)
   - Word spacing and structure
   - **Text between square brackets** [like speaker names or sound effects]
3. **Examples**:
   - "He is a soccer player." becomes "H• i• a s••••• p•••••."
   - "[Music] She loves dancing." becomes "[Music] S•• l•••• d••••••."
4. **Usage**: Try to guess the hidden words while listening to audio, then toggle off to check your answers

#### Text Typing Mode for Interactive Learning

The Text Typing Mode provides an interactive typing practice experience with enhanced visual feedback:

1. **Enable the Feature**: In settings, toggle "Text Typing Mode" on
   - This automatically enables Hide Letters Mode and Auto-Pause for optimal learning
2. **How It Works**:
   - Letters are hidden with bullet points (•), showing only first letters of words
   - **Text between square brackets [like this] is preserved unchanged**
   - As you type the correct letters on your keyboard, they are revealed in real-time
   - The video pauses at the end of each subtitle, giving you time to practice
3. **Enhanced Visual Feedback**:
   - **Target Letter Emphasis**: The next letter you need to type is highlighted with a bright yellow/amber background and pulses with animation
   - **Mistake Feedback**: When you type an incorrect letter, the subtitle background blinks red for 0.6 seconds
   - A blue indicator shows "Text Typing Mode Active" with progress
   - Progress counter shows how many letters you've typed vs. total letters
4. **Navigation Integration**:
   - **Seamless with Shortcuts**: Use Ctrl+R to replay current subtitle, Ctrl+B for previous, Ctrl+N for next while typing
   - **No Conflicts**: Navigation shortcuts use modifier keys, so typing 'r', 'b', and 'n' letters works normally
   - **Smart Auto-Pause**: Navigation shortcuts properly reset auto-pause tracking for smooth learning flow
5. **Usage Tips**:
   - Focus on the video player area for keyboard input to work
   - Only letters and numbers are recognized for typing
   - Type at your own pace - there's no time limit
   - Use Ctrl+R to replay difficult subtitles for extra practice
   - Use Ctrl+B to go back to previous subtitles for review
   - Use Ctrl+N to skip to the next subtitle when ready
   - Use this mode to improve spelling, vocabulary, and listening comprehension

**Visual Design Features:**

- **Target Letter**: Yellow/amber background (`rgba(255, 193, 7, 0.8)`) with pulsing animation that scales from 1x to 1.1x
- **Typing Mistake**: Red blinking background (`rgba(220, 53, 69, 0.8)`) that transitions smoothly back to normal
- **Smart Detection**: Only actual letters are emphasized (not spaces or punctuation)

**Note**: When Text Typing Mode is enabled, the regular Hide Letters Mode toggle is disabled since typing mode manages letter visibility automatically.

#### Keyboard Shortcuts

**Navigation Shortcuts (Configurable):**

- **Ctrl+R** (default): Replay current subtitle from start
  - Works in all modes (normal playback, auto-pause, text typing)
  - Properly resets auto-pause tracking for seamless learning
  - Console logs the action for debugging/feedback
- **Ctrl+B** (default): Go to previous subtitle
  - Jumps to the beginning of the previous subtitle
  - Works in all modes without interfering with text typing
  - Automatically plays the video from the previous subtitle start time
  - Provides feedback when already at the first subtitle
- **Ctrl+N** (default): Go to next subtitle
  - Jumps to the beginning of the next subtitle
  - Works in all modes without interfering with text typing
  - Automatically plays the video from the next subtitle start time

**Text Typing Mode Shortcuts:**

- **Letter keys (A-Z, 0-9)**: Type characters to reveal letters progressively
- **Ctrl+R**: Replay current subtitle for extra practice (typing progress is preserved)
- **Ctrl+B**: Go to previous subtitle for review (typing progress resets for previous subtitle)
- **Ctrl+N**: Move to next subtitle when ready (typing progress resets for new subtitle)

**General Application Shortcuts:**

- **Escape**: Close settings panel or modals if open
- **Enter or Space**: Activate focused subtitle line (when using keyboard navigation)
- **Tab**: Navigate between interactive elements (accessibility support)

**Focus and Input Areas:**

- **Click on video**: Focus the video player area for keyboard input
- **Input fields**: Navigation shortcuts are disabled when typing in input/textarea elements
- **Global listening**: Keyboard navigation works from anywhere in the application

> **Key Benefits**: The default Ctrl+R, Ctrl+B, and Ctrl+N shortcuts work seamlessly with Text Typing Mode, allowing you to practice typing letters while using navigation shortcuts without any conflicts. This design follows standard application shortcut conventions and provides a professional user experience.

### Supported Formats

- **Video**: MP4, WebM, AVI, MOV, and other formats supported by HTML5 video
- **Subtitles**: SRT (SubRip Text) and VTT (WebVTT) formats
- **Export**: JSON format for selected subtitles

## Technology Stack

- **React 18** - UI framework with hooks and state management
- **TypeScript** - Type safety with comprehensive interfaces for shortcuts, subtitles, and components
- **Vite** - Fast build tool and development server with hot module replacement
- **Biome** - Fast linter and formatter for JavaScript/TypeScript
- **Custom Parsers** - Manual SRT and VTT subtitle parsing with index extraction and error handling
- **CSS3** - Modern styling with:
  - Keyframe animations (target letter emphasis, mistake feedback)
  - Responsive design with mobile-first approach
  - Smooth transitions and visual feedback effects
  - Custom styled keyboard shortcut displays
- **localStorage** - Persistent user settings storage for:
  - Keyboard shortcuts configuration
  - Text typing preferences
  - Hide letters mode settings
  - Subtitle font size and position
  - Auto-pause preferences
- **Browser APIs** - HTML5 Video API, File API, Keyboard Events, Mouse Events
- **Custom State Management** - React hooks with TypeScript for complex state interactions

## Project Structure

```
src/
├── components/
│   ├── VideoPlayer.tsx       # Video player with subtitle overlay and enhanced typing feedback
│   ├── SubtitlePanel.tsx     # Subtitle list panel with selection controls
│   ├── SubtitleLine.tsx      # Individual subtitle entry with checkbox
│   ├── PreviewModal.tsx      # Modal for previewing selected subtitles
│   ├── ResizableSplitter.tsx # Resizable panel splitter
│   └── FileUploader.tsx      # File upload interface with enhanced parsing
├── utils/
│   └── textUtils.ts          # Text processing utilities (hide letters mode, typing emphasis)
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
- **Hide Letters Mode** - Convert letters to bullet points for language learning practice
- **Text Typing Mode** - Interactive typing practice with real-time letter revelation
- **Enhanced Text Typing Features** - Target letter emphasis with pulsing animation and red blinking feedback for typing mistakes
- **Bracket preservation** - Text between [brackets] remains unchanged in language learning modes

#### 🚀 Future Enhancement Ideas

- Support for additional subtitle formats (ASS, SUB)
- Video playback speed controls
- Subtitle text search functionality
- Multiple difficulty levels for Hide Letters Mode (hide more/fewer letters)
- **Keyboard shortcuts for navigation** - Enhanced with Ctrl+R (replay), Ctrl+B (previous), Ctrl+N (next) functionality
- Loop mode for current subtitle
- Export functionality for edited subtitles (SRT/VTT)
- Subtitle timing adjustment tools
- Theme customization (dark/light mode)
- Multiple subtitle track support
- Cloud storage integration
- Collaborative subtitle editing
- Word-by-word reveal mode for text typing
- Typing speed metrics and progress tracking
- Custom bracket notation support (e.g., parentheses, curly braces)

## API Reference

### Subtitle Object Structure

```typescript
interface Subtitle {
  start: number; // Start time in milliseconds
  end: number; // End time in milliseconds
  text: string; // Subtitle text content
  index?: number; // Original subtitle index from file
  selected?: boolean; // Selection state for export/preview
  typedText?: string; // Typed characters for text typing mode
  hasTypingMistake?: boolean; // Whether there was a recent typing mistake (for visual feedback)
}
```

### Text Utilities

#### convertLettersToUnderscores(text: string): string

Converts letters to bullet points while preserving word structure, punctuation, and text between square brackets for language learning.

**Example:**

```typescript
import { convertLettersToUnderscores } from "./utils/textUtils";

convertLettersToUnderscores("He is a soccer player.");
// Returns: "H• i• a s••••• p•••••."

convertLettersToUnderscores("[Music] She loves dancing.");
// Returns: "[Music] S•• l•••• d••••••."
```

**Features:**

- Preserves first letter of each word
- Maintains all punctuation marks
- Keeps word boundaries and spacing
- **Preserves text between square brackets unchanged**
- Perfect for language learning exercises

#### extractLettersOnly(text: string): string

Extracts only the letters (no spaces or punctuation) from text for typing comparison. Text between square brackets is excluded.

**Example:**

```typescript
import { extractLettersOnly } from "./utils/textUtils";

extractLettersOnly("Hello world!");
// Returns: "helloworld"

extractLettersOnly("[Music] Hello world!");
// Returns: "helloworld" (brackets content excluded)
```

#### revealTypedCharacters(originalText: string, typedText: string, fullOriginalText?: string): string

Reveals typed characters in text while hiding untyped letters. Used for text typing mode.

**Example:**

```typescript
import { revealTypedCharacters } from "./utils/textUtils";

revealTypedCharacters("Hello world!", "hell");
// Returns: "Hell• w••••!"

revealTypedCharacters("[Music] Hello world!", "hell");
// Returns: "[Music] Hell• w••••!" (brackets preserved)
```

#### revealTypedCharactersWithEmphasis(originalText: string, typedText: string, fullOriginalText?: string): Array<{ text: string; isTarget: boolean }>

Enhanced version that returns text segments with emphasis information for target letter highlighting.

**Example:**

```typescript
import { revealTypedCharactersWithEmphasis } from "./utils/textUtils";

const segments = revealTypedCharactersWithEmphasis("Hello", "hel");
// Returns: [
//   { text: "H", isTarget: false },
//   { text: "e", isTarget: false },
//   { text: "l", isTarget: false },
//   { text: "l", isTarget: true },  // Next target letter
//   { text: "o", isTarget: false }
// ]
```

### Enhanced Text Typing Mode Implementation

The enhanced text typing mode includes sophisticated visual feedback:

#### Target Letter Detection

- **Function**: `revealTypedCharactersWithEmphasis()` returns text segments with emphasis information
- **Detection Logic**: Compares current typed text length with expected letter position
- **Visual Effect**: Target letters receive `.target-letter` CSS class with pulsing animation

#### Mistake Detection and Feedback

- **Detection**: Enhanced keyboard event handler compares typed key with expected character
- **State Management**: Mistake state stored in subtitle data with `hasTypingMistake` property
- **Visual Effect**: Subtitle overlay receives `.typing-mistake` CSS class with red blinking animation
- **Auto-Reset**: Mistake state automatically cleared after 600ms animation duration

#### CSS Classes and Animations

**Target Letter Emphasis:**

```css
.target-letter {
  background-color: rgba(255, 193, 7, 0.8); /* Amber/yellow */
  color: #000;
  font-weight: bold;
  padding: 2px 4px;
  border-radius: 3px;
  animation: pulse-target 1.5s ease-in-out infinite;
}
```

**Typing Mistake Feedback:**

```css
.subtitle-overlay.typing-mistake {
  animation: blink-red 0.6s ease-in-out;
}
```

**Technical Features:**

- Smart bracket preservation (text between [brackets] excluded from typing)
- Real-time progress tracking with visual indicators
- Automatic state reset when toggling typing mode
- Performance-optimized rendering with proper React keys

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

## Troubleshooting

### Common Issues

**Keyboard shortcuts (Ctrl+R, Ctrl+B, Ctrl+N) not working:**

- Ensure you're not typing in an input field or textarea
- Make sure to use the Ctrl key along with R, B, or N (not just the letters alone)
- Check that the video and subtitles are loaded
- Verify there's a current active subtitle for replay functionality
- For previous/next navigation, ensure you're not at the first/last subtitle respectively
- Check browser console for any error messages

**Text Typing Mode not responding to keyboard input:**

- Ensure the video player area has focus by clicking on it
- Check that Text Typing Mode is enabled in settings
- Verify that your browser supports keyboard events
- Note: Navigation shortcuts (Ctrl+R, Ctrl+B, Ctrl+N) should still work while in Text Typing Mode

**Keyboard shortcuts conflicting with text typing:**

- This should not happen with the default Ctrl+R, Ctrl+B, and Ctrl+N shortcuts
- If you experience issues, try clicking away from any input fields
- The application is designed so that modifier key shortcuts don't interfere with letter typing

**Target letter not highlighting or mistake feedback not showing:**

- Confirm that Text Typing Mode is enabled (not just Hide Letters Mode)
- Make sure you're typing letters/numbers (special characters are ignored)
- Check that the subtitle contains typeable content (not just punctuation or brackets)
- Verify that you're typing the correct next letter in sequence

**Navigation shortcuts not replaying/advancing properly:**

- Check that auto-pause mode is enabled for best experience with navigation shortcuts
- Ensure there are multiple subtitles loaded for next subtitle functionality
- Console will log navigation actions - check browser dev tools for feedback

**Subtitles not displaying properly:**

- Check that the subtitle file format is SRT or VTT
- Ensure subtitle timing matches video duration
- Verify subtitle file encoding is UTF-8

**Video not loading:**

- Confirm video format is supported (MP4, WebM, AVI, MOV)
- Check that the video file is not corrupted
- Try a different video file to isolate the issue

**Bracket preservation not working:**

- Ensure brackets are properly closed: `[text]` not `[text`
- Check that there are no nested brackets within the same line

### Performance Tips

- For large subtitle files (1000+ entries), consider splitting into smaller files
- Use modern video formats (MP4 H.264) for better browser compatibility
- Close other browser tabs when working with large video files

## Accessibility

The application includes comprehensive accessibility features:

- Keyboard navigation support
- Screen reader compatibility
- Proper ARIA labels and roles
- Focus management for modals
- Accessible color contrast ratios

## License

MIT License
