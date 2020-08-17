const Joi = require('@hapi/joi')
const { job } = require('cron')

let validateUsername = (msg) => {
    let schema = Joi.object({
        username: Joi.string().min(5).required()
    })
    return schema.validate(msg)
}

let validateSignup = (msg) => {
    let schema = Joi.object({
        username: Joi.string().min(5).required(),
        email: Joi.string().email().required(),
        password:  Joi.string().min(6).required(),
        confirmPw: Joi.any().valid(Joi.ref('password'))
    })
    return schema.validate(msg)
}

let validateLogin = (msg) => {
    let schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(msg)
}

let validatePw = (msg) => {
    let schema = Joi.object({
        password: Joi.string().min(6).required()
    })
    return schema.validate(msg)
}

module.exports.validateSignup = validateSignup
module.exports.validateLogin = validateLogin
module.exports.validateUsername = validateUsername
module.exports.validatePw = validatePw
