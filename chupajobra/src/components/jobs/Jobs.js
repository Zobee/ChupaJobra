import React, {useState, useEffect, useContext} from 'react'
import Job from './Job'
import JobModal from './JobModal'
import axios from 'axios'
import JobSortFilt from './JobSortFilt'

import JobContext from '../context/JobContext'

function Jobs() {
  const {jobs, setJobs} = useContext(JobContext)
  const [open, setOpen] = useState(false);
  const [job, setJob] = useState({})
  const [loaded, setLoaded] = useState(false)

    const refreshJobs = async () => {
      setJobs(null)
      setLoaded(false)
      await axios.get("http://localhost:5000/jobs")
      .then(res => {
        setJobs(res.data)
      })
      .catch(err => console.log(err))
    }
  
  useEffect(() => {
    if(jobs === null){ 
      refreshJobs()
    }
  },[jobs])

  useEffect(() => {
    if(jobs != null){
      setLoaded(true)
    }
  },[jobs])


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
        {loaded ? 
        <div className='job-list'>
        <h1 className='job-list-header'>Available Jobs</h1>
        <div className='job-sort-container'>
          <JobSortFilt/>
          <div className='refresh-container'>
          <label className='refresh-label' for='refresh-btn'>Refresh Job List:</label>
          <button className='btn' onClick={() => refreshJobs()}>Refresh</button>
          </div>
        </div>
        <JobModal job={job} open={open} handleClose={handleClose}/>
        {
            jobs.map(job => <Job openJob={handleClickOpen} key={jobs.indexOf(job)} job={job} />)
        } 
        </div>
        :
        //Make this its own component later
        <div>
      <img src={"goat.gif"}/>
      <p>Fetching Newest Jobs...</p>
    </div>
        //Make this its own component later 
    }</div>
    )
}

export default Jobs
