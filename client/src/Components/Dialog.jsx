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
    const navigate = useNavigate()
    const { handleOpenDialog, openDialog, fetchData, email } = useContext(AppContext)
    const [title, setTitle] = useState('')
    const handleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleSubmit = async (e) => {
        console.log("submitted")
        e.preventDefault()
        console.log("email", email)
        let { data } = await axios.post(`https://taskdone.glitch.me/api/newCollection`, {
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
                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 max-w-[400px] mx-auto">
                    <h1 className="text-[var(--text)] pt-6 pb-3 text-xl text-center">New Collection</h1>
                    <DialogBody className="p-0">
                        <div>
                            <Input type="text" name='title' value={title} onChange={handleChange} required color="white" label="Name of the collection" />
                        </div>
                    </DialogBody>
                    <div className="flex pb-6 w-full gap-3">
                        <button type="button" className="w-1/2 px-3 py-1 border border-[var(--primary)] text-[var(--primary)] rounded-lg" onClick={handleOpenDialog}>
                            <span>Cancel</span>
                        </button>
                        <input type="submit" className="w-1/2 px-3 py-1 bg-[var(--primary)] text-black rounded-lg" value={'Confirm'}>
                        </input>
                    </div>
                </form>
            </Dialog>
        </Fragment>
    );
}

export default DialogBox