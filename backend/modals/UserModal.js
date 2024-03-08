const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt"); //yhi pe sb validators lga do
const jwt=require("jsonwebtoken")
const crypto = require('crypto'); //buildin nodejs module
const dotenv=require("dotenv")
dotenv.config()
const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,  ////////
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//apply bcrypt here only
userschema.pre("save",async function (next) { //its a mongoDB defined function. it will run at pre save of document

    if (!this.isModified("password")) {  //after updation do not rehash password
      next();
    }
    // This is useful to avoid unnecessary password hashing if no changes were made to the password field during an update.
  
    this.password = await bcrypt.hash(this.password, 10);
});  
//comapring password for login (bcrypt ka part)
userschema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//generating jwt token   (a method of userschema is created)
userschema.methods.getJWTTOKEN=async function(){  ///func
    // console.log(this.id)
    // console.log(process.env.JWT_EXPIRE)
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {   //(payload,secret{options})
        expiresIn: process.env.JWT_EXPIRE,
    });
}

//reset password token generation using crypto

//The crypto module provides a way of handling encrypted data.

userschema.methods.resetTokenGenerate=async function(){ //this token we will send as an email to user
  

  const resetToken=crypto.randomBytes(20);  ///20 bytes token
  const ResetToken=resetToken.toString("hex");  //generated
//now hashing
  const cryptoToken=crypto.createHash("sha256").update(ResetToken).digest("hex")
  //createHash()	Creates a Hash object using the specified algorithm
  //digest is a way of hashing the token 

  this.resetPasswordToken=cryptoToken  //saved in db

  this.resetPasswordExpire=Date.now() + 15*60*1000 //15 min

  return ResetToken  //we are returning token , not hashed one

}



module.exports=mongoose.model("User",userschema)
