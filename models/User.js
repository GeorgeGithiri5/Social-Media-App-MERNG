const {model, Schema} = require('mongoose')

const userSchema = new Schema({
    username: String,
    password: String,
    createdAt: String,
    email: String
})

module.exports = model('users', userSchema)