import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import EditPage from "./pages/EditPage";
import Navbar from "./components/Navbar";
import './App.css';

function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />
      <main className="pt-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<EditPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
