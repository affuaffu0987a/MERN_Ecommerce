const mongoose = require("mongoose")

const MongoConnectionURL = 'mongodb+srv://aftabkhan123:123aftab098@cluster0.xbti2tw.mongodb.net/CustomerDetails?retryWrites=true&w=majority'
mongoose.connect(MongoConnectionURL)

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