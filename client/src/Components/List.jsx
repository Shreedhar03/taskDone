import { Checkbox, Input, } from "@material-tailwind/react";
import { TrashIcon, PencilSquareIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import cross from '../assets/cross.svg'
import correct from '../assets/correct.svg'
import axios from "axios";
import { AppContext } from "../App";

const Lists = (props) => {
    const { fetchData, userData } = useContext(AppContext)
    const [editBox, setEditBox] = useState(false)
    const [newTask, setNewTask] = useState(props.value)

    const handleEditBox = () => {
        setEditBox(!editBox)
    }
    const handleDelete = async () => {
        console.log("delete item")
        let { data } = await axios.post(`http://localhost:5000/api/deleteTask`, {
            collection: props.collection, taskTitle: props.value, email: userData.email
        })
        console.log(data)
        fetchData()
    }
    const checkDone = () => {
        // fetchData()
        let done = userData?.collections?.filter(e => e.title === props.collection)[0].tasks.filter(e => e.title === props.value)[0]
        // console.log("done=", done)
        return done.completed
    }
    const handleOnChange = async () => {
        let { data } = await axios.post('http://localhost:5000/api/markDone', {
            collection: props.collection, taskTitle: props.value, email: userData.email
        })
        fetchData()

    }
    const handleEdit = async () => {
        let { data } = await axios.post('http://localhost:5000/api/editTask', {
            collection: props.collection, taskTitle: props.value, email: userData.email, newTask
        })
        setEditBox(!editBox)
        fetchData()
    }

    return (
        <div className="flex items-center w-full justify-between">
            {
                editBox ?
                    <div className="ml-3">
                        <Input label="Edit task" color="gray" style={{ width: "230px", color: "white" }} value={newTask} onChange={(e) => setNewTask(e.target.value)} />
                    </div>
                    :
                    <div className="flex items-center">
                        <Checkbox id={props.id} checked={checkDone() ? true : false} onChange={handleOnChange} />
                        <label htmlFor={props.id} className={`text-xl text-[var(--text)] ${checkDone() && 'text-gray-500 line-through'}`}>{props.value}</label>
                    </div>

            }
            <div className={`flex ${editBox ? 'gap-2' : 'gap-4'}`}>
                {
                    editBox ? <img src={correct} alt="correct" className="w-6 h-6" onClick={() => { handleEditBox(); handleEdit() }} /> : <PencilSquareIcon className="w-5 h-5" onClick={handleEditBox} />
                }
                {
                    editBox ? <img src={cross} alt="cross" className="w-6 h-6" onClick={handleEditBox} /> : <TrashIcon className="w-5 h-5" onClick={handleDelete} />
                }
            </div>
        </div>
    );
}

export default Lists