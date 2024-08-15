/* eslint-disable import/no-extraneous-dependencies */
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/forgetPassword' element={<ForgetPassword />} />
        <Route path='/reset-password' element={<ResetPassword />}/>
        {/* <Route path='/signup' element={<Signup />}></Route> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
