import React, { useState, createRef, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import AddText from "../components/AddText";
import { exportComponentAsJPEG } from "react-component-export-image";

const EditPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [textElements, setTextElements] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState(null);
  const memeRef = createRef();

  const addText = useCallback(() => {
    const newElement = {
      id: nextId,
      text: "Add your text",
      fontSize: 24,
      color: "#ffffff"
    };
    setTextElements(prev => [...prev, newElement]);
    setNextId(prev => prev + 1);
  }, [nextId]);

  const deleteText = useCallback((id) => {
    setTextElements(prev => prev.filter(element => element.id !== id));
  }, []);

  const updateText = useCallback((id, updatedData) => {
    setTextElements(prevElements => 
      prevElements.map(element => 
        element.id === id 
          ? { ...element, ...updatedData }
          : element
      )
    );
  }, []);

  const handleExport = useCallback(async () => {
    setIsExporting(true);
    setExportError(null);
    try {
      await exportComponentAsJPEG(memeRef, {
        fileName: "custom-meme",
        quality: 0.9
      });
    } catch (error) {
      setExportError("Failed to export meme. Please try again.");
    } finally {
      setIsExporting(false);
    }
  }, [memeRef]);

  const handleReset = useCallback(() => {
    setTextElements([]);
    setNextId(1);
  }, []);

  const addTestText = useCallback(() => {
    const testElement = {
      id: nextId,
      text: "Test Text - Double click to edit!",
      fontSize: 32,
      color: "#ff0000"
    };
    setTextElements(prev => [...prev, testElement]);
    setNextId(prev => prev + 1);
  }, [nextId]);

  const handleBackToGallery = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Meme Editor</h1>
          <p className="text-gray-600">Create your custom meme masterpiece!</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Editor Panel */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Meme</h2>
                <p className="text-gray-600">Double-click text to edit, drag to move</p>
                <p className="text-sm text-gray-500 mt-2">
                  Text elements: {textElements.length}
                </p>
              </div>
              
              <div 
                ref={memeRef} 
                className="relative mx-auto bg-gray-100 rounded-lg overflow-hidden"
                style={{ width: "fit-content", maxWidth: "100%" }}
              >
                <img 
                  src={params.get("url")} 
                  alt="Meme template"
                  className="max-w-full h-auto block"
                  style={{ maxHeight: "600px" }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{ display: 'none' }}
                >
                  <div className="flex items-center justify-center h-full bg-gray-200">
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">🖼️</div>
                      <p>Image failed to load</p>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 pointer-events-none">
                  {textElements.map((element) => (
                    <div key={element.id} className="pointer-events-auto">
                      <AddText 
                        id={element.id}
                        text={element.text}
                        fontSize={element.fontSize}
                        color={element.color}
                        onUpdate={updateText}
                        onDelete={deleteText}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Controls</h3>
              
              <div className="space-y-4">
                <button
                  onClick={addText}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105"
                >
                  ✏️ Add Text
                </button>

                <button
                  onClick={addTestText}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200"
                >
                  🧪 Add Test Text
                </button>
                
                <button
                  onClick={handleReset}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200"
                >
                  🔄 Reset All
                </button>
                
                <button
                  onClick={handleExport}
                  disabled={isExporting}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isExporting ? "⏳ Exporting..." : "💾 Save Meme"}
                </button>
                
                <button
                  onClick={handleBackToGallery}
                  className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-xl transition-all duration-200"
                >
                  ← Back to Gallery
                </button>
              </div>

              {/* Error Message */}
              {exportError && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {exportError}
                </div>
              )}

              {/* Instructions */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Tips:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Double-click text to edit</li>
                  <li>• Press Enter to save, Escape to cancel</li>
                  <li>• Drag text to reposition</li>
                  <li>• Hover over text for controls</li>
                  <li>• Use color picker for custom colors</li>
                </ul>
              </div>

              {/* Debug Info */}
              <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
                <h5 className="font-semibold">Debug Info:</h5>
                <p>Text Elements: {textElements.length}</p>
                <p>Next ID: {nextId}</p>
                <p>URL: {params.get("url")?.substring(0, 50)}...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
