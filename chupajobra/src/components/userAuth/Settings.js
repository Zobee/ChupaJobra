import React, {useState, useEffect} from 'react'
import axios from 'axios'

{/* <div className='settings'>
            <h1 className="job-list-header">Settings</h1>
            <div className='settings-container'>
                <div className='settings-well'>
                    <h1>User Credentials</h1>
                    Change Your Username:
                    <input type='text'/>
                    <button>Change</button>

                    Change Your Password:
                    <input type='text'/>
                    <button>Change</button>
                </div>
                <div className='settings-well'>
                    <h1>Big Boi Account Changes</h1>
                    Clear Job list
                    <button>Clear Jobs</button>
                    
                    Delete Account:
                    <button>Delete Account</button>
                </div>
            </div>
        </div> */}

function Settings() {
    return (
        <div className='form-container body'>
        <h1 className='job-list-header'>Account Settings</h1>
        <div className='form'>
        <form>
            <h5>User Credentials:</h5>
            <div>
            <p>Change Your Username:</p>
            <label>New Username:</label>
                <input 
                type="text"
                placeholder="New username"
                id="newUsername"
                name="newUsername"
                />
                <button className='settings-btn'>Change Username</button>
            </div>
            <div>
            <p>Change Your Password:</p>
            <label>Current Password</label>
                <input 
                type="password"
                placeholder="My Old Password"
                id='oldPw'
                name='oldPw'
                />

            <label>New Password</label>
                <input 
                type="password"
                placeholder="My New Password"
                id='newPw'
                name='newPw'
                />
            <button className='settings-btn'>Update Password</button>
            </div>
            <div>
            <p>Job And Account Settings:</p>
            <label>Password</label>
                <input
                type="password"
                required
                placeholder="password"
                id="password"
                name="password"
                />
            </div>
            <div>
            <label>Confirm Password</label>
                <input
                type="password"
                required
                placeholder="confirm password"
                id="confirmPw"
                name="confirmPw"
                />
            </div>
                <button type='submit'>Sign Up</button>
            </form>
            </div>
            </div>
    )
}

export default Settings
