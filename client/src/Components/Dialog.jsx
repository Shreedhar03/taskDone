import { Fragment, useContext, useState } from "react";
import {
    Dialog,
    DialogBody,
    Input,
} from "@material-tailwind/react";
import { AppContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DialogBox = () => {
    const navigate=useNavigate()
    const { handleOpenDialog, openDialog, fetchData, email } = useContext(AppContext)
    const [title, setTitle] = useState('')
    const handleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleSubmit = async (e) => {
        console.log("submitted")
        e.preventDefault()
        console.log("email", email)
        let { data } = await axios.post(`http://localhost:5000/api/newCollection`, {
            title, email
        })
        // console.log(data)
        fetchData()
        handleOpenDialog()
        navigate('/dashboard')
    }
    return (
        <Fragment>

            <Dialog open={openDialog} size="xs" handler={handleOpenDialog} className="bg-[var(--bg-secondary)]">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-[var(--text)] pt-6 pb-3 text-xl text-center">New Collection</h1>
                    <DialogBody>
                        <div className="max-w-[300px] mx-auto flex justify-center">
                            <Input type="text" name='title' value={title} onChange={handleChange} required color="white" label="Enter name of your collection" />
                        </div>
                    </DialogBody>
                    <div className="flex justify-center max-w-[300px] mx-auto pb-6 gap-2">
                        <button type="button" className="px-3 py-1 w-1/2 border border-[var(--primary)] text-[var(--primary)] rounded-lg" onClick={handleOpenDialog}>
                            <span>Cancel</span>
                        </button>
                        <input type="submit" className="px-3 py-1 w-1/2 bg-[var(--primary)] text-black rounded-lg" value={'Confirm'}>
                            {/* <span>Confirm</span> */}
                        </input>
                    </div>
                </form>
            </Dialog>
        </Fragment>
    );
}

export default DialogBox