# Video Scene Player - Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is a React + TypeScript + Vite web application for interactive video playback with synchronized subtitle functionality and advanced language learning features.

## Key Features

### Core Video & Subtitle Features

- Load local video files (MP4, WebM, AVI, MOV) and subtitle files (SRT, VTT)
- Display video player on the left and subtitle panel on the right (responsive layout)
- Click subtitle lines to jump to matched video scenes with audio playback
- **Configurable Keyboard Shortcuts**: Default Ctrl+R (replay current subtitle) and Ctrl+N (next subtitle)
- Overlay subtitles on the video player with draggable positioning
- Auto-pause mode that stops video at the end of each subtitle
- Synchronized video-subtitle interaction with precise timing

### Advanced Learning Features

- **Hide Letters Mode**: Convert letters to bullet points (•) for language learning while preserving first letters, punctuation, and [bracketed] content
- **Text Typing Mode**: Interactive typing practice with enhanced visual feedback
  - Target letter emphasis with pulsing yellow/amber highlight
  - Red blinking feedback for typing mistakes
  - Letter-by-letter revelation as users type correctly
  - Automatic mistake detection and visual response
  - **Seamless Navigation Integration**: Works perfectly with Ctrl+R/Ctrl+N shortcuts without conflicts
- **Keyboard Navigation**: Configurable shortcuts with modifier keys to avoid text typing conflicts
- **Bracket Preservation**: Text between square brackets [like speaker names] is never hidden
- **Subtitle Selection**: Checkbox-based selection system for export and preview
- **Settings Panel**: Comprehensive settings including keyboard shortcut display and configuration
- **Persistent Settings**: All preferences including keyboard shortcuts saved to localStorage

### UI/UX Features

- Resizable panels with splitter component
- Mobile-responsive design
- Preview modal for selected subtitles
- JSON export functionality for selected subtitles
- Visual feedback with highlighting and progress indicators
- **Keyboard Shortcut Display**: Styled kbd elements showing current shortcuts in settings panel

## Architecture Guidelines

- Use React functional components with hooks (no class components)
- TypeScript for strict type safety with proper interfaces
- Modular component structure with single responsibility principle
- State management using React useState and useEffect hooks
- Custom utility functions for text processing and subtitle parsing
- CSS modules or component-specific CSS files
- Responsive design with mobile-first approach
- Accessibility-first development (ARIA labels, keyboard navigation)
- Performance optimization for large subtitle files
- localStorage for persistent user settings

## Key Components

### Core Components

- `App.tsx`: Main application component with state management and layout
- `VideoPlayer.tsx`: Video display with subtitle overlay, dragging, and typing event handling
- `SubtitlePanel.tsx`: Right-side panel with subtitle list and bulk actions
- `SubtitleLine.tsx`: Individual subtitle entry with checkbox and text rendering
- `FileUploader.tsx`: File upload interface for video and subtitle files
- `PreviewModal.tsx`: Modal for previewing selected subtitles
- `ResizableSplitter.tsx`: Draggable splitter for panel resizing

### Utility Files

- `types.ts`: TypeScript interfaces and type definitions
- `utils/textUtils.ts`: Text processing functions for language learning modes
  - `convertLettersToUnderscores()`: Hide letters with bullet points
  - `revealTypedCharacters()`: Progressive letter revelation for typing mode
  - `revealTypedCharactersWithEmphasis()`: Enhanced typing with target letter emphasis
  - `extractLettersOnly()`: Extract typeable characters (excluding bracketed content)

## Important State Management

### Core Application State

- `videoFile`: Currently loaded video file
- `subtitles`: Array of parsed subtitle objects with timing and text
- `currentTime`: Current video playback time in seconds
- `videoRef`: Reference to HTML video element

### UI State

- `leftPanelWidth`: Percentage width of video panel (resizable)
- `isMobile`: Boolean for responsive layout switching
- `showSettings`: Settings panel visibility

### Feature State

- `autoPauseEnabled`: Auto-pause mode toggle
- `hideLettersEnabled`: Hide letters mode for language learning
- `textTypingEnabled`: Interactive typing mode
- `subtitleFontSize`: User-adjustable subtitle size
- `subtitlePosition`: Draggable subtitle position on video
- `keyboardShortcuts`: Configurable keyboard shortcuts (default: Ctrl+R replay, Ctrl+N next)

### Selection State

- `subtitles[].selected`: Individual subtitle selection for export
- `subtitles[].typedText`: Typed characters for text typing mode progress
- `subtitles[].hasTypingMistake`: Temporary state for typing mistake visual feedback
- `isPreviewModalOpen`: Preview modal visibility

## Keyboard Shortcuts System

### Configuration Structure

```typescript
interface KeyboardShortcut {
  key: string; // The main key (e.g., 'r', 'n')
  ctrlKey: boolean; // Whether Ctrl key is required
  altKey: boolean; // Whether Alt key is required
  shiftKey: boolean; // Whether Shift key is required
}

interface KeyboardShortcuts {
  replay: KeyboardShortcut; // Default: Ctrl+R
  nextSubtitle: KeyboardShortcut; // Default: Ctrl+N
}
```

