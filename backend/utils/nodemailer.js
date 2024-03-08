var nodemailer = require("nodemailer");
const dotenv=require("dotenv")
dotenv.config()
const mail=async(opt)=>{
  var transporter = nodemailer.createTransport({
   
    host:"smtp@gmail.com",
    port:465,
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  //email is not getting send due to some  gmail securiry reasons . rest is ok
  
  var mailOptions = {
    from:  process.env.EMAIL,
    to: opt.email,  //multiple emails can be selected
    subject: "Flipzone Password Recovery !!",
    text: opt.message,
  };
  
  try {
    await transporter.sendMail(mailOptions) 
    
  } catch (error) {
    console.log(error.message)
  }
  
}



module.exports=mail