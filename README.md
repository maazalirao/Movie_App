# MazFlix - Your Ultimate Movie Experience 🎬

A modern, responsive movie streaming application built with React and Vite. Browse trending movies, search for your favorites, and watch them with our integrated video player!

## Features ✨

- **Browse Popular Movies**: Discover trending and popular movies from TMDB
- **Search Functionality**: Find any movie quickly with real-time search
- **Video Player**: Watch movies with a built-in video player
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Clean UI**: Modern dark theme with smooth animations
- **Movie Details**: View detailed information about each movie

## Getting Started 🚀

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd Movie-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Go to `http://localhost:5173`
   - Start browsing and watching movies!

## How to Add Movies 🎥

To add video content for movies:

1. Open `src/services/videoApi.js`
2. Find the `SAMPLE_VIDEOS` object
3. Add your movie video URLs:
   ```javascript
   const SAMPLE_VIDEOS = {
     '123': 'https://your-video-url.mp4', // Movie ID from TMDB
     '456': 'https://another-video-url.mp4',
   };
   ```

**Important**: Only use videos you have legal rights to use!

## Technology Stack 💻

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **React Player**: Video playback component
- **TMDB API**: Movie data and information

## Project Structure 📁

```
src/
├── components/          # Reusable UI components
│   ├── MovieCard.jsx   # Movie display card
│   └── VideoPlayer.jsx # Video player component
├── pages/              # Page components
│   ├── Home.jsx        # Home page with movie grid
│   ├── Favorites.jsx   # Favorites page
│   └── MovieDetail.jsx # Movie detail and video page
├── services/           # API and external services
│   ├── api.js          # TMDB API functions
│   └── videoApi.js     # Video URL management
└── App.jsx             # Main app component
```

## Available Scripts 📜

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing 🤝

This is a learning project! Feel free to:
- Add new features
- Improve the UI/UX
- Fix bugs
- Add more video sources
- Enhance the video player

## License 📄

This project is for educational purposes. Make sure to follow all legal requirements when using movie content.

---

**Made with ❤️ for learning React and building awesome movie experiences!**
