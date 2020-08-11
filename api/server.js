const express = require("express");
const cors = require("cors");
const jobsRoute = require('./routes/jobsRoute')
const authRoute = require('./routes/authRoute')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(process.env.DB_URI,
{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true},
() => console.log("Connected to mongoDB"))

const app = express()

app.use(cors())
app.use(express.json())


const PORT = 5000 || process.env.PORT

app.use('/jobs', jobsRoute)
app.use('/user', authRoute)
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})