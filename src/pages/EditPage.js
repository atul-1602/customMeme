import React, { useState, createRef } from "react";
import { useSearchParams } from "react-router-dom";
import AddText from "../components/AddText";
import { exportComponentAsJPEG } from "react-component-export-image";
const EditPage = () => {
  const [params] = useSearchParams();
  const [count, setCount] = useState(0);
  const memeRef = createRef();
  const addText = () => {
    setCount(count + 1);
  };
  return (
    <div className="flex justify-center  mt-8 ">
      <div  className="w-2/5 rounded-lg p-8 shadow-2xl shadow-lightblue">
        <h2 className="text-2xl font-bold ml-28">Meme</h2>
        <div ref={memeRef}   className="meme m-5">
          <img src={params.get("url")} style={{ width: "250px" }} />
          {Array(count)
            .fill(0)
            .map((e) => (
              <AddText />
            ))}
        </div>
        <button
          onClick={addText}
          className="bg-blue-500 hover:bg-blue-700 text-white m-5 font-bold py-2 px-4 rounded w-32 mt-10 "
        >
          Add Text
        </button>
        <button
          className=" ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-32 mt-10 "
          onClick={(e) => exportComponentAsJPEG(memeRef)}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditPage;
