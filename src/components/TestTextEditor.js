import React, { useState } from 'react';
import AddText from './AddText';

const TestTextEditor = () => {
  const [textElements, setTextElements] = useState([
    {
      id: 1,
      text: "Test Text 1",
      fontSize: 24,
      color: "#ffffff"
    },
    {
      id: 2,
      text: "Test Text 2",
      fontSize: 32,
      color: "#ff0000"
    }
  ]);

  const updateText = (id, updatedData) => {
    console.log("Updating text element:", id, updatedData);
    setTextElements(prevElements => 
      prevElements.map(element => 
        element.id === id 
          ? { ...element, ...updatedData }
          : element
      )
    );
  };

  const deleteText = (id) => {
    console.log("Deleting text element:", id);
    setTextElements(prev => prev.filter(element => element.id !== id));
  };

  const addText = () => {
    const newId = Math.max(...textElements.map(t => t.id), 0) + 1;
    const newElement = {
      id: newId,
      text: "New Text",
      fontSize: 24,
      color: "#ffffff"
    };
    setTextElements(prev => [...prev, newElement]);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Text Editor Test</h1>
        
        <div className="mb-4">
          <button 
            onClick={addText}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Text Element
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 relative" style={{ minHeight: "400px" }}>
          <h2 className="text-xl font-semibold mb-4">Test Area</h2>
          <p className="text-gray-600 mb-4">Double-click text to edit, drag to move</p>
          
          {textElements.map((element) => (
            <div key={element.id} className="mb-2">
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

        <div className="mt-6 bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Current Text Elements:</h3>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
            {JSON.stringify(textElements, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default TestTextEditor; 