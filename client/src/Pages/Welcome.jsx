import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import welcome from '../assets/welcome.svg'

const Welcome = () => {
    const navigate=useNavigate()
    return (
        <>
            <div className='bg-green-20 max-w-6xl mx-auto my-24'>
                <div className='flex items-center gap-2 mx-6 md:mx-12'>
                    <img src={logo} className='w-12' alt="logo" />
                    <p className='text-[var(--primary)] text-5xl abel'>taskDone</p>
                </div>

                <div className='flex items-center justify-center mt-12 gap-8 mx-6 md:mx-12'>
                    <div className='flex flex-col gap-8 md:w-1/2'>
                        <p className='text-4xl'>Ready to take control of your tasks?</p>
                        <p className='text-xl'>Unlock your full potential with our sleek and efficient todo web application.</p>
                        <div className='flex flex-col md:flex-row gap-3'>
                            <button className='border border-[var(--primary)] rounded-lg text-[var(--primary)] px-4 py-2' onClick={()=>navigate('/register')}>Sign up</button>
                            <button className='bg-[var(--primary)] text-black rounded-lg px-4 py-2' onClick={()=>navigate('/login')}>Login</button>
                        </div>
                    </div>
                    <img src={welcome} alt="welcome" className='w-1/2 h-auto hidden md:block' />
                </div>
            </div>
        </>
    )
}

export default Welcome
