import { Fragment, useContext, useState } from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import List from "./List";
import { useNavigate } from "react-router-dom";
import { TrashIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
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
    const { fetchData, userData } = useContext(AppContext)
    const [open, setOpen] = useState(0);
    const navigate = useNavigate()
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };
    const handleDropCollection = async () => {
        let { data } = await axios.put(`http://localhost:5000/api/dropCollection`, {
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
                        {
                            props.tasks?.map((t, key) => {
                                return <List id={key} value={t.title} collection={props.title} />
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