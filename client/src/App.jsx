import { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
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
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth'

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export const AppContext = createContext()
const getPic = ()=>{
  return localStorage.getItem('userPic') || ''
}
const getName = ()=>{
  return localStorage.getItem('userName') || ''
}
function App() {
  const [email, setEmail] = useState(''); // use localstorage
  const [userPic,setUserPic]=useState(getPic())
  const [userName,setUserName]=useState(getName())
  const [userData, setUserData] = useState();
  const [isLoading,setIsLoading]=useState(0)
  const notify = (msg) => toast(msg);
  const goto = useNavigate()
  const [openRight, setOpenRight] = useState(false);
  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => setOpenDialog(!openDialog);

  const fetchData = () => {
    let userMail;
    onAuthStateChanged(auth, async user => {
      if (user) {
        userMail = user.email
        try {
          let { data } = await axios.post('https://taskdone.glitch.me/api/dashboard', { email: userMail })
          setUserData(data?.userData)
          console.log("data fetched")
          setIsLoading(1)
        }
        catch (err) {
          console.log(err)
        }
      }
    })
  }
  const handleAddTask = async (e,id,task,setTask) => {
    setIsLoading(0)
    e.preventDefault()
    let { data } = await axios.post(`https://taskdone.glitch.me/api/addTask`, {
        collectionName: id, taskTitle: task, email: userData.email
    })
    console.log("task added")
    setTask('')
    fetchData()
}
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        setEmail(result.user.email)
        localStorage.setItem('userPic',result.user.photoURL)
        localStorage.setItem('userName',result.user.displayName)
        setUserName(result.user.displayName)
        setUserPic(result.user.photoURL)
        let { data } = await axios.post('https://taskdone.glitch.me/api/createUser', { email: result.user.email })
        console.log('------------------------------', data)
        goto('/dashboard')
      })
      .catch((err) => {
        goto('/err', {
          state: {
            errorMessage: err
          }
        })
        console.log('error signing in', err)
      })
  }
  const signOutWithGoogle = () => {
    signOut(auth)
      .then(() => {
        console.log('Sign-out successful!')
        goto('/')
      })
      .catch((error) => {
        console.error('Error signing out:', error)
      })
  }
  const checkAuthState = () => {
    onAuthStateChanged(auth, (user) => {
      setEmail(user?.email)
      user && fetchData()
      console.log('user', user?.email)
      user ? goto('/dashboard') : goto('/')
    })
  }

  useEffect(() => {
    checkAuthState()
  }, [])

  return (
    <>
      <AppContext.Provider value={{ handleAddTask,isLoading,setIsLoading,checkAuthState, signInWithGoogle, signOutWithGoogle, userData, email, setEmail,userPic,userName, fetchData, notify, openRight, setOpenRight, openDrawerRight, closeDrawerRight, openDialog, setOpenDialog, handleOpenDialog }}>
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
      </AppContext.Provider>
    </>
  )
}

export default App
