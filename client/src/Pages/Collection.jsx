import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import item from '../assets/item.svg'
import { Input } from '@material-tailwind/react'
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import Lists from '../Components/List';
import { Chart } from '../Components/Chart';
import { AppContext } from '../App';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Collection = () => {
    const [task,setTask] = useState('')
    const { fetchData, userData } = useContext(AppContext)
    const { id } = useParams()
    useEffect(() => {
        fetchData()
    }, [])
    const handleChange = (e)=>{
        setTask(e.target.value)
    }
    const handleAddTask = async (e) => {
        e.preventDefault()
        let {data} = await axios.post(`http://localhost:5000/api/addTask`,{
            collectionName:id,taskTitle:task,email:userData.email
        })
        console.log(data)
        setTask('')
        fetchData()
    }
    return (
        <>
            <Navbar />
            <div className='flex flex-col gap-12 items-center sm:items-start sm:mx-2 md:mx-8 lg:mx-24 mt-14'>
                <div className='flex items-center gap-2'>
                    <img src={item} alt="menu" className='w-8' />
                    <p className='text-2xl'>{id}</p>
                </div>
                <form className='w-72 relative' onSubmit={handleAddTask}>
                    <Input variant='outlined' value={task} onChange={handleChange} color='white' label='Add task' />
                    <input type="submit" value={"+"} className='absolute top-1 right-3 text-3xl font-extralight abel' />
                    <button className='flex items-center gap-2 mt-3 cursor-pointer opacity-40' type='button'>
                        <CalendarDaysIcon className='w-5' /><span className='text-sm'>Set date and time</span>
                    </button>
                </form>
            </div>
            <div className='flex-col gap-12 md:gap-0 my-24 md:my-0 md:flex-row flex items-start justify-between max-w-5xl mx-2 md:mx-8 lg:mx-24'>
                <div className='w-[300px] sm:w-[350px] mt-12'>
                    {
                        userData?.collections?.filter(e => e.title === id)[0]?.tasks?.map((t, key) => {
                            return <Lists id={key} key={key} value={t.title} />
                        })
                    }
                </div>
                <div className='w-60 sm:w-80'>
                    <Chart />
                </div>
            </div>
        </>
    )
}

export default Collection
