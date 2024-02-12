const mongoose=require('mongoose')
const dotenv=require('dotenv').config()
const URI=process.env.DB

const dbconnect=()=>{
    mongoose.connect(URI)
    .then(()=>{
        console.log("connected to the database")
    })
    .catch((err)=>{
        console.log(err)
    })
   
}
module.exports={dbconnect}