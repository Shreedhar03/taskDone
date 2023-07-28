import { Checkbox, Input, } from "@material-tailwind/react";
import { TrashIcon, PencilSquareIcon,CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import cross from '../assets/cross.svg'
import correct from '../assets/correct.svg'

const Lists = (props) => {
    const [editBox, setEditBox] = useState(false)
    const handleEditBox = () => {
        setEditBox(!editBox)
    }
    return (
        <div className="flex items-center w-full justify-between">
            {
                editBox ?
                    <div className="ml-2">
                        <Input label="Edit task" color="gray" style={{ width: "270px", color: "white" }} />
                    </div>
                    :
                    <div className="flex items-center">
                        <Checkbox id={props.id} className="checked:line-through" />
                        <label htmlFor={props.id} className="text-xl text-[var(--text)] checked:text-red-500">{props.value}</label>
                    </div>

            }
            <div className={`flex ${editBox ? 'gap-2' : 'gap-4' }`}>
                {
                    editBox ? <img src={correct} alt="correct" className="w-6 h-6" onClick={handleEditBox}/> : <PencilSquareIcon className="w-5 h-5" onClick={handleEditBox} />
                }
                {
                   editBox ? <img src={cross} alt="cross" className="w-6 h-6"  onClick={handleEditBox}/> : <TrashIcon className="w-5 h-5" />
                }
            </div>
        </div>
    );
}

export default Lists