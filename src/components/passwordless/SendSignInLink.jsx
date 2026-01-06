import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';
import React, { useState } from 'react'
import app from '../../firebase/firebase.config';

const SendSignInLink = () => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const auth = getAuth(app);
    const actionCodeSettings ={
        url: 'http://localhost:5173/finish-signup',
        handleCodeInApp: true,
    }

    const handleSendSignInLink = async (e) => {
        e.preventDefault();

        try {
            await sendSignInLinkToEmail(auth, email, actionCodeSettings)
            window.localStorage.setItem("emailForSignIn", email)
            setMessage("Sign-in link sent successfully to your email address. Please check your inbox")

        } catch (error) {
            console.error("Error sending email link:", error.message)
            setMessage("Failed to send email link. Please try again.")
        }

    }
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='w-full max-w-md p-8 bg-white shadow-md rounded-lg '>
            <h2 className='text-2xl font-bold text-center text-gray-800 my-4'>Sign In with Email Link</h2>

            {
                message && <p className='p-2 my-2 text-sm text-center text-blue-600'>{message}</p>
            }

            <form onSubmit={handleSendSignInLink} className='space-y-4'>
                <div>
                    <label className='block mb-2 text-sm font-medium text-gray-700'>Email Address:</label>
                    <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" placeholder='Enter your email' 
                    className='w-full px-4 py-2 border rounded-md focus:outline-none'
                    required
                    />
                </div>
                <button type='submit' className='w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-800'>Send Sign-In Link</button>
            </form>
        </div>
    </div>
  )
}

export default SendSignInLink