import { Link } from 'react-router'
import './App.css'
import Logout from './components/Logout'

function App() {

  return (
    <>
    <div className='p-5 container mx-auto'>
      <nav className='py-28 bg-slate-50'>
        <ul className='flex items-center justify-center space-x-4'>
          <li><Link className='px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700' to={"/register"}>Register</Link></li>
          <li><Link className='px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700' to={"/login"}>Login</Link></li>
        </ul>
      </nav>
      <Logout/>
    </div>
     <h1 className=''>App</h1>
    </>
  )
}

export default App
