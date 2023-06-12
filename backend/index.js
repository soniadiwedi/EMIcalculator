const express = require("express")

const cors = require("cors")


const connection = require("./db")
const userRouter = require("./routes/user.routes")
const profileRoutes = require("./routes/profile")
const emiRoutes = require("./routes/emi.routes")



const app = express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Hello World")
})
app.use("/auth",userRouter)
app.use("/profile", profileRoutes);
app.use('/emi', emiRoutes)




app.listen(9090,async()=>{
    try{
        await connection
        console.log("Server mongoose started");
    }catch(err){
        console.log(err);
    }
    console.log("Server is Running at 9090");
})