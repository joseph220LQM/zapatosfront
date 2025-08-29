import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import RequireAuth from './components/RequireAuth'
import Register from './components/Register'
import { ToastContainer } from 'react-toastify';
import Login from './components/Login'
import Tienda from './components/Tienda';
import MisVentas from './components/MisVentas';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <BrowserRouter>
      {/* <Navigation/> */}
      <Routes>
        <Route index element={<Login />}></Route>
        <Route path="/Tienda" element={<RequireAuth> <Tienda /></RequireAuth>}></Route>
        <Route path="/MisVentas" element={<RequireAuth> <MisVentas /></RequireAuth>}></Route>
        <Route path="/Register" element={<Register />}></Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </BrowserRouter>
  )
}

export default App
