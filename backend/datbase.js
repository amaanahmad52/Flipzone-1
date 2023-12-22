const mongoose=require('mongoose')


const connect=async()=>{
    
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to Database")

    //no need of trycat , cause i have already declared process.on promise handling
}

module.exports=connect