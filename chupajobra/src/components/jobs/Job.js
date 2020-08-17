import React, {useState, useEffect, useContext} from 'react'
import UserContext from '../context/UserContext'

function Job({job, openJob}) {
    const [appStatus, setAppStatus] = useState("")
    const {user} = useContext(UserContext)
    const {title, company, location, company_logo, created_at, how_to_apply} = job
    let formatDate = created_at.slice(0,10)
    useEffect(() => {
        if(user){
            let thisJob = user.jobs.find(myJob => myJob._id === job.id)
            if(thisJob !== undefined){
                if(thisJob.applied === true){
                    setAppStatus("applied")
                } else {
                    setAppStatus("saved")
                }
            } else {
                setAppStatus("apply now")
            }
        } else {
            setAppStatus("apply now")
        }
    },[])
    

    return (
        <div className={`job ${appStatus}`} onClick={() => openJob(job)}>
            {appStatus && <div className='active-text'>{appStatus.toUpperCase()}</div>}
            <div className='job-left'>
                <p className='job-title'>{title}</p>
                <p className='job-company'>{company}</p>
                <p>{location}</p>
            </div>
            <div className='job-right'>
                <p>Posted On: {formatDate}</p>
            </div>

        </div>
    )
}

export default Job
