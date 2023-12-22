const express=require('express')
var cors = require('cors')
const app=express()
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true})) //on setting extended false only strings and arrays can be parsed and get eposed to req.body in form of key val pair,  
                                                //but on true, anything can be parsed


app.use(cors())
var corsOptions = {
    origin: "*"
     // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(express.json())
const cookieParser=require('cookie-parser')
app.use(cookieParser())

const fileupload=require("express-fileupload")


//mounting 
app.use("/api/v1",require("./routes/ProductsRoute"))

app.use("/api/v1",require("./routes/UserRoute"))
app.use("/api/v1",require("./routes/OrderRoute"))

module.exports=app