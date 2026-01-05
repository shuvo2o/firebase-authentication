import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {currentUser} = useAuth();
    if(currentUser){
        return children
    }
  return (
    <div>

      <Navigate to = '/login'/>
    </div>
  )
}

export default PrivateRoute
