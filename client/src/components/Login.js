import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

function Login(props) {
    const host = '/.netlify/functions/index'
    const [cred, setcred] = useState({ email: "", password: "" })
    let history = useHistory()
    const onchange = (e) => {
        setcred({ ...cred, [e.target.name]: e.target.value })
    }
    const handlesubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: cred.email, password: cred.password })
        });
        const json = await response.json();
        if (json.success) {
            //save the auth token and redirect
            localStorage.setItem('token', json.authtoken)
            history.push("/")
            props.showalert('Logged in successfully', 'success')
        }
        else {
            props.showalert('Invalid Credentials!!!!', 'danger')
            setcred({ email: "", password: "" })
        }
    }
    return (
        <>
            <div className='border-gray-300 shadow-lg border-2 my-16 p-4 rounded-xl'>
                <h1 className='text-2xl font-bold mb-4'>Login to CloudNotes :</h1>
                <form onSubmit={handlesubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" value={cred.email} name="email" id="email" onChange={onchange} aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" value={cred.password} name="password" id="password" onChange={onchange} />
                    </div>
                    <button type="submit" className="btn btn-primary text-sky-600 font-bold mt-2" >Submit</button>
                </form>
                <div className='mt-4'>
                    <p>New to CloudNotes? Create an account</p>
                    <Link className="btn btn-outline-primary text-sky-600 font-bold mt-2" to="/signup" role="button">Sign up</Link>
                </div>
            </div>
        </>
    )
}

export default Login
