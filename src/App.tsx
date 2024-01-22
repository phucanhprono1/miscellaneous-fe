// App.tsx
import React from 'react';
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";

import Login from './components/Login';
import Register from './components/Register';
import { getAccessToken } from './auth/auth';

const App:React.FC = () => {
  const token = getAccessToken();
  if (!token) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<h1>Not logged in</h1>} />
        </Routes>
      </BrowserRouter>
    )
  }
  else{
    console.log(token)
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<h1>logged in</h1>} />
        </Routes>
      </BrowserRouter>
    )
  }
  
}

export default App;
