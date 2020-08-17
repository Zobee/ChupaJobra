import React from 'react'
import {Button} from '@material-ui/core'
//Apply. Remove From Saved.
function ModalBtnSaved({job, user, getApplyLink, removeJob}) {
    return (
<div className='modal-button-well'>
        <Button 
          onClick={() => window.open(getApplyLink(job))}
          variant="contained" 
          color="primary">
            Apply Now
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

export default ModalBtnSaved
