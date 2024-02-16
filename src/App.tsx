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
import HomePage from './components/HomePage';

function App(){

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/music" element={<MusicPlayer id={''} />} />
      </Routes>
    </BrowserRouter>
  )


}

export default App;
