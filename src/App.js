import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [videoSrc, setVideoSrc] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedVideo) {
      setIsPlaying(true);
      const videoUrl = `http://localhost:8000/video?type=${selectedVideo}`;
      setVideoSrc(videoUrl);
    }
  };
  const handleStopStream = () => {
    setIsPlaying(false);
    setSelectedVideo("");
    setVideoSrc('');
  };

  return (
    <div className="App">
      <h1>VidMate</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <h4>Select Video to Stream:</h4>
          <select value={selectedVideo} onChange={(e) => setSelectedVideo(e.target.value)}>
            <option value="">--Choose an option--</option>
            <option value="movie">Movie</option>
            <option value="nature">Nature</option>
            <option value="coding">Coding</option>
          </select>
        </label>
        {isPlaying ? (
          <button onClick={()=>handleStopStream()} className='btn'>Stop Stream</button>
        ) : (
          <button type="submit" className='btn' disabled={!selectedVideo}>Start Stream</button>
        )}
      </form>
      {videoSrc && (
        <video width="720" className='vid' controls>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default App;
