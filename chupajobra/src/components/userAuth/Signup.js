import React, {useState, useContext} from 'react' 
import {Link} from 'react-router-dom'
import axios from 'axios'
import UserContext from '../context/UserContext'

function SignUp() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPw, setconfirmPw] = useState('')
    const [err, setErr] = useState('')

    const {user, setUser} = useContext(UserContext)
    
    if(user) window.location = '/'

    let handleSubmit = (e) => {
        e.preventDefault()
        let newUser = {
            username,
            email,
            password,
            confirmPw
        }
        axios.post("http://localhost:5000/user/signup", newUser)
        .then((res) => {
            console.log(res.data);
            window.location = '/login'
        })
        .catch(err => {
            let error = err.response.data.split(' ')[0].toLowerCase().replace(/['"]+/g, '');
            setErr(error)
        })
        window.location = '/'
    }
    return (
        <div className='form-container body'>
            <h1 className='job-list-header'>Sign Up</h1>
            {err}
            <div className='form'>
            <form>
                <div>
                <label>Username</label>
                    <input 
                    type="text"
                    required
                    className={err === "username" ? "form-err" : ""}
                    placeholder="username"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    />
                </div>
                <div>
                <label>Email Address</label>
                    <input 
                    type="email"
                    required
                    className={err === "email" ? "form-err" : ""}
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
                    className={err === "password" ? "form-err" : ""}
                    placeholder="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <div>
                <label>Confirm Password</label>
                    <input
                    type="password"
                    required
                    className={err === "confirmPw" ? "form-err" : ""}
                    placeholder="confirm password"
                    id="confirmPw"
                    name="confirmPw"
                    value={confirmPw}
                    onChange={(e)=>setconfirmPw(e.target.value)}
                    />
                </div>
                    <button type='submit' onClick={(e)=>handleSubmit(e)}>Sign Up</button>
                </form>
                <h1>Sign Up With Facebook/Google/Pornhub</h1>
            </div>
            <div>
                <p>Already have an account? <Link to='login'>Sign in</Link></p>
            </div>
        </div>
    )
}

export default SignUp
