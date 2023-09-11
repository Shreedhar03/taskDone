import { Fragment, useContext, useState } from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Input,
} from "@material-tailwind/react";
import List from "./List";
import { useNavigate } from "react-router-dom";
import { TrashIcon, ArrowsPointingOutIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { AppContext } from "../App";

function Icon({ id, open }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${id === open ? "rotate-180" : ""
                } h-5 w-5 transition-transform`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    );
}

const Accordian = (props) => {
    const { fetchData, userData, handleAddTask } = useContext(AppContext)
    const [open, setOpen] = useState(0);
    const [task, setTask] = useState('')
    const navigate = useNavigate()
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };
    const handleDropCollection = async () => {
        let { data } = await axios.put(`https://satin-gleaming-gateway.glitch.me/api/dropCollection`, {
            name: props.title,
            email: userData?.email
        })
        console.log(data)
        fetchData()
    }
    return (
        <div className='shrink-0'>
            <Fragment>
                <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                    <AccordionHeader onClick={() => handleOpen(1)} className="text-[var(--text)] hover:text-white text-lg bg-[var(--bg-secondary)] px-6">
                        <p className="font-light">{props.title}</p>
                    </AccordionHeader>
                    <AccordionBody className="bg-[var(--bg-secondary)] flex flex-col pr-6 pl-2">
                        <form className='w-72 relative my-6 px-2' onSubmit={(e)=>{handleAddTask(e,props.title,task,setTask)}}>
                            <Input variant='outlined' value={task} onChange={(e) => setTask(e.target.value)} color='white' label='Add task' />
                            <input type="submit" value={"+"} className='absolute top-[2px] right-5 text-3xl font-extralight abel' />
                            <button className='flex items-center gap-2 mt-3 cursor-pointer opacity-40' type='button'>
                                <CalendarDaysIcon className='w-5' /><span className='text-sm'>Set date and time</span>
                            </button>
                        </form>
                        {
                            props.tasks?.map((t, key) => {
                                return <List id={key} value={t.title} collection={props.title} done={t.completed} />
                            })
                        }
                        <div className="flex items-center gap-4 justify-end mt-4 mx-2">
                            <button className="py-1 text-gray-400 flex gap-2 items-center" onClick={handleDropCollection}>Drop Collection
                                <TrashIcon className="w-4" />
                            </button>
                            <button className="py-1 text-gray-400 flex gap-2 items-center" onClick={() => navigate(`/collection/${props.title}`)}>Open Collection
                                <ArrowsPointingOutIcon className="w-4" />
                            </button>
                        </div>
                    </AccordionBody>
                </Accordion>
            </Fragment>
        </div>
    );
}

export default Accordian