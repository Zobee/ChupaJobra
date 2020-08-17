import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import UserContext from '../context/UserContext'

const Login = () => {
    const {user, setUser} = useContext(UserContext)
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')

    useEffect(() => {
        console.log(err);
    },[err])

    let handleSubmit = async (e) => {
        e.preventDefault()
        const login = {
            email,
            password
        }

        await axios.post("http://localhost:5000/user/login", login)
        .then((res) => { 
            let token = res.data
            localStorage.setItem('auth-token', token)
        })
        .catch(err => {
            console.log(err.response.data);
            //Find a way to match error with input field
            //Probably a switch statement
            let error = err.response.data.split(' ')[0].toLowerCase().replace(/['"]+/g, '');
            setErr(error)
        })

        await axios.get("http://localhost:5000/user/", {
            headers: {
                'auth-token': localStorage.getItem('auth-token')
            }
        }) 
        .then(
            res => setUser(res.data)
        )
        .catch(err => {
            console.log(err.response.data);
            //Find a way to match error with input field
            //Probably a switch statement
            let error = err.response.data.split(' ')[0].toLowerCase().replace(/['"]+/g, '');
            setErr(error)
        })
        window.location = "/myJobs"
    }
    return (
        <div className='form-container body'>
        <h1 className='job-list-header'>Log In</h1>
        <div className='form'>
            <form>
                <label>Email Address</label>
                <input 
                type="text"
                required
                className={err === "email" ? "form-err" : ""}
                placeholder="Email"
                id="email"
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                type="password"
                required
                className={err === "password" ? "form-err" : ""}
                placeholder="password"
                id="password"
                name="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button type='submit' onClick={(e)=>handleSubmit(e)}>Log in</button>
            </form>
        </div>
        <div>
            <p>Don't have an account yet? <Link to='signup'>Sign Up Here</Link></p>
        </div>
    </div>
    )
}

export default Login
