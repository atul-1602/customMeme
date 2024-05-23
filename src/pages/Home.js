import React, { useEffect, useState } from "react";
import { getAllMemes } from "../components/MemeFetch";
import MemeCard from "../components/MemeCard";

const Home = () => {
  const [memedata, setMemeData] = useState([]);

  useEffect(() => {
    getAllMemes().then((memes) => setMemeData(memes.data.memes));
  }, []);

  return (
    <div className="flex flex-wrap justify-center align-middle">
      
      {memedata.map((meme) => (
        <div key={meme.id} className="w-1/4 p-4 border-2 m-4">
          <MemeCard img={meme.url} title={meme.name} />
        </div>
      ))}
    </div>
  );
};

export default Home;
