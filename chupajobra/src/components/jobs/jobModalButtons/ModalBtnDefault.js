import React from 'react'
import {Button} from '@material-ui/core'

function ModalBtnDefault({job, user, getApplyLink, addJobToList}) {
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
            onClick={() => addJobToList(job)}
            disabled={!user}
            color="secondary">
            Save For Later
        </Button> 
      </div>
    )
}

export default ModalBtnDefault
