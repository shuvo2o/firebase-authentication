import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import Dashboard from './components/Dashboard.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import PrivateRoute from './routers/PrivateRoute.jsx'
import UserProfile from './components/UserProfile.jsx'
import UpdateProfile from './components/UpdateProfile.jsx'
import UpdatePassword from './components/UpdatePassword.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/user-profile' element={<PrivateRoute><UserProfile /></PrivateRoute>} />
        <Route path='/update-user' element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
        <Route path='/reset-password' element={<PrivateRoute><UpdatePassword /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
)
