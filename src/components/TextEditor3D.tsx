"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Text, Edges } from "@react-three/drei";
import { getFontUrl } from "../utils/fonts";

type SaveHandler = (text: string, meta: { font: string; mode: "2D" | "3D"; color: string; fontSize: number }) => void;

export function TextEditor3D({
  initial = "Edit me",
  onSave,
}: {
  initial?: string;
  onSave?: SaveHandler;
}) {
  const { camera, size } = useThree();
  
  // Error handling for useThree hook
  if (!camera || !size) {
    console.warn("Three.js context not available");
    return null;
  }
  const [text, setText] = useState(initial);
  const [mode, setMode] = useState<"2D" | "3D">("2D");
  const [selectedFont, setSelectedFont] = useState("System Default");
  const [textColor, setTextColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState(1);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showFontDropdown, setShowFontDropdown] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);



  const cursorRef = useRef(true);

  // Cursor blink
  useEffect(() => {
    const timer = setInterval(() => (cursorRef.current = !cursorRef.current), 500);
    return () => clearInterval(timer);
  }, []);

  // Keyboard input with support for multi-line
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (!focused || !visible) return;
      e.preventDefault();
      
      if (e.key === "Backspace") {
        setText((t) => t.slice(0, -1));
      } else if (e.key === "Enter") {
        setText((t) => t + "\n");
      } else if (e.key === "Tab") {
        setText((t) => t + "    "); // Add 4 spaces for tab
      } else if (e.key.length === 1) {
        setText((t) => t + e.key);
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [focused, visible]);

  const doSave = useCallback(() => {
    if (onSave) {
      onSave(text, { 
        font: selectedFont, 
        mode, 
        color: textColor, 
        fontSize 
      });
    }
    setFocused(false);
    setVisible(false);
  }, [text, selectedFont, mode, textColor, fontSize, onSave]);

  const doCancel = useCallback(() => {
    setText(initial);
    setFocused(false);
    setShowFontDropdown(false);
    setShowColorPicker(false);
  }, [initial]);

  // Simplified positioning without complex calculations

  // Slightly smaller editor to avoid overlap with instructions
  const boxHeight = 3.8;
  const boxWidth = 6.0;
  const fontScale = 0.1 * fontSize;
  
  // Get the font URL for the selected font
  const currentFontUrl = getFontUrl(selectedFont);

  // Color options
  const colors = ["#ffffff", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#000000"];

  return (
    <>
      {/* Text Editor Toggle Button */}
      <group position={[2.2, 1.8, 2]}>
        <mesh 
          onPointerDown={(e) => {
            e.stopPropagation();
            setVisible((v) => !v);
          }}
        >
          <boxGeometry args={[1.0, 0.5, 0.2]} />
          <meshStandardMaterial color={visible ? "#dc2626" : "#2563eb"} />
        </mesh>
        <Text
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="middle"
          position={[0, 0, 0.12]}
          onPointerDown={(e) => {
            e.stopPropagation();
            setVisible((v) => !v);
          }}
        >
          {visible ? "Close" : "Edit"}
        </Text>
      </group>



      {visible && (
        <group position={[0.8, 0.4, 0]}>
          {/* Main editor window */}
          <mesh onPointerDown={(e) => {
            e.stopPropagation();
            setFocused(true);
          }}>
            <boxGeometry args={[boxWidth, boxHeight, 0.1]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>


          {/* Title bar */}
          <mesh position={[0, boxHeight / 2 - 0.15, 0.06]}>
            <boxGeometry args={[boxWidth, 0.3, 0.02]} />
            <meshStandardMaterial color={focused ? "#d4edda" : "#e9ecef"} />
          </mesh>
          <Text
            position={[0, boxHeight / 2 - 0.15, 0.08]}
            fontSize={0.1}
            color="#495057"
            anchorX="center"
            anchorY="middle"
          >
            3D Text Editor {focused ? "(Active)" : ""}
          </Text>

          {/* Toolbar */}
          <mesh position={[0, boxHeight / 2 - 0.5, 0.06]}>
            <boxGeometry args={[boxWidth - 0.2, 0.3, 0.02]} />
            <meshStandardMaterial color="#f8f9fa" />
          </mesh>


          {/* Mode toggle */}
          <mesh 
            position={[-2.2, boxHeight / 2 - 0.5, 0.08]}
            onPointerDown={(e) => {
              e.stopPropagation();
              setMode((m) => (m === "2D" ? "3D" : "2D"));
            }}
          >
            <boxGeometry args={[0.8, 0.28, 0.06]} />
            <meshStandardMaterial color={mode === "3D" ? "#28a745" : "#007bff"} />
          </mesh>

          <Text
            position={[-2.2, boxHeight / 2 - 0.5, 0.12]}
            fontSize={0.12}
            color="white"
            anchorX="center"
            anchorY="middle"
            onPointerDown={(e) => {
              e.stopPropagation();
              setMode((m) => (m === "2D" ? "3D" : "2D"));
            }}
          >
            {mode}
          </Text>

          {/* Font selector */}
          <mesh 
            position={[-0.8, boxHeight / 2 - 0.5, 0.08]}
            onPointerDown={() => setShowFontDropdown(!showFontDropdown)}
          >
            <boxGeometry args={[1.4, 0.35, 0.06]} />
            <meshStandardMaterial color="#6c757d" />
          </mesh>

          <Text
            position={[-0.8, boxHeight / 2 - 0.5, 0.12]}
            fontSize={0.1}
            color="white"
            anchorX="center"
            anchorY="middle"
            onPointerDown={() => setShowFontDropdown(!showFontDropdown)}
          >
            {selectedFont || "Font"}
          </Text>

          {/* Font dropdown */}
          {showFontDropdown && (
            <group position={[-0.8, boxHeight / 2 - 0.9, 0.1]}>
              {["System Default", "Arial", "Helvetica", "Times", "Courier"].map((font, i) => (
                <group key={font} position={[0, -i * 0.18, 0]}>
                  <mesh onPointerDown={() => {
                    setSelectedFont(font);
                    setShowFontDropdown(false);
                  }}>
                    <boxGeometry args={[0.9, 0.15, 0.06]} />
                    <meshStandardMaterial color={font === selectedFont ? "#007bff" : "#ffffff"} />
                  </mesh>

                  <Text
                    fontSize={0.08}
                    color={font === selectedFont ? "white" : "#495057"}
                    anchorX="center"
                    anchorY="middle"
                    position={[0, 0, 0.03]}
                    onPointerDown={() => {
                      setSelectedFont(font);
                      setShowFontDropdown(false);
                    }}
                  >
                    {font}
                  </Text>
                </group>
              ))}
            </group>
          )}

          {/* Color picker */}
          <mesh 
            position={[0.6, boxHeight / 2 - 0.5, 0.08]}
            onPointerDown={() => setShowColorPicker(!showColorPicker)}
          >
            <boxGeometry args={[0.4, 0.28, 0.06]} />
            <meshStandardMaterial color={textColor} />
          </mesh>


          {/* Color picker palette */}
          {showColorPicker && (
            <group position={[0.6, boxHeight / 2 - 0.9, 0.1]}>
              {colors.map((color, i) => (
                <mesh 
                  key={color}
                  position={[(i % 4 - 1.5) * 0.15, -Math.floor(i / 4) * 0.15, 0]}
                  onPointerDown={() => {
                    setTextColor(color);
                    setShowColorPicker(false);
                  }}
                >
                  <boxGeometry args={[0.12, 0.12, 0.06]} />
                  <meshStandardMaterial color={color} />

                </mesh>
              ))}
            </group>
          )}

          {/* Font size controls */}
          <group position={[1.8, boxHeight / 2 - 0.5, 0.08]}>
            <Text
              position={[-0.5, 0, 0.02]}
              fontSize={0.08}
              color="#495057"
              anchorX="center"
              anchorY="middle"
            >
              Size:
            </Text>
            <mesh 
              position={[-0.22, 0, 0]}
              onPointerDown={() => setFontSize(Math.max(0.5, fontSize - 0.1))}
            >
              <boxGeometry args={[0.22, 0.28, 0.06]} />
              <meshStandardMaterial color="#dc3545" />
            </mesh>

            <Text
              position={[-0.22, 0, 0.03]}
              fontSize={0.15}
              color="white"
              anchorX="center"
              anchorY="middle"
              onPointerDown={() => setFontSize(Math.max(0.5, fontSize - 0.1))}
            >
              -
            </Text>
            <Text
              position={[0, 0, 0.02]}
              fontSize={0.09}
              color="#495057"
              anchorX="center"
              anchorY="middle"
            >
              {fontSize.toFixed(1)}
            </Text>
            <mesh 
              position={[0.22, 0, 0]}
              onPointerDown={() => setFontSize(Math.min(2.0, fontSize + 0.1))}
            >
              <boxGeometry args={[0.22, 0.28, 0.06]} />
              <meshStandardMaterial color="#28a745" />
            </mesh>

            <Text
              position={[0.22, 0, 0.03]}
              fontSize={0.15}
              color="white"
              anchorX="center"
              anchorY="middle"
              onPointerDown={() => setFontSize(Math.min(2.0, fontSize + 0.1))}
            >
              +
            </Text>
          </group>

          {/* Text input area */}
          <mesh position={[0, -0.2, 0.06]} onPointerDown={(e) => {
            e.stopPropagation();
            setFocused(true);
          }}>
            <boxGeometry args={[boxWidth - 0.2, 2.0, 0.04]} />
            <meshStandardMaterial color={focused ? "#ffffff" : "#f8f9fa"} />
          </mesh>


          {/* Input placeholder */}
          {!text && !focused && (
            <Text
              position={[-boxWidth / 2 + 0.2, 0.6, 0.09]}
              fontSize={0.08}
              color="#6c757d"
              anchorX="left"
              anchorY="top"
            >
              Click here to start typing...
            </Text>
          )}

          {/* Text content */}
          <group position={[-boxWidth / 2 + 0.2, 0.6, 0.09]}>
            {mode === "2D" ? (
              <Text
                fontSize={fontScale}
                color={textColor}
                anchorX="left"
                anchorY="top"
                maxWidth={boxWidth - 0.4}
                font={currentFontUrl}
              >
                {focused && cursorRef.current ? text + "|" : text}
              </Text>
            ) : (
              <Text
                fontSize={fontScale}
                color={textColor}
                anchorX="left"
                anchorY="top"
                maxWidth={boxWidth - 0.4}
                font={currentFontUrl}
              >
                {focused && cursorRef.current ? text + "|" : text}
                <meshStandardMaterial color={textColor} />
              </Text>
            )}
          </group>

          {/* Action buttons */}
          <group position={[0, -boxHeight / 2 + 0.3, 0.08]}>
            {/* Save button */}
            <mesh 
              position={[-1.2, 0, 0]}
              onPointerDown={doSave}
            >
              <boxGeometry args={[0.8, 0.35, 0.06]} />
              <meshStandardMaterial color="#28a745" />
            </mesh>

            <Text
              position={[-1.2, 0, 0.03]}
              fontSize={0.12}
              color="white"
              anchorX="center"
              anchorY="middle"
              onPointerDown={doSave}
            >
              Save
            </Text>

            {/* Clear button */}
            <mesh 
              position={[0, 0, 0]}
              onPointerDown={() => setText("")}
            >
              <boxGeometry args={[0.8, 0.35, 0.06]} />
              <meshStandardMaterial color="#ffc107" />
            </mesh>

            <Text
              position={[0, 0, 0.03]}
              fontSize={0.12}
              color="#212529"
              anchorX="center"
              anchorY="middle"
              onPointerDown={() => setText("")}
            >
              Clear
            </Text>

            {/* Cancel button */}
            <mesh 
              position={[1.2, 0, 0]}
              onPointerDown={doCancel}
            >
              <boxGeometry args={[0.8, 0.35, 0.06]} />
              <meshStandardMaterial color="#dc3545" />
            </mesh>

            <Text
              position={[1.2, 0, 0.03]}
              fontSize={0.12}
              color="white"
              anchorX="center"
              anchorY="middle"
              onPointerDown={doCancel}
            >
              Cancel
            </Text>
          </group>
        </group>
      )}
    </>
  );
}