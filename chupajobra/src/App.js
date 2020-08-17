import React, {useState, useEffect, useMemo} from 'react';
import {Switch, Route, Router} from 'react-router-dom';

import UserContext from './components/context/UserContext'
import JobContext from './components/context/JobContext'

import Jobs from './components/jobs/Jobs'
import Header from './components/Header'
import Login from './components/userAuth/Login'
import SignUp from './components/userAuth/Signup';
import UserJobs from './components/userAuth/UserJobs'
import Settings from './components/userAuth/Settings'
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null)
  const [jobs, setJobs] = useState(null)
  const jobVal = useMemo(() => ({jobs, setJobs}), [jobs,setJobs])
  useEffect( async () => {
    const token = localStorage.getItem('auth-token')
    if(token){
      await axios.get("http://localhost:5000/user/", {
        headers: {
          'auth-token': localStorage.getItem('auth-token')
        }
      })
      .then(res => setUser(res.data))
      .catch(err => console.log(err))
    }
  },[])

  return (
    <div className="App">
    <UserContext.Provider value={{user, setUser}}>
    <Header/>
    <Switch>
      <Route path='/login' component={Login}/>
      <Route path='/signup' component={SignUp}/>
      <Route path='/settings' component={Settings}/>
      <JobContext.Provider value={{jobs, setJobs}}>
      <Route exact path='/' component={Jobs}/>
      <Route path='/myJobs' component={UserJobs}/>
      </JobContext.Provider>
    </Switch>
    </UserContext.Provider>
    </div>
  );
}

export default App;
