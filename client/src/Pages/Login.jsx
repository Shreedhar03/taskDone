import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";
import login from '../assets/login.svg'
import logo from '../assets/logo.svg'
import { AppContext } from "../App";
import axios from "axios";

const Login = () => {
    const { notify, fetchData } = useContext(AppContext)
    const move = useNavigate()
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let { data } = await axios.post("http://localhost:5000/login", credentials)
            if (data.success) {
                console.log(data)
                fetchData()
                move('/dashboard')
            }
            notify(data.message)
  
        }
        catch (err) {
            console.log("err", err)
        }
    }
    const handleSubmit2=async(e)=>{
        console.log("done")
        e.preventDefault()
        let {data} = await axios.get('http://localhost:5000/info');

        console.log(data.message)
    }
    useEffect(()=>{
        console.log(document.cookie)
    },[])
    return (
        <div className="flex max-w-5xl mx-auto justify-center items-start mt-24 bg-green-0">

            <div className="w-1/2">
                <img src={login} alt="login" className="mx-4 w-11/12 shrink-0 hidden md:block" />
            </div>

            <div className="w-full md:w-1/2 mx-4 shrink-0 flex flex-col items-center justify-center">
                <div className='flex items-center gap-2 my-6'>
                    <img src={logo} className='w-8' alt="logo" />
                    <p className='text-[var(--primary)] text-3xl abel'>taskDone</p>
                </div>
                <h2 className="text-[var(--text)] text-center text-xl">Login to your Account</h2>
                <form className="mt-8 mb-2" onSubmit={handleSubmit2}>
                    <div className="mb-4 flex flex-col gap-6 w-full">
                        <Input value={credentials.username} name="username" onChange={handleChange} autoComplete="off" required size="lg" label="Username" color="white" />
                        <Input value={credentials.password} name="password" onChange={handleChange} autoComplete="off" required type="password" size="lg" label="Password" color="white" />
                        <Button style={{ boxShadow: "none", background: "var(--primary)", color: "black" }} type="submit" label="Submit">Submit</Button>
                    </div>
                    <p className="mt-8 text-center font-normal text-gray-500">
                        Do not have an account ?{" "}
                        <Link to="/register" className="font-medium text-blue-500 transition-colors hover:text-blue-700">Register</Link>
                    </p>
                </form>
            </div>

        </div>
    );
}

export default Login