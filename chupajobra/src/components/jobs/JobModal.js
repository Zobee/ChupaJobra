import React, {useContext, useState, useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

//Modal Buttons
import ModalBtnDefault from './jobModalButtons/ModalBtnDefault'
import ModalBtnSaved from './jobModalButtons/ModalBtnSaved'
import ModalBtnApplied from './jobModalButtons/ModalBtnApplied'

import UserContext from '../context/UserContext'
//<div dangerouslySetInnerHTML = {{__html : description }}></div>
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const useStyles = makeStyles({
  titleStyle: {
    fontWeight: "500",
    color: "#EEE",
    background: "linear-gradient(150deg, black, green)",
    padding: "0.6rem auto"
  },
  modalHeaderTextStyle: {
    fontWeight: 500,
    fontFamily: "poppins"
  }
});
  
const JobModal = ({job, open, handleClose}) => {
    const {title, location, company, company_logo, description, how_to_apply, url} = job
    const {user, setUser} = useContext(UserContext)
    //<ModalBtnDefault job={job} user={user} getApplyLink={getApplyLink} addJobToList={addJobToList}/>
    const [modalButtons, setModalButtons] = useState(null)
    const classes = useStyles()

    useEffect(() => {
      if(user){
          let thisJob = user.jobs.find(myJob => myJob._id === job.id)
          if(thisJob !== undefined){
              if(thisJob.applied === true){
                setModalButtons(<ModalBtnApplied job={job} user={user} changeAppStatus={changeAppStatus} removeJob={removeJob}/>)
              } else {
                setModalButtons(<ModalBtnSaved job={job} user={user} getApplyLink={getApplyLink}removeJob={removeJob}/>)
              }
          } else {
            setModalButtons(<ModalBtnDefault job={job} user={user} getApplyLink={getApplyLink} addJobToList={addJobToList}/>)
        }
        } else {
          setModalButtons(<ModalBtnDefault job={job} user={user} getApplyLink={getApplyLink} addJobToList={addJobToList}/>)
        }
      
  },[user, job])

    const getApplyLink = (job) => {
      let urlInd = job.how_to_apply.indexOf(`href`)
      let urlEndInd = job.how_to_apply.indexOf('">',urlInd)
      if(user){
        addJobToList(job)
        changeAppStatus(job)
      } 
      return urlInd !== -1 ? job.how_to_apply.slice(urlInd+6, urlEndInd) : job.url
    }

    const changeAppStatus = async (job) => {
      await axios.post("http://localhost:5000/user/apply", {job}, {headers : {"auth-token" : localStorage.getItem("auth-token")}})
      .then(res => setUser(res.data))
      .catch(err => console.log(err))
      handleClose()
      window.locaton="/myJobs"
    }

    const addJobToList = async (job) => {
      if(user){
        await axios.post("http://localhost:5000/user/saveJob",
        {job}, {headers : {"auth-token":localStorage.getItem("auth-token")}})
        .then(res => setUser(res.data))
        .catch(err => console.log(err))
        handleClose()
        window.locaton="/myJobs"
      } else {
        alert("Please log in to save jobs!")
      }
    }

    const removeJob = async (job) => {
      if(user){
        await axios.post("http://localhost:5000/user/removeJob",
        {job}, {headers : {'auth-token':localStorage.getItem("auth-token")}})
        .then(res => setUser(res.data))
        .catch(err => console.log(err))
        handleClose()
        window.location='/myJobs'
      }
    }
    return (
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle 
        id="alert-dialog-slide-title"
        className={classes.titleStyle}
        ><Typography variant='h5'>{title}</Typography>  
            <button className="modal-close-btn" onClick={handleClose}>
                X
            </button>
        </DialogTitle>
          <DialogContent className={classes.backgroundStyle}>
            <DialogContentText 
            //className={classes.backgroundStyle}
                id="alert-dialog-slide-description">
              <div className='modal-header-container'>
                <img className="job-modal-img" src={company_logo} alt={`${title} logo`}/>
                <div>
                  
                  <Typography 
                  className={classes.modalHeaderTextStyle} 
                  variant="h5">{company}</Typography>
                  <Typography 
                  className={classes.modalHeaderTextStyle}
                  variant="h6">{location}</Typography>
                </div>
              </div>
              <div dangerouslySetInnerHTML = {{__html : description }}></div>
            </DialogContentText>    
          </DialogContent>
          {modalButtons}
        </Dialog>
      </div>
    );
}

export default JobModal
