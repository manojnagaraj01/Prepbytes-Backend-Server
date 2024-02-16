const route = require("express").Router()
const {signup, signin, createCheckOutSession, order,offer,enquiryform } = require("../controllers/userController")


route.post("/signup", signup)

route.post("/signin", signin)

route.post("/create-checkout-session", createCheckOutSession)
route.post("/create-order", order)
route.post("/get-course-offer", offer)
route.post("/enquiry-form", enquiryform)


module.exports = route;