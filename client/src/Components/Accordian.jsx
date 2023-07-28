import { Fragment, useState } from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import List from "./List";
import { useNavigate } from "react-router-dom";

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
    const [open, setOpen] = useState(0);
    const navigate=useNavigate()
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <Fragment>
            <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(1)} className="text-[var(--text)] hover:text-white text-lg bg-[var(--bg-secondary)] px-6">
                    <p className="font-light">{props.title}</p>
                </AccordionHeader>
                <AccordionBody className="bg-[var(--bg-secondary)] flex flex-col px-6">
                   <List id="1" value="Item 1"/>
                   <List id="2" value="Item 2"/>
                   <button className="py-1 text-gray-400" onClick={()=>navigate('/collection/work')}>Open Collection</button>
                </AccordionBody>
            </Accordion>
        </Fragment>
    );
}

export default Accordian