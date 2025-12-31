import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // correct import
import app from '../firebase/firebase.config';
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Logged in 
        const user = userCredential.user;
        console.log("Logged in user:", user);

        navigate('/');
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError("Invalid email or password."); // User-friendly error
        console.error("Login Error:", errorMessage);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>
        </form>

        {/* social login */}
        <div className='text-center space-y-4'>
          <p className='text-gray-50'>Or login with</p>
          <div className='flex justify-center space-x-2'>
            <button className='flex items-center px-4 py-2 space-x-2 text-white bg-red-500 rounded hover:bg-red-700'><FaGoogle /> <span>Google</span></button>
            <button className='flex items-center px-4 py-2 space-x-2 text-white bg-blue-500 rounded hover:bg-blue-700'><FaFacebook /> <span>Facebook</span></button>
            <button className='flex items-center px-4 py-2 space-x-2 text-white bg-black rounded hover:bg-gray-700'><FaGithub /><span>Github</span></button>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;