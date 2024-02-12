const route = require("express").Router()
const {signup, signin, createCheckOutSession} = require("../controllers/userController")


route.post("/signup", signup)

route.post("/signin", signin)

route.post("/create-checkout-session", createCheckOutSession)

module.exports = route;