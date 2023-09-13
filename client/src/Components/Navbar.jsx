import { Button, Input } from '@material-tailwind/react'
import logo from '../assets/logo.svg'
import React, { useContext, useState } from 'react'
import { AppContext } from '../App'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState('')
    const [searchTask,setSearchTask] = useState([])
    const { openDrawerRight, handleOpenDialog, userData } = useContext(AppContext)
    const handleChange = (e) => {
        setSearchValue(e.target.value)
        let temp=[]
        userData?.collections.forEach((task)=>{
            task.title.toLowerCase().includes(searchValue.toLowerCase()) && temp.push(task.title)
            // task.title.toLowerCase().match(`/^searchValue.toLowerCase()$/`) && setSearchTask([task.title])
        })

        setSearchTask(temp)
    }
    const handleBlur=()=>{
        setTimeout(() => {
            setSearchTask([])
            setSearchValue('')
        }, 1000);
    }
    return (
        <nav className='flex sticky top-0 z-10 items-center bg-[var(--bg-secondary)] py-4 justify-between px-3 sm:px-10'>
            <div className='flex items-center gap-2'>

                <img src={logo} className='w-8' alt="logo" />
                <p className='text-[var(--primary)] text-2xl abel cursor-pointer' onClick={() => navigate('/dashboard')}>taskDone</p>
            </div>
            <div className='flex gap-6 items-center'>
                <button className='text-2xl bg-[var(--primary)] text-black px-2 rounded-lg hidden md:block' onClick={handleOpenDialog}>+</button>
                <div className='relative'>
                    <input type="text" placeholder='Search for collections' value={searchValue} onChange={handleChange} onBlur={handleBlur} className='bg-[var(--bg-primary)] px-3 py-2 focus:outline-none rounded-lg hidden md:block' />
                    <div className={`w-full p-4 bg-[var(--bg-secondary)] absolute ${searchValue.length<3 && 'hidden'} ${searchTask.length===0 && 'hidden'}`}>
                        <ul>
                            {searchValue.length > 2 &&
                                searchTask.map((ele, key) => {
                                    return <li key={key} className='mt-2 cursor-pointer border-b border-gray-600 py-2' onClick={()=>navigate(`/collection/${ele}`)}>{ele}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
                <button onClick={openDrawerRight} className=''>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
