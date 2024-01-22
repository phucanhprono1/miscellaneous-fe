import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { saveAccessToken } from '../auth/auth';
function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phone: '',
        address: '',
        username: '',
        gender: '',
      });
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/register`, formData);
          const token = response.data.token; // Assuming your API returns a token
          saveAccessToken(token);
        navigate("/");
        } catch (error) {
          console.error(error); // Handle error
        }
      };
    
      return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
          {/* Render your form inputs here */}
          <div>
            <label>Email:</label>
            <input type="text" name="email" onChange={handleChange} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" onChange={handleChange} />
          </div>
          <div>
            <label>Phone:</label>
            <input type="text" name="phone" onChange={handleChange} />
          </div>
          <div>
            <label>Address:</label>
            <input type="text" name="address" onChange={handleChange} />
          </div>
          <div>
            <label>Username:</label>
            <input type="text" name="username" onChange={handleChange} />
          </div>
          <div>
            <label>Gender:</label>
            <input type="text" name="gender" onChange={handleChange} />
          </div>
          <div>
            <button type="submit">Register</button>
          </div>
        </form>
        </div>
        
      );
}
export default Register