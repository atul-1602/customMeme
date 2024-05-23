import React, { useState } from "react";
import Draggable from "react-draggable";
const AddText = () => {
  const [editMode, setEditMode] = useState(false);
  const [val, setVal] = useState("Double Click");
  return (
    <div>
      <Draggable>
        {editMode ? (
          <input style={{width:"100px"}}
            onDoubleClick={(e) => {
              setEditMode(false);
            }}
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
        ) : (
          <h1 onDoubleClick={(e) => {
            setEditMode(true );
          }}> Add your text</h1>
        )}
      </Draggable>
    </div>
  );
};

export default AddText;
