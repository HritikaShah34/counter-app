import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    localStorage.setItem('username', newUsername);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://zankar-backend-5.onrender.com/user/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
          throw new Error('Login failed');
      }
      else
      navigate('/counter');
    } catch (error) {
        console.error('Error:', error.message);
        alert("Wrong username or password")
        setUsername('')
        setPassword('')
        
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-200">
      <form onSubmit={handleSubmit} className="m-4 bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-purple-900 text-center">Login</h2>
        <div className="mb-4">
          {/* <label htmlFor="username" className="block text-gray-700 font-semibold">Username</label> */}
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="mt-1 w-full border-b-2 border-purple-100 border-gray-400 rounded-md shadow-sm"
            placeholder='Enter Username'
            required
          />
        </div>
        <div className="mb-6">
          {/* <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label> */}
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="mt-1 w-full border-b-2 border-purple-100 border-gray-300 rounded-md shadow-sm"
            placeholder='Enter Password'
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-900 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:bg-purple-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SignIn;
