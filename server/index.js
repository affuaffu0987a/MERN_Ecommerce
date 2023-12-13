require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors')
const {Subscribed, UserQueries} = require("./Database/db")
const stripe = require("stripe")("sk_test_51OJGQsSD9gzrVkAprdcoG8N210RMuTPUzwmQO7q8kygdqMypxm6lrmbBan0U9nKAnB7xZdquVCqZeah5TekpJzu500J4W6h6bc")

const corsOptions = {
    origin: 'https://shopies-ecommerce-ui.vercel.app',
    method: ["GET","POST","PUT","PATCH","DELETE","HEAD"],
    credentials: true
}
app.use(cors(corsOptions))
app.use(express.json())

app.post("/payment/create-checkout-session", async (req, res) => {
    try {
        const { productsCards, totalPrice, Qty } = req.body
        const lineItems = productsCards.map((product) => {
            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: product.title,
                        images: [product.thumbnail]
                    },
                    unit_amount: (product.DiscountPrice * 83.37) * 100,
                },
                quantity: product.qty
            }
        });
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: 'payment',
            success_url: "https://shopies-ecommerce-ui.vercel.app",
            cancel_url: "https://shopies-ecommerce-ui.vercel.app",
        });
        res.json({ id: session.id })
    } catch (err) {
        res.send(err)
    }
})

app.post("/v1/subscribe", async (req, res) => {
    try {
        const { email } = req.body;
        const emailExist = await Subscribed.findOne({ email })
        if (emailExist) {
            res.status(200).json({ msg: "Already Subscribed" })
        }
        const createUserSubs = await Subscribed.create({
            email
        })
        res.status(200).json({ msg: "Subscribed Successfull" })
    }
    catch (err) {
        res.send(err)
    }
})

app.post("/v1/query", async (req, res) => {
    try {
        const {username,email,message} = req.body;
        const UsersQuery = await UserQueries.create({
            username,
            email,
            message
        })
        res.status(200).json({msg:"Your Query Submitted"})
    } catch (error) {
        res.send(error)
    }
})

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log("Server Runing.. on 5000 PORT");
})