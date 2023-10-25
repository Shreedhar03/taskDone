import { Fragment, useContext, useState } from "react";
import { Dialog, DialogBody, Input } from "@material-tailwind/react";
import { AppContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const DialogBox = () => {
  const navigate = useNavigate();
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const { handleOpenDialog, openDialog, fetchData, email } =
    useContext(AppContext);
  const [title, setTitle] = useState("");
  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const handelEmojiSelect = (emoji) => {
    setTitle((title) => title + emoji?.native);
  };
  const handleSubmit = async (e) => {
    console.log("submitted");
    e.preventDefault();
    console.log("email", email);
    let { data } = await axios.post(
      `https://taskdone.glitch.me/api/newCollection`,
      {
        title,
        email,
        token: Cookies.get("token"),
      }
    );
    fetchData();
    handleOpenDialog();
    navigate("/dashboard");
  };
  function handelEmojiClick() {
    setEmojiPickerOpen((prev) => !prev);
  }
  return (
    <Fragment>
      <Dialog
        open={openDialog}
        size="xs"
        handler={handleOpenDialog}
        className="bg-[var(--bg-secondary)]"
      >
        <form
          onSubmit={handleSubmit}
          className="p-6 flex flex-col gap-4 max-w-[400px] mx-auto"
        >
          <h1 className="text-[var(--text)] pt-6 pb-3 text-xl text-center">
            New Collection
          </h1>
          <DialogBody className="p-0">
            <div className="flex flex-col gap-3">
              <div className="relative">
                <button
                  className="text-white z-10 absolute translate-y-2 right-2"
                  onClick={handelEmojiClick}
                >
                  <svg
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                    preserveAspectRatio="xMidYMid meet"
                    class="text-inherit"
                    version="1.1"
                    x="0px"
                    y="0px"
                    enable-background="new 0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M9.153,11.603c0.795,0,1.439-0.879,1.439-1.962S9.948,7.679,9.153,7.679 S7.714,8.558,7.714,9.641S8.358,11.603,9.153,11.603z M5.949,12.965c-0.026-0.307-0.131,5.218,6.063,5.551 c6.066-0.25,6.066-5.551,6.066-5.551C12,14.381,5.949,12.965,5.949,12.965z M17.312,14.073c0,0-0.669,1.959-5.051,1.959 c-3.505,0-5.388-1.164-5.607-1.959C6.654,14.073,12.566,15.128,17.312,14.073z M11.804,1.011c-6.195,0-10.826,5.022-10.826,11.217 s4.826,10.761,11.021,10.761S23.02,18.423,23.02,12.228C23.021,6.033,17.999,1.011,11.804,1.011z M12,21.354 c-5.273,0-9.381-3.886-9.381-9.159s3.942-9.548,9.215-9.548s9.548,4.275,9.548,9.548C21.381,17.467,17.273,21.354,12,21.354z  M15.108,11.603c0.795,0,1.439-0.879,1.439-1.962s-0.644-1.962-1.439-1.962s-1.439,0.879-1.439,1.962S14.313,11.603,15.108,11.603z"
                    ></path>
                  </svg>
                </button>
                <Input
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleChange}
                  required
                  color="white"
                  className="!pe-10"
                  label="Name of the collection"
                />
              </div>
              <div
                className={`${emojiPickerOpen ? "hidden" : "block"}`}
                aria-hidden={!emojiPickerOpen}
              >
                <Picker data={data} onEmojiSelect={handelEmojiSelect} />
              </div>
            </div>
          </DialogBody>
          <div className="flex pb-6 w-full gap-3">
            <button
              type="button"
              className="w-1/2 px-3 py-1 border border-[var(--primary)] text-[var(--primary)] rounded-lg"
              onClick={handleOpenDialog}
            >
              <span>Cancel</span>
            </button>
            <input
              type="submit"
              className="w-1/2 px-3 py-1 bg-[var(--primary)]  text-black rounded-lg"
              value={"Confirm"}
            ></input>
          </div>
        </form>
      </Dialog>
    </Fragment>
  );
};

export default DialogBox;
