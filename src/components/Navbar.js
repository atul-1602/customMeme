import React from "react";

const Navbar = () => {
  return (
    <nav className="flex flex-row flex-wrap sticky top-0 z-10 bg-blue-400 font-mono text-pink-800 p-4">
      <div className="flex items-center justify-center " style={{ width: "40%" }}>
        <h3 className=" text-3xl ">MemeCraft</h3>
      </div>
      {/* <ul className="flex flex-row flex-wrap justify-around flex-grow p-4 text-xl">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul> */}
    </nav>
  );
};

export default Navbar;
