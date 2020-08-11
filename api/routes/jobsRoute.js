const router = require('express').Router()
const fetch = require('node-fetch')
const baseURL = "https://jobs.github.com/positions.json"

//Get jobs
router.route('/').get(async (req,res) => {
    let resCount = 1
    let currPage = 0
    let jobList = []
    console.log("fetching...");

    while(jobList.length < 100 || resCount > 0){ 
        const res = await fetch(`${baseURL}/?page=${currPage}`)
        const jobs = await res.json()
        jobList.push(...jobs)
        currPage++
        resCount = jobs.length
    }
    console.log("Completed fetch.");
    return res.json(jobList)
})

//Maybe add prefilter/presort for job searching

module.exports = router 