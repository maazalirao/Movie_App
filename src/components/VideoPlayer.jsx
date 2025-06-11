import React, { useState } from 'react';
import ReactPlayer from 'react-player';

// Simple video player component for watching movies
function VideoPlayer({ movieTitle, videoUrl }) {
  // State to track if video is playing
  const [playing, setPlaying] = useState(false);
  // State to track if video controls are visible
  const [showControls, setShowControls] = useState(true);

  // Function to handle play/pause
  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  return (
    <div className="w-full bg-black rounded-lg overflow-hidden">
      {/* Video Player Container */}
      <div className="relative aspect-video">
        {videoUrl ? (
          // React Player for video playback
          <ReactPlayer
            url={videoUrl}
            width="100%"
            height="100%"
            playing={playing}
            controls={showControls}
            config={{
              file: {
                attributes: {
                  crossOrigin: 'anonymous',
                }
              }
            }}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={(error) => {
              console.error('Video playback error:', error);
            }}
          />
        ) : (
          // Fallback when no video URL is available
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-xl mb-2">Video Not Available</h3>
              <p className="text-gray-400">
                We're working on getting "{movieTitle}" ready for you!
              </p>
              <button 
                className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                onClick={() => alert('Feature coming soon!')}
              >
                Request This Movie
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Video Controls (if needed) */}
      {videoUrl && (
        <div className="p-4 bg-gray-900">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold">{movieTitle}</h3>
            <div className="flex gap-2">
              <button
                onClick={handlePlayPause}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
              >
                {playing ? '⏸️ Pause' : '▶️ Play'}
              </button>
              <button
                onClick={() => setShowControls(!showControls)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
              >
                {showControls ? 'Hide Controls' : 'Show Controls'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;