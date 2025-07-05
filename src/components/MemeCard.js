import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MemeCard = ({ img, title }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleEditClick = () => {
    navigate(`/edit?url=${encodeURIComponent(img)}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        )}
        
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">🖼️</div>
              <p className="text-sm">Image failed to load</p>
            </div>
          </div>
        ) : (
          <img
            src={img}
            alt={title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={handleEditClick}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 shadow-lg"
          >
            ✏️ Edit Meme
          </button>
        </div>
      </div>
      
      {/* Title */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
          {title}
        </h3>
        
        {/* Quick Edit Button (visible on mobile) */}
        <button
          onClick={handleEditClick}
          className="w-full mt-3 bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 font-medium py-2 px-4 rounded-lg transition-all duration-200 lg:hidden"
        >
          ✏️ Edit
        </button>
      </div>
    </div>
  );
};

export default MemeCard;
