import React, { useContext, useState } from 'react'
import { Input, Button } from '@material-tailwind/react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../App'

const Register = () => {
    const { notify } = useContext(AppContext)
    const move = useNavigate()
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (credentials.password !== credentials.confirmPassword) {
            notify("Passwords do not match")
            return
        }
        try {
            let { data } = await axios.post("http://localhost:5000/api/signup", credentials)
            if (data.success) {
                console.log("Registered : " , data)
                notify(data.message)
                move('/login')
            }
            else {
                notify(data.message)
            }
        }
        catch (err) {
            console.log("err", err.message)
        }
    }
    return (
        <>
            <div className='mt-12'>
                <h1 className='text-[var(--text)] text-center text-xl mx-8'>Register to Get Started With <span className='text-[var(--primary)]'>taskDone.</span></h1>
                <div className='flex justify-center mt-12'>
                    <form className='flex flex-col gap-3 w-72' onSubmit={handleSubmit}>
                        {/* <Input color='gray' required style={{ color: "white" }} autoComplete='off' value={credentials.name} name="name" onChange={handleChange} label='Full name'></Input>
                        <Input color='gray' required pattern='[0-9]{10}' maxLength={10} style={{ color: "white" }} autoComplete='off' value={credentials.contact} name="contact" onChange={handleChange} label='Contact'></Input> */}
                        <Input color='gray' required style={{ color: "white" }} autoComplete='off' value={credentials.email} name="email" onChange={handleChange} label='Email' type='email'></Input>
                        <Input color='gray' required style={{ color: "white" }} autoComplete='off' value={credentials.password} name="password" onChange={handleChange} label='Password' type='password'></Input>
                        <Input color='gray' required style={{ color: "white" }} autoComplete='off' value={credentials.confirmPassword} name="confirmPassword" onChange={handleChange} label='Confirm Password' type='password'></Input>
                        <Button style={{ boxShadow: "none", background: "var(--primary)", color: "black" }} type="submit" label="Submit">Register</Button>
                        <p className="mt-8 text-center font-normal text-gray-500">
                            Already have an account ?{" "}
                            <Link to="/login" className="font-medium text-blue-500 transition-colors hover:text-blue-700">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
