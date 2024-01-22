import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAccessToken } from '../auth/auth';
import axios from 'axios'; // Import Axios

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loginUrl = `${process.env.REACT_APP_API_URL}/api/v1/auth/authenticate`;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.post(loginUrl, loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;
      console.log('Login success');
      saveAccessToken(data.token);
      navigate("/");
    } catch (error) {
      console.log('Error:', error);
      setError('Failed to log in');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text" value={formData.email} name="email" onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={formData.password} name="password" onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>

      {error && <div>{error}</div>}
    </div>
  );
}

export default Login;
