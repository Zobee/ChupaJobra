import React, {useState, useContext} from 'react'
import UserContext from '../context/UserContext'
import {Link} from 'react-router-dom'

import Job from '../jobs/Job'
import JobModal from '../jobs/JobModal'

//Lots of redundancy between this and the 'Jobs' component. I can use state to manage the transition, but I want to separate them with a router.
function UserJobs() {
    const [open, setOpen] = useState(false);
    const [job, setJob] = useState({})
    const {user} = useContext(UserContext)

    const handleClickOpen = (job) => {
        setJob(job)
        setOpen(true);
    };
  
    const handleClose = () => {
        setJob({})
        setOpen(false);
    };
    return (
        <div>
            {user ? 
            <div>
                <h1 className='job-list-header'>My Saved Jobs</h1>
                {user.jobs.length > 0 ? <div>
                <JobModal job={job} open={open} handleClose={handleClose}/>
                {user.jobs.map(job => {
                    return <Job openJob={handleClickOpen} key={user.jobs.indexOf(job)} job={job.job} />
                })}
                </div>
                :
                <div className='user-jobs-empty'>
                    <h1>Nothing here yet...</h1>
                    <Link className='user-jobs-link' to='/'>Start Searching For Jobs</Link>
                </div>}
            </div> 

            : 
            <div>Access Denied.</div>}
        </div>
    )
}

export default UserJobs
