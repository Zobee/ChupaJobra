const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    jobs: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
})

const User = mongoose.model("User", userSchema);

module.exports = User;