import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAccessToken } from '../auth/auth';
import axios from 'axios'; // Import Axios
import { Button } from './ui/button';

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
      console.log('Login success', data);

      // Ensure that the token exists in the response
      if (data.token) {
        saveAccessToken(data.token);
        navigate("/", { replace: true });
      } else {
        setError('Wrong email or password');
      }
    } catch (error) {
      console.log('Error:', error);
      setError('Failed to log in');
    }
  };

  return (

    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col justify-center w-1/3">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email:
              <input
                type="text"
                value={formData.email}
                name="email"
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md"
              />
            </label>
            <br />
            <label className="block text-sm font-medium text-gray-700">
              Password:
              <input
                type="password"
                value={formData.password}
                name="password"
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md"
              />
            </label>
            <br />
            <Button className="inline-flex justify-center" variant="secondary" type="submit">
              Login
            </Button>
          </form>
        </div>
      </div>
      {error && <div>{error}</div>}
    </div >
  );
}

export default Login;