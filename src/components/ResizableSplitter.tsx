import { useState, useCallback, useEffect } from 'react';
import './ResizableSplitter.css';

interface ResizableSplitterProps {
  onResize: (leftWidth: number) => void;
  initialLeftWidth?: number;
  minLeftWidth?: number;
  maxLeftWidth?: number;
}

const ResizableSplitter: React.FC<ResizableSplitterProps> = ({
  onResize,
  initialLeftWidth = 70, // percentage
  minLeftWidth = 30,
  maxLeftWidth = 85
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [leftWidth, setLeftWidth] = useState(initialLeftWidth);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const containerWidth = window.innerWidth;
    const newLeftWidth = (e.clientX / containerWidth) * 100;
    
    // Clamp the width within bounds
    const clampedWidth = Math.max(minLeftWidth, Math.min(maxLeftWidth, newLeftWidth));
    
    setLeftWidth(clampedWidth);
    onResize(clampedWidth);
  }, [isDragging, minLeftWidth, maxLeftWidth, onResize]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      className={`resizable-splitter ${isDragging ? 'dragging' : ''}`}
      onMouseDown={handleMouseDown}
      style={{ left: `${leftWidth}%` }}
    >
      <div className="splitter-handle" />
    </div>
  );
};

export default ResizableSplitter;
