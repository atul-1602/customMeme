import react from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from "./pages/Home";
import EditPage from "./pages/EditPage"
import Navbar from "./components/Navbar"
function App() {
  return (
   
    <>
      <Navbar/>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route  path="/edit" element={<EditPage/>}/>
    </Routes>
    
    </>
  );
}

export default App;
