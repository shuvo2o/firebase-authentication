import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Registration Data:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
        
        <form onSubmit={handleSubmit}>
          {/* ... baki input fields ager motoi thakbe ... */}
          
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

          <button type="submit" className="w-full bg-green-500 text-white font-bold py-2 rounded-md hover:bg-green-600 transition">
            Register
          </button>
        </form>

        {/* Ekhane a tag-er bodole Link use kora hoyeche */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-green-500 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;