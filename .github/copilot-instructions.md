# Video Scene Player - Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is a React + TypeScript + Vite web application for video playback with interactive subtitle functionality.

## Key Features

- Load local video files and SRT subtitle files
- Display video scenes on the left and subtitle scripts on the right
- Click subtitle lines to jump to matched video scenes with audio playback
- Overlay subtitles on the video player
- Synchronized video-subtitle interaction

## Architecture Guidelines

- Use React functional components with hooks
- TypeScript for type safety
- Modular component structure
- Custom hooks for video and subtitle management
- Responsive design for video player and subtitle panel

## Key Components

- `VideoPlayer`: Main video display with subtitle overlay
- `SubtitlePanel`: Right-side panel showing subtitle lines
- `FileUploader`: Handle video and SRT file uploads
- `SubtitleLine`: Individual subtitle entry component
- Custom hooks: `useVideoPlayer`, `useSubtitles`, `useSyncedPlayback`

## Important Libraries

- `subsrt`: For parsing SRT subtitle files
- React built-in video controls or custom video player
- File API for local file handling

## Code Style

- Use descriptive variable names
- Implement error handling for file operations
- Ensure accessibility features
- Optimize for performance with large subtitle files
