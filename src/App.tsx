import { Canvas } from "@react-three/fiber";
import { TextEditor3D } from "./components/TextEditor3D";
import { useState } from "react";

export default function App() {
  const [savedTexts, setSavedTexts] = useState<Array<{
    text: string;
    meta: { font: string; mode: "2D" | "3D"; color: string; fontSize: number };
  }>>([]);

  const handleSave = (text: string, meta: { font: string; mode: "2D" | "3D"; color: string; fontSize: number }) => {
    setSavedTexts(prev => [...prev, { text, meta }]);
    console.log("Text saved:", { text, meta });
  };

  return (
    <div className="w-full h-screen bg-gray-900">
      {/* Simple header */}
      <div className="absolute top-4 left-4 z-10 text-white">
        <h1>3D Text Editor - Internship Project</h1>
        <p className="text-sm opacity-75">Click the 'Edit' button to start editing</p>
      </div>

      {/* Saved texts count */}
      {savedTexts.length > 0 && (
        <div className="absolute top-4 right-4 z-10 text-white bg-black bg-opacity-50 p-2 rounded">
          Saved texts: {savedTexts.length}
        </div>
      )}

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ width: "100%", height: "100%" }}
        dpr={1}
        performance={{ min: 0.5 }}
        gl={{ antialias: false, alpha: true }}
      >
        {/* Basic lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        
        {/* Text Editor Component */}
        <TextEditor3D 
          initial="Hello World!" 
          onSave={handleSave}
        />
      </Canvas>

      {/* Basic instructions */}
      <div className="absolute bottom-4 left-4 z-10 text-white text-sm">
        <div className="bg-black bg-opacity-50 p-3 rounded">
          <p><strong>Instructions:</strong></p>
          <p>• Look for the blue 'Edit' button on the right side</p>
          <p>• Click it to open the 3D text editor interface</p>
          <p>• Use toolbar controls: Mode, Font, Color, Size</p>
          <p>• Click in the text area to start typing</p>
          <p>• Save, Clear, or Cancel when finished</p>
        </div>
      </div>
    </div>
  );
}