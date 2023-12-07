const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/CustomerDetails")

const SubsUserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})

const contactUserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true,
    },
})

const UserQueries = mongoose.model("Queries",contactUserSchema)
const Subscribed = mongoose.model("subscribtions", SubsUserSchema)
module.exports = {Subscribed,UserQueries}