### Implementation Details

- **Smart Conflict Avoidance**: Uses modifier keys (Ctrl) to avoid conflicts with Text Typing Mode
- **Global Event Handling**: Document-level keyboard event listener with proper cleanup
- **Context Awareness**: Disables shortcuts when user is typing in input/textarea elements
- **Visual Feedback**: Settings panel displays current shortcuts with styled kbd elements
- **Persistent Storage**: Shortcuts saved to localStorage with JSON serialization
- **Auto-Pause Integration**: Navigation shortcuts properly reset auto-pause tracking

## Important Libraries & Dependencies

### Core Technologies

- **React 18**: Functional components with hooks
- **TypeScript**: Strict type checking and interfaces
- **Vite**: Fast build tool and development server
- **Biome**: Linting and code formatting

### File Handling

- **File API**: Browser native file reading for video and subtitle uploads
- **Custom Parsers**: Manual SRT and VTT subtitle parsing with index extraction
- **Blob API**: Video file URL creation and memory management

### Browser APIs

- **localStorage**: Persistent settings storage
- **HTML5 Video API**: Video playback control and time synchronization
- **Keyboard Events**: Global keyboard listener for typing mode
- **Mouse Events**: Drag and drop functionality for subtitle positioning

## Text Processing Features

### Hide Letters Mode

- Converts letters to bullet characters (•) while preserving structure
- Keeps first letter of each word visible
- Preserves all punctuation and spacing
- **Bracket Preservation**: Text between [brackets] remains unchanged
- Used for language learning and comprehension practice

### Text Typing Mode

- Interactive letter-by-letter revelation as users type
- Only counts letters outside of [bracketed] content
- Real-time progress tracking and visual feedback
- **Enhanced Visual Features**:
  - Target letter emphasis with pulsing animation (yellow/amber background)
  - Red blinking feedback for typing mistakes (600ms duration)
  - Smart detection of next typeable character
  - Automatic mistake state management and cleanup
- Automatic enabling of hide letters mode and auto-pause
- Global keyboard event handling with proper cleanup

### Bracket Handling

- Square brackets [like this] are treated as metadata
- Content inside brackets is never hidden or counted for typing
- Useful for speaker names, sound effects, stage directions
- Properly handles nested content and multiple brackets per line

## Code Style & Patterns

### TypeScript Best Practices

- Define interfaces for all props and complex objects
- Use strict type checking with proper null/undefined handling
- Leverage union types for component variants
- Export interfaces from types.ts for reusability

### React Patterns

- Use functional components with hooks exclusively
- Implement proper cleanup in useEffect hooks
- Use callback functions to avoid unnecessary re-renders
- Lift state up to appropriate parent components
- Handle loading and error states gracefully

### Performance Considerations

- Use React.memo for expensive components when needed
- Implement proper key props for dynamic lists
- Clean up event listeners and timeouts
- Optimize re-renders with dependency arrays
- Handle large subtitle files efficiently

### Accessibility Requirements

- Include ARIA labels and roles for all interactive elements
- Support keyboard navigation (Tab, Enter, Escape)
- Provide proper focus management for modals
- Use semantic HTML elements
- Ensure proper color contrast ratios
- Screen reader compatibility

## Development Guidelines

### File Organization

- Components in `/src/components/` with corresponding CSS files
- Utility functions in `/src/utils/`
- TypeScript interfaces in `/src/types.ts`
- Each component should have its own CSS file for styling

### Event Handling Patterns

- Use proper cleanup for event listeners (keyboard, mouse, resize)
- Implement debouncing for performance-critical operations
- Handle both keyboard and mouse interactions for accessibility
- Prevent default behaviors when necessary (e.g., keyboard typing mode)

### State Management Patterns

- Use localStorage for persistent user preferences
- Implement proper loading and error states
- Use dependency arrays correctly in useEffect hooks
- Clean up resources (URLs, event listeners) in useEffect cleanup

### Testing Considerations

- Test with various video formats and subtitle files
- Verify keyboard interactions work correctly
- Test responsive design on different screen sizes
- Ensure proper error handling for file operations

## Common Implementation Patterns

### Text Processing

- Always handle bracket preservation in text utilities
- Use proper character encoding (UTF-8) for subtitle files
- Implement progress tracking for typing mode
- Handle multi-line subtitles correctly

### Video Integration

- Use HTML5 video API for playback control
- Implement precise time synchronization (millisecond accuracy)
- Handle video loading states and errors gracefully
- Support drag-and-drop positioning for subtitle overlays

### Responsive Design

- Mobile-first approach with breakpoint at 768px
- Resizable panels for desktop layouts
- Touch-friendly interactions for mobile devices
- Proper keyboard navigation for all devices
