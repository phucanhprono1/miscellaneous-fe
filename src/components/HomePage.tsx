import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { saveAccessToken } from '../auth/auth';
import axios from 'axios'; // Import Axios
import { useState } from 'react';

function HomePage() {
    return (
        <div>
            <h1 className='text-6xl text-red-500'>Welcome to the Music Web Application!</h1>
            <p>Explore and discover your favorite music.</p>
            <Link to='/login' className='text-blue-500'>Login</Link>
            
        </div>
    );
};

export default HomePage;
