import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase/firebase.config';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState(''); // Error message dekhanoar jonno
  const [success, setSuccess] = useState(false); // Success message-er jonno

  const auth = getAuth(app);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const { email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Registered User:", user);
        setSuccess(true);
        e.target.reset(); 
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error Code:", error.code);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
        
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input name="username" type="text" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500" onChange={handleChange} required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input name="email" type="email" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500" onChange={handleChange} required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input name="password" type="password" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500" onChange={handleChange} required />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
            <input name="confirmPassword" type="password" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500" onChange={handleChange} required />
          </div>

          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          {success && <p className="text-green-500 text-xs italic mb-4">Registration Successful!</p>}

          <button type="submit" className="w-full bg-green-500 text-white font-bold py-2 rounded-md hover:bg-green-600 transition">
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-green-500 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;