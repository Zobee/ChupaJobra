import React, {useState, useContext} from 'react'
import JobContext from '../context/JobContext'
import Alert from '../Alert'

function JobFilt() {
    const {jobs, setJobs} = useContext(JobContext)
    const [filterTerm, setFilterTerm] = useState("")
    const [filterCategory, setFilterCategory] = useState("title")
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const filter = (jobList, category, term) => {
        const filtered = [...jobList].filter(job => {
            let cat = job[category].toLowerCase()
            return cat.includes(term.toLowerCase())
        })
        return filtered
    }
    return (
    <div className='sort-container'>
        <Alert open={open} setOpen={setOpen} title={"No Jobs Found!"} content={`            Sorry! We can't find any jobs matching your filter criteria. Please try using a different term to filter by.`}/>
        <form className='sort-form' onSubmit={(e) => {
            e.preventDefault()
            const filt = filter(jobs, filterCategory, filterTerm)
            if(filt.length > 0){
                setJobs(filt)
                setFilterTerm("")
            } else {
                handleClickOpen()
            }
        }}>
            <label className='sort-label'>Filter Jobs By: </label>
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="title">Job Title</option>
                <option value="company">Company Name</option>
                <option value='location'>Location</option>
            </select>
            <input 
            type='text' 
            placeholder="Senior Web Dev"
            value={filterTerm} 
            onChange={(e) => setFilterTerm(e.target.value)}/>
            <input className='btn' type="submit" value="Filter"/>
        </form>
    </div>
    )
}

export default JobFilt
