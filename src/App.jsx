import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import MovieDetail from './pages/MovieDetail';
import Streaming from './pages/Streaming';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white p-4">
        {/* Navigation */}
        <nav className="py-4 border-b border-gray-800">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-400">
              MazFlix
            </h1>
            <div className="flex space-x-4">
              <Link to="/" className="text-white hover:text-blue-400 transition-colors">
                Home
              </Link>
              <Link to="/streaming" className="text-white hover:text-blue-400 transition-colors">
                🎬 What's Streaming
              </Link>
              <Link to="/favorites" className="text-white hover:text-blue-400 transition-colors">
                Favorites
              </Link>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <main className="py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/streaming" element={<Streaming />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </main>
        
        {/* Simple Footer */}
        <footer className="mt-8 pt-4 border-t border-gray-800 text-center text-gray-500">
          <p>© 2025 MazFlix - Your Ultimate Movie Experience</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;