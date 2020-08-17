import React from 'react'
import {Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    btnColor: {
        backgroundColor: "#2e8635",
        color: "#EEE",
        '&:hover':{
            backgroundColor: "#0a440f"
        }
    }
  });

//Change applied status. Go to employer url. remove from saved
function ModalBtnApplied({job, user, changeAppStatus, removeJob}) {
    const classes = useStyles()
    return (
        <div className='modal-button-well'>
            <Button 
                onClick={() => changeAppStatus(job)}
                variant="contained" 
                color="primary">
                    Change Apply Status
            </Button>
            <Button 
                onClick={() => window.open(job.url)}
                variant="contained" 
                className={classes.btnColor}>
                    Go To Employer Site
            </Button>
            <Button 
            variant="contained" 
            onClick={() => removeJob(job)}
            color="secondary">
            Remove From Saved Jobs
        </Button> 
        </div>
    )
}

export default ModalBtnApplied
