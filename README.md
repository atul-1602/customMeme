# 🎭 MemeCraft - Custom Meme Generator

A modern, responsive web application for creating custom memes with drag-and-drop text editing, real-time customization, and seamless export functionality.

<img width="1512" alt="Screenshot 2025-07-06 at 11 48 17 AM" src="https://github.com/user-attachments/assets/7ad06f33-60ae-4f5a-8059-90299155a7bd" />


<img width="1512" alt="Screenshot 2025-07-06 at 11 48 39 AM" src="https://github.com/user-attachments/assets/4523c8cd-1914-45fe-9e41-43386de31068" />



## ✨ Features

- **🎨 Drag & Drop Text Editing**: Add, move, and customize text elements on any meme template
- **🎯 Real-time Customization**: Change font size, color, and position with intuitive controls
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **💾 Export Functionality**: Save your custom memes as high-quality JPEG images
- **🔍 Search & Browse**: Find the perfect meme template from a vast collection
- **⚡ Performance Optimized**: Fast loading with caching and rate limiting
- **🎯 User-Friendly**: Intuitive interface with helpful tips and instructions

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd customMeme-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AddText.js      # Text editing component
│   ├── MemeCard.js     # Individual meme card
│   ├── MemeFetch.js    # API integration
│   ├── Navbar.js       # Navigation component
│   └── TestTextEditor.js # Testing component
├── pages/              # Page components
│   ├── Home.js         # Meme gallery page
│   └── EditPage.js     # Meme editor page
├── App.js              # Main application component
└── index.js            # Application entry point
```

## 🚀 Production Deployment

### Option 1: Static Hosting (Recommended)

1. **Build the application**
   ```bash
   NODE_ENV=production npm run build
   ```

2. **Deploy to your preferred platform**

   **Netlify:**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=build
   ```

   **Vercel:**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

   **GitHub Pages:**
   ```bash
   npm install -g gh-pages
   npm run deploy
   ```

   **Firebase:**
   ```bash
   npm install -g firebase-tools
   firebase init hosting
   firebase deploy
   ```

### Option 2: Traditional Web Server

1. **Build the application**
   ```bash
   NODE_ENV=production npm run build
   ```

2. **Serve the build folder**
   ```bash
   npm install -g serve
   serve -s build -l 3000
   ```

3. **Configure your web server** (Apache, Nginx, etc.) to serve the `build` folder

### Environment Variables

For production deployment, you may want to set these environment variables:

```bash
NODE_ENV=production
REACT_APP_API_URL=https://api.imgflip.com
```

## 🎯 How to Use

### Creating a Meme

1. **Browse Templates**: Scroll through the meme gallery or use the search function
2. **Select Template**: Click on any meme template to open the editor
3. **Add Text**: Click "Add Text" to add text elements to your meme
4. **Customize**: 
   - Double-click text to edit
   - Drag text to reposition
   - Hover over text to see size/color controls
   - Use the slider to adjust font size
   - Click the color picker to change text color
5. **Export**: Click "Save Meme" to download your creation

### Text Editing Tips

- **Double-click** any text to edit it
- **Press Enter** to save changes
- **Press Escape** to cancel editing
- **Drag text** to reposition it on the meme
- **Hover over text** to see customization controls
- **Use the delete button** to remove unwanted text

## 🔧 Technical Details

### Technologies Used

- **React 18** - Modern React with hooks and functional components
- **React Router** - Client-side routing
- **React Draggable** - Drag and drop functionality
- **React Component Export Image** - Image export capability
- **Tailwind CSS** - Utility-first CSS framework
- **ImgFlip API** - Meme template data

### Performance Optimizations

- **Memoization**: Uses `useCallback` for performance optimization
- **Caching**: API responses are cached for 5 minutes
- **Rate Limiting**: Prevents API abuse with request limiting
- **Lazy Loading**: Images load as needed
- **Error Boundaries**: Graceful error handling
- **Optimized Build**: Production build with code splitting

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🐛 Troubleshooting

### Common Issues

1. **Text not appearing**: Make sure you've clicked "Add Text" and the text is not white on white background
2. **Can't drag text**: Ensure you're not in edit mode (double-click to exit edit mode)
3. **Export not working**: Check your browser's download settings and ensure JavaScript is enabled
4. **Images not loading**: Check your internet connection and try refreshing the page

### Development Issues

1. **Babel errors**: Ensure `NODE_ENV` is set to `development` or `production`
2. **Port conflicts**: Change the port with `PORT=3001 npm start`
3. **API rate limits**: The app includes built-in rate limiting, wait a moment and try again

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Search existing issues in the repository
3. Create a new issue with detailed information about your problem

---

**Happy Meme Making! 🎭✨**
