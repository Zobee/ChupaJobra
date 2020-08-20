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
        if(email === ""){
            setErr("email field is empty!")
            return;
        } else if(password === ""){
            setErr("password field is empty!")
            return;
        }
        let login = {
            email,
            password
        }

        await axios.post("http://localhost:5000/user/login", login)
        .then((res) => { 
            let token = res.data
            localStorage.setItem('auth-token', token)
        })
        .then(() => {
            axios.get("http://localhost:5000/user/", {
                headers: {
                    'auth-token': localStorage.getItem('auth-token')
                }
            }) 
            .then(
                res => setUser(res.data),
                window.location = "/myJobs"
            )
            .catch(err => {
                console.log(err.response.data);
                //Find a way to match error with input field
                //Probably a switch statement
                let error = err.response.data.toLowerCase().replace(/['"]+/g, '');
                setErr(error)
            })
        })
        .catch(err => {
            console.log(err.response.data);
            //Find a way to match error with input field
            //Probably a switch statement
            let error = err.response.data.toLowerCase().replace(/['"]+/g, '');
            console.log(error);
            setErr(error)
        })

    }
    return (
        <div className='form-container body'>
        <h1 className='job-list-header'>Log In</h1>
        <div className='form'>
            <h2>{err}.</h2>
        <form>
                <div>
                <label>Email Address</label>
                    <input 
                    type="email"
                    required
                    className={err.includes("email") ? "form-err" : ""}
                    placeholder="Email Address"
                    id='email'
                    name='email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div>
                <label>Password</label>
                    <input
                    type="password"
                    required
                    className={err.includes("password") ? "form-err" : ""}
                    placeholder="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                    <button type='submit' onClick={(e)=>handleSubmit(e)}>Sign Up</button>
                </form>
        </div>
        <div>
            <p>Don't have an account yet? <Link to='signup'>Sign Up Here</Link></p>
        </div>
    </div>
    )
}

export default Login
