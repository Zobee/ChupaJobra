const router = require('express').Router()
const auth = require('../jwtAuth')
const User = require('../models/userModel')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validation = require('../validation')


//sign up route
router.route('/signup').post( async (req,res) => {
    //Make sure the inputs are valid
    let {error} = validation.validateSignup(req.body)
    if(error) return res.status(400).json(error.details[0].message)
    
    //Confirm email not already in DB
    const userExists = await User.findOne({email: req.body.email})
    if(userExists) return res.status(400).json("Email is already in use!")

    //Hash PW
    const salt = await bcrypt.genSalt(10)
    const hashPw = await bcrypt.hash(req.body.password, salt)
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPw
    })  
    try{
        await user.save()
        res.send("New User Created")
    }catch(err){
        res.status(400).json("Error creating new user")
    }
})

//login route
router.route('/login').post(async (req,res) => {
    //Login validation
    let {error} = validation.validateLogin(req.body)
    if(error) return res.status(400).json(error.details[0].message)

    //Ensure email is in db
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).json("Email does not exist!")

    //ConfirmPW
    const validatePw = await bcrypt.compare(req.body.password, user.password)
    if(!validatePw) return res.status(400).json("Password is invalid")

    //Create Token
    const token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN)
    res.header("auth-token", token).send(token)
})

//PROTECTED USER ROUTES

//Get User Info
router.route('/').get(auth, (req,res) => {
    User.findById(req.user._id)
    .then(user => {
        res.json(user)
    })
    .catch(err => {
        res.status(400).json(`Error ${err}`)
    })
})

//Get User's Saved Jobs
router.route('/myJobs').get(auth, (req,res) => {
    User.findById(req.user._id)
    .then(user => {
        res.json(user.jobs)
    })
    .catch(err => {
        res.status(400).json(`Error: ${err}`)
    })
})

//Change Username
router.route('/changeUsername').post(auth, async (req,res) => {
    //Validate Username
    let {error} = validation.validateUsername(req.body)
    if(error) return res.status(400).json(error.details[0].message)

    const userExists = await User.findOne({username: req.body.username})
    if(userExists) return res.status(400).json("Username taken!")

    User.findById(req.user._id)
    .then(user => {
        user.username = req.body.username
        user.save()
        .then(() => res.json("Username Updated"))
        .catch(err => res.status(400).json(`Error ${err}`))
    })
    .catch(err => res.status(400).json(`Error ${err}`))
})

//Change Password
router.route('/changePw').post(auth, async (req,res) => {
    let {error} = validation.validatePw(req.body)
    if(error) return res.status(400).json(error.details[0].message)

    const validatePw = await bcrypt.compare(req.body.password, user.password)
    if(!validatePw) return res.status(400).json("Password is invalid")

    const salt = await bcrypt.genSalt(10)
    const hashPw = await bcrypt.hash(req.body.password, salt)
    User.findById(req.user._id)
    .then(user => {
        user.password = hashPw
        user.save()
        .then(() => res.json("Password successfully updated."))
        .catch(err => res.status(400).json(err))
    })
    .catch(err => res.status(400).json(err))
})

//Delete Account
router.route('/deleteAccount').delete(auth, (req,res) => {
    User.findByIdAndDelete(req.user._id)
    .then(res.json("Account Deleted."))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

//Add Job To Saved
router.route('/saveJob').post(auth, async (req,res) => {
    await User.findById(req.user._id)
    .then(user => {
        //Check to make sure job isn't already in list
        if(user.jobs.length > 0){
            const jobOnList = user.jobs.every(job => job._id !== req.body.job.id)
            if(!jobOnList) return res.status(400).json(`Job already saved.`)
        }
        //Add job to list
        user.jobs.push(
            {
                _id: req.body.job.id,
                job: req.body.job,
            }
        )
        user.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json(`Error: ${err}`))
    })
    .catch(err => res.status(400).json(`Error ${err}`))
})

//Change Applied Status
router.route('/apply').post(auth, async (req,res) => {
    await User.findById(req.user._id)
    .then(user => {
        const jobOnList = user.jobs.every(job => job._id !== req.body.job.id)
        if(jobOnList) return res.status(400).json(`This job isn't on your saved list.`)
        let currJob = user.jobs.find(job => job._id === req.body.job.id)
        currJob.applied = !currJob.applied //Reverse current status
        user.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json(`Error: ${err}`))
    })
    .catch(err => res.status(400).json(`Error: ${err}`))
})

//Remove Job   
router.route('/removeJob').post(auth, async (req,res) => {
    await User.findById(req.user._id)
    .then(user => {
        const jobOnList = user.jobs.every(job => job._id !== req.body.job.id)
        if(jobOnList) return res.status(400).json(`This job isn't on your saved list.`)
        user.jobs = user.jobs.filter(job => {
            return job._id !== req.body.job.id
        })
        user.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json(`Error: ${err}`))
    })
    .catch(err => res.status(400).json(`Error ${err}`))
})

//Clear Job List
router.route('/clearAllJobs').post(auth, async (req,res) => {
    await User.findById(req.user._id)
    .then(user => {
        user.jobs = []
        user.save()
        .then(() => res.json("All Jobs Removed"))
        .catch(err => res.status(400).json(`Error: ${err}`))
    })
    .catch(err => res.status(400).json(`Error: ${err}`))
})
module.exports = router