import React, {useState, useEffect, useContext} from 'react'
import Job from './Job'
import JobModal from './JobModal'
import JobApiLoad from './JobApiLoad'
import axios from 'axios'
import JobSort from './JobSort'
import JobFilt from './JobFilt'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import JobContext from '../context/JobContext'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: "center",
    marginBottom: "5rem",
    width: '85wv',

  },
  heading: {
    fontWeight: theme.typography.fontWeightRegular,
    textAlign: "center"
  },
}));

function Jobs() {
  const {jobs, setJobs} = useContext(JobContext)
  const [open, setOpen] = useState(false);
  const [job, setJob] = useState({})
  const [loaded, setLoaded] = useState(false)

  const classes = useStyles();

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
        <Accordion className={classes.root}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading} variant={'h2'}>Search Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className='job-sort-container'>
            <JobSort/>
            <JobFilt/>
            <div className='sort-container'>
            <label className='sort-label' for='refresh-btn'>Refresh Job List:</label>
            <button className='btn' onClick={() => refreshJobs()}>Refresh</button>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
        <JobModal job={job} open={open} handleClose={handleClose}/>
        {
            jobs.map(job => <Job openJob={handleClickOpen} key={jobs.indexOf(job)} job={job} />)
        } 
        </div>
        :
        <JobApiLoad/>
    }</div>
    )
}

export default Jobs
