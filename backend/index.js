const express=require("express");
const { connection } = require("./db");
const { urlRouter } = require("./route/url.route");
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cors())
app.use("/",urlRouter)
require("dotenv").config()

app.listen(process.env.port,async()=>{
    try {
       await connection
       console.log("connected to database") 
       console.log(`Server is running at port : ${process.env.port}`)
    } catch (error) {
        console.log(error)
    }
})