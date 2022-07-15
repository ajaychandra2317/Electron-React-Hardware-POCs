import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import StillPicture from './components/StillPicture';
import TakeVideo from './components/TakeVideo';
import AudioControls from './components/AudioControls';
import MicControls from './components/MicControls';

// Upload to local seaweedFS instance
const uploadImage = async (file: string | Blob) => {
  const formData = new FormData();
  formData.append('file', file);
};

const Routing = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/picture" element={<StillPicture sendFile={uploadImage}/>} />
        <Route path="/video" element={<TakeVideo />} />
        <Route path="/audio" element={<AudioControls url='http://streaming.tdiradio.com:8000/house.mp3'/>} />
        <Route path="/mic" element={<MicControls />} />
      </Routes>
    </Router>
  )
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <Routing />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
