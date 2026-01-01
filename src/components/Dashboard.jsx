import React from 'react'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
    const {currentUser} = useAuth();
    console.log("Current User is: ", currentUser)
  return (
    <div>
      <h1>This is Dashboard</h1>
    </div>
  )
}

export default Dashboard
