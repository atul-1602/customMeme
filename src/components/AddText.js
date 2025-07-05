import React, { useState, useEffect, useRef, useCallback } from "react";
import Draggable from "react-draggable";

const AddText = ({ id, text, fontSize, color, onUpdate, onDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [localText, setLocalText] = useState(text || "Add your text");
  const [localFontSize, setLocalFontSize] = useState(fontSize || 24);
  const [localColor, setLocalColor] = useState(color || "#ffffff");
  const hideTimeoutRef = useRef(null);

  // Update local state when props change
  useEffect(() => {
    setLocalText(text || "Add your text");
    setLocalFontSize(fontSize || 24);
    setLocalColor(color || "#ffffff");
  }, [text, fontSize, color]);

  const handleDoubleClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setEditMode(true);
  }, []);

  const handleBlur = useCallback(() => {
    setEditMode(false);
    onUpdate(id, {
      text: localText,
      fontSize: localFontSize,
      color: localColor
    });
  }, [id, localText, localFontSize, localColor, onUpdate]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setEditMode(false);
      onUpdate(id, {
        text: localText,
        fontSize: localFontSize,
        color: localColor
      });
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setEditMode(false);
      setLocalText(text || "Add your text");
    }
  }, [id, localText, localFontSize, localColor, onUpdate, text]);

  const handleTextChange = useCallback((e) => {
    setLocalText(e.target.value);
  }, []);

  const handleFontSizeChange = useCallback((newSize) => {
    setLocalFontSize(newSize);
    onUpdate(id, {
      text: localText,
      fontSize: newSize,
      color: localColor
    });
  }, [id, localText, localColor, onUpdate]);

  const handleColorChange = useCallback((newColor) => {
    setLocalColor(newColor);
    onUpdate(id, {
      text: localText,
      fontSize: localFontSize,
      color: newColor
    });
  }, [id, localText, localFontSize, onUpdate]);

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  const handleMouseEnter = useCallback(() => {
    if (!editMode) {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
      setShowControls(true);
    }
  }, [editMode]);

  const handleMouseLeave = useCallback(() => {
    if (!editMode) {
      hideTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 300);
    }
  }, [editMode]);

  const handleControlsMouseEnter = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const handleControlsMouseLeave = useCallback(() => {
    if (!editMode) {
      hideTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 300);
    }
  }, [editMode]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Draggable 
      bounds="parent" 
      disabled={editMode}
      defaultPosition={{ x: 50, y: 50 }}
    >
      <div 
        className="absolute cursor-move"
        style={{
          zIndex: editMode ? 1000 : 1
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {editMode ? (
          <input
            className="bg-transparent border-2 border-white border-dashed px-2 py-1 rounded text-center"
            style={{
              fontSize: `${localFontSize}px`,
              color: localColor,
              textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
              minWidth: "120px",
              outline: "none",
              background: "rgba(0,0,0,0.1)",
              fontFamily: "Impact, Arial, sans-serif",
              fontWeight: "bold"
            }}
            value={localText}
            onChange={handleTextChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck="false"
            maxLength={100}
          />
        ) : (
          <div
            className="px-2 py-1 rounded cursor-text select-none"
            style={{
              fontSize: `${localFontSize}px`,
              color: localColor,
              textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
              minWidth: "120px",
              userSelect: "none",
              fontFamily: "Impact, Arial, sans-serif",
              fontWeight: "bold",
              whiteSpace: "nowrap"
            }}
            onDoubleClick={handleDoubleClick}
          >
            {localText}
          </div>
        )}
        
        {showControls && !editMode && (
          <div 
            className="absolute top-0 left-full ml-2 bg-white rounded-lg shadow-lg p-2 z-10 min-w-[200px]"
            onMouseEnter={handleControlsMouseEnter}
            onMouseLeave={handleControlsMouseLeave}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium">Size:</label>
                <input
                  type="range"
                  min="12"
                  max="72"
                  value={localFontSize}
                  onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-xs">{localFontSize}px</span>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium">Color:</label>
                <input
                  type="color"
                  value={localColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-8 h-6 rounded border"
                />
              </div>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600 transition-colors"
                aria-label="Delete text"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default AddText;
