// App.tsx
import React from 'react';
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";

import Login from './components/Login';
import Register from './components/Register';
import { getAccessToken, isAccessTokenExpired } from './auth/auth';
import FileUpload from './components/FileUpload';
import MusicPlayer from './components/MusicPlayer';

const App:React.FC = () => {
  const token = getAccessToken();
  // isAccessTokenExpired();
  if (!token) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login key={Date.now()} />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={getAccessToken()?<h1>Not logged in</h1>:<FileUpload/>} />
        </Routes>
      </BrowserRouter>
    )
  }
  else{
    console.log(token );
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<FileUpload/>} />
          <Route path="/music" element={<MusicPlayer/>} />
        </Routes>
      </BrowserRouter>
    )
  }
  
}

export default App;
