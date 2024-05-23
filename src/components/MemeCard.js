import React from 'react'
import {useNavigate} from 'react-router-dom'
const MemeCard = (props) => {
    const navigate=useNavigate();
  return (
    <div className='flex flex-col items-center justify-center '>
    <img src={props.img} className='h-96 w-96' />
    <p className='font-bold m-4 text-xl'>{props.title}</p>
    
    <button onClick={e=> navigate(`/edit?url=${props.img}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-2/4">
      Edit Meme
    </button>
     
  </div>
   
  
  )
}

export default MemeCard
