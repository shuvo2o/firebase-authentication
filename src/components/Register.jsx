import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import app from '../firebase/firebase.config';
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  // console.log("email: ", email)
  // console.log("password: ", password)
  const auth = getAuth(app);
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        sendEmailVerification(user)
          .then(() => {
            // Email verification sent!
            setMessage("Registration successful! A varification email has been sent to your email address")
            console.log("Varification email has been sent", user.email)
            // ...
          }).catch(error => console.error("Error sending varification email", error.message));


        // optional for navigating to login page
        setTimeout(() => {
          alert("Registration successful!")
          navigate("/login")
          console.log("User signed:", user)
        }, 10000)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        // ..
      });
  }
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg'>
        <h2 className='text-2xl font-bold text-center text-gray-800'>Please Register</h2>
        {
          message && <p className='text-red-600 italic my-1 text-sm'>{message}</p>
        }
        <form onSubmit={handleRegister} className='space-y-4'>
          <div>
            <label className='block mb-2 text-sm font-medium text-gray-700'>Email: </label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder='Enter your email' className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent' />
          </div>
          <div>
            <label className='block mb-2 text-sm font-medium text-gray-700'>Password: </label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder='Enter your password' className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent' />
          </div>

          <button type='submit' className='w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700'>Sign Up</button>
        </form>

        {/* social login */}

        {/* social login */}
        <div className='text-center space-y-4'>
          <p className='text-gray-600'>Or signup with</p>
          <div className='flex justify-center space-x-4'>
            <button className='flex items-center px-4 py-2 space-x-2 text-white bg-red-500 rounded  hover:bg-red-600'>
              <FaGoogle /> <span>Google</span>
            </button>

            <button className='flex items-center px-4 py-2 space-x-2 text-white bg-blue-500 rounded  hover:bg-blue-600'> <FaFacebook /> <span>Facebook</span></button>

            <button className='flex items-center px-4 py-2 space-x-2 text-white bg-gray-800 rounded  hover:bg-gray-900'><FaGithub /> <span>GitHub</span></button>
          </div>
        </div>

        <p className='text-sm text-center text-gray-600'>Already have an account? Please  <Link to="/login" className='text-blue-600 hover:underline'>Log In</Link></p>
      </div>
    </div>
  )
}

export default Register