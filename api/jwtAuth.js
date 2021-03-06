const jwt = require('jsonwebtoken')

const auth = (req,res,next) => {
    const token = req.header('auth-token')
    if(!token) return res.status(401).json("Access Denied. BITCH")

    try{
        const valid = jwt.verify(token, process.env.SECRET_TOKEN)
        req.user = valid
        next()
    }catch(err) {
        res.status(400).send("Invalid token")
    }
    
}

module.exports = auth