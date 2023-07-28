import { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from './Pages/Welcome'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import Collection from './Pages/Collection'
import Menu from './Components/Menu'
import Dialog from './Components/Dialog'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

export const AppContext = createContext()

function App() {
  const notify = (msg) => toast(msg);
  const [openRight, setOpenRight] = useState(false);
  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => setOpenDialog(!openDialog);
  const fetchData = async () => {
    try {
      let token
      const headers = { Authorization: `Bearer ${token}` }
      let { data } = await axios.get('http://localhost:5000/dashboard', { headers })
      console.log("user data : ", data)
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    console.log("useeffect of app.jsx")
    fetchData();
  }, [])

  return (
    <>
      <AppContext.Provider value={{ fetchData, notify, openRight, setOpenRight, openDrawerRight, closeDrawerRight, openDialog, setOpenDialog, handleOpenDialog }}>
        <BrowserRouter>

          <Menu />
          <Dialog />
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/collection/:id' element={<Collection />}></Route>
            {/* <Route path='/profile' element={<Profile />}></Route> */}
          </Routes>
          <ToastContainer autoClose={1500} theme='dark' position='top-center' />
        </BrowserRouter>

      </AppContext.Provider>
    </>
  )
}

export default App
