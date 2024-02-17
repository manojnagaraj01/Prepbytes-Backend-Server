const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const dotenv = require("dotenv")
const userAuth = require("./routes/userRoutes")


dotenv.config()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ['*', 'https://m.stripe.network', 'https://js.stripe.com', "http://localhost:5173","https://stripe-payments-app.herokuapp.com","https://stripe.com/" , "https://prepbytes-backend-server.onrender.com", "https://prepbytes-clone-three.vercel.app", "https://prepbytes-backend-server.onrender.com/user/create-checkout-session", "https://prepbytes-backend-server.onrender.com/user/create-order", "https://prepbytes-backend-server.onrender.com/user/create-order",]
  }));
//database
const {dbconnect} = require("./config/dbconnect")

//All user routes
app.use("/user", userAuth)


app.get("/", (req,res)=>{
    res.send("<h1>Welcome</h1>");
})

const PORT = process.env.PORT || 9090
app.listen(PORT, async()=>{
    try{
        await dbconnect()
        console.log(`Server runnig on ${process.env.DEV_MODE} mode on port ${PORT}`);
    }
    catch(err){
        console.log(err, "error while loading");
    }
});     
