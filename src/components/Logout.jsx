import { getAuth, signOut } from 'firebase/auth'
import React from 'react'
import app from '../firebase/firebase.config'
const Logout = () => {
    const auth = getAuth(app);
    const handelLogout = () =>{
        signOut(auth).then(()=>{
            alert('User Signed out Successfully')
        }).catch((error) =>{
            console.log(error.message)
        })
    }
  return (
    <div>
      <button onClick={handelLogout} className='bg-red-500 text-white px-6 py-4 mt-5 text-semibold rounded-xl'>Logout</button>
    </div>
  )
}

export default Logout
