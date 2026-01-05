import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const UpdateProfile = () => {
    const {currentUser, updateUserProfile} = useAuth();

    const [name, setName] = useState("")
    const [photoURL, setPhotoURL] = useState("");
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleUpdateProfile  = async (e) => {
        e.preventDefault();
        
        try {
            await updateUserProfile({
                displayName: name || currentUser.displayName,
                photoURL: photoURL || currentUser.photoURL,
            })
            alert("Profile updated successfully")
            setSuccessMessage("Profile updated successfully");
            setErrorMessage("")
        } catch (error) {
            setErrorMessage("Failed to update profile")
            setSuccessMessage("")
        }
    }
  return (
    <div className='p-8 space-y-4'>
        <h1 className='text-2xl font-bold'>Update Your Profile</h1>
        <p>Current Display Name: {currentUser?.displayName || "Not Set Yet"}</p>
        <p>Current Photo URL: </p>
        {
            currentUser?.photoURL ? (<img src={currentUser?.photoURL} alt="" />) : <span>No Image found</span>
        }

        {/* update profile form */}
        <form onSubmit={handleUpdateProfile} className='shadow p-4 max-w-sm space-y-2'>
            <div className='space-y-y'>
                <label className='block'>  New Display Name:</label>
                <input value={name}  
                onChange={(e) => setName(e.target.value)}
                type="text" name='name' id='name' 
                placeholder='Set New Name' className='border p-2'/>
            </div>
            <div className='space-y-2'>
                <label className='block'> New Photo URL:</label>
                <input 
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                type="text" name='photoURL' id='photoURL' placeholder='Set photoURL' className='border p-2'/>
            </div>

            <button type='submit' className='bg-blue-500 text-white font-medium px-6 py-2 rounded'>Update Profile</button>

            {
                successMessage && <p className='text-green-500 text-sm italic'>{successMessage}</p>
            }
            {
                errorMessage && <p className='text-red-500 text-sm italic'>{errorMessage}</p>
            }
        </form>
    </div>
  )
}

export default UpdateProfile

