import React, {useState, useContext} from 'react'
import JobContext from '../context/JobContext'

function JobSortFilt() {
    const {jobs, setJobs} = useContext(JobContext)
    const [sort, setSort] = useState("titleAZ")

    const sortJobs = (jobList, sortVal, sortTerm) => {
        console.log("start");
        //You can't directly modify state. EVER. The sort method sorts the array in place, so using it on a state object is a no-go
        const sorted = [...jobList].sort((a,b) => {
            let jobA;
            let jobB 
            if(sortVal !== ""){
                jobA = a[sortVal].toLowerCase().trim();
                jobB = b[sortVal].toLowerCase().trim();
                console.log(jobA, jobB);
            }
            switch(sortTerm){
                case 'titleAZ': case "companyAZ": return jobA > jobB ? 1 : -1
                case 'titleZA': case "companyZA": return jobA < jobB ? 1 : -1
                case 'newest' : return new Date(a.created_at).toISOString().slice(0,10) < new Date(b.created_at).toISOString().slice(0,10) ? 1 : -1
                case 'oldest' : return new Date(a.created_at).toISOString().slice(0,10) > new Date(b.created_at).toISOString().slice(0,10) ? 1 : -1
                default : return undefined
            }
        })
        setJobs(sorted)
    }

    return (
    <div>
        <form className='sort-form' onSubmit={(e) => {
            e.preventDefault()
            let searchVal = ""
            if(sort.includes("title")){
                searchVal = 'title'
            } else if(sort.includes("company")){
                searchVal = 'company'
            }
            sortJobs(jobs, searchVal, sort)
            console.log("Sorted!");
        }}>
            <label className='sort-label'>Sort Jobs By: </label>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="titleAZ">Position Title: A-Z</option>
                <option value="titleZA">Position Title: Z-A</option>
                <option value="companyAZ">Company Name: A-Z</option>
                <option value="companyZA">Company Name: Z-A</option>
                <option value="newest">Date Posted: Newest</option>
                <option value="oldest">Date Posted: Oldest</option>
            </select>
            <input className='btn' type="submit" value="Sort"/>
        </form>
    </div>
    )
}

export default JobSortFilt
