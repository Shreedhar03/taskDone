import { Fragment, useContext, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";
import { AppContext } from "../App";

const DialogBox = () => {
    const { handleOpenDialog, openDialog } = useContext(AppContext)

    return (
        <Fragment>
            
            <Dialog open={openDialog} size="xs" handler={handleOpenDialog} className="bg-[var(--bg-secondary)]">
                <h1 className="text-[var(--text)] pt-6 pb-3 text-xl text-center">New Collection</h1>
                <DialogBody>
                    <div className="max-w-[300px] mx-auto flex justify-center">
                        <Input type="text" color="white" label="Enter name of your collection" />
                    </div>
                </DialogBody>
                <div className="flex justify-center w-full py-6 gap-3">
                    <button className="px-3 py-1 w-full ml-10 border border-[var(--primary)] text-[var(--primary)] rounded-lg" onClick={handleOpenDialog}>
                        <span>Cancel</span>
                    </button>
                    <button className="px-3 py-1 w-full mr-10 bg-[var(--primary)] text-black rounded-lg" onClick={handleOpenDialog}>
                        <span>Confirm</span>
                    </button>
                </div>
            </Dialog>
        </Fragment>
    );
}

export default DialogBox