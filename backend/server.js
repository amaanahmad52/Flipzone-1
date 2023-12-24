//this file is the main end point of our backend 

const app=require("./app")

const dotenv=require("dotenv")


dotenv.config({ path: "backend/config/config.env" })


const cloudinary=require("cloudinary")

 

const connect=require("./datbase")

connect()  //call this after dotenv required otherwise database file will not get url from env file

exports.const=cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure:true
});

process.on('uncaughtException', (error) => {   //this need to be given at top.
    console.error('Uncaught Exception:', error);
    // Perform any necessary cleanup or logging
    // You can choose to gracefully exit the process if needed
    console.log("Server is getting closed due to uncaught error")
   

        process.exit(1);
    
});


// console.log(xyz) //this will give error as undefined, and these are called as uncaught error. we will also handle it



const server=app.listen(process.env.PORT,()=>{
    console.log(`server is running on port: https://localhost:${process.env.PORT}`)
})


process.on('unhandledRejection', (error) => {
    console.error('Uncaught Exception:', error);
    // Perform any necessary cleanup or logging
    // You can choose to gracefully exit the process if needed
    console.log("Server is getting closed due to unhandled Promise")
    server.close(()=>{

        process.exit(1);
    })
});
