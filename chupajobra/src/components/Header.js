import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import UserContext from './context/UserContext';

const useStyles = makeStyles({
    headerText: {
      letterSpacing: "0.5rem",
      fontWeight: "500",
      fontSize: "3rem",
      alignSelf: "center"
    }
  });
const Header = () => {
    const {user, setUser} = useContext(UserContext)
    const classes = useStyles();

    const signOut = () => {
        localStorage.removeItem('auth-token',user)
        setUser(null)
    }
    return (
        <div>
            <header className="header">
            <div className="brand">
                <img src='#' />
                <Typography 
                className={classes.headerText} 
                variant='h1' 
                href='/'>
                    CHUPAJOBRA
                </Typography>
            </div>
            <div className="header-links">
                <Link to='/'>Jobs</Link>
                {!user ? <Link to="/login">Sign In</Link> : <Link to="/myJobs">My Jobs</Link>}
                {user && 
                    <span>
                        <Link to="/settings">Settings</Link>
                        <Link to='/' onClick={signOut}>Sign Out</Link>
                    </span>
                }
            </div>
        </header>
        </div>
    
    )
}

export default Header