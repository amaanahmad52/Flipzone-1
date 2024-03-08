
var crypto=require("crypto")
const User=require('../modals/UserModal');
const asynchandler = require('../utils/asynchandler');
const mail=require("../utils/nodemailer")
const cloudinary=require("cloudinary")
const getToken = require('../utils/tokengeneratorofjwt');

//creating the user
exports.createUser=asynchandler(async(req,res)=>{

    // console.log(req.body)
    
   
    const my_cloud=await cloudinary.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:'scale'
        
    })
        // console.log(my_cloud)
    
    // console.log("h0i")
    // console.log("after",name,email,password,my_cloud.public_id,my_cloud.secure_url);

    const{name,email,password}=req.body; //will be given by user
    console.log(name,email,password)
    const user=await User.create({
        
        name,
        email,
        password,
        avatar:{
            public_id:my_cloud.public_id,
            url:my_cloud.secure_url
        }
        // avatar:req.body.avatar
    })
    const founded=await User.findOne({user})
    if(founded){
        return res.status(401).json({message:"User already exists"})
    } 

    
    
    // console.log(newUser)
     getToken(user,201,res) //save user with token

});

/////S U N D A Y  R E V I S I O N

//login the user

exports.loginUser=asynchandler(async(req,res)=>{
    const{email,password}=req.body;
   
    const finduser=await User.findOne({email}).select("+password")
    // explicitly requesting that the "password" field should be included in the results by using +password.
    if(!finduser){
        return res.status(401).json({message:"invalid credentials"})
    }
    
    const match=await finduser.comparePassword(password) //a new hash of passwword created and compared with prev real stored
    
    if(!match){
        return res.status(401).json({message:"invalid credentials"})
    }


      getToken(finduser,200,res)  
     
    //   console.log(finduser);/
    
})


exports.logout = asynchandler((req, res,next) => {
    // Delete the "token" cookie by setting it to an empty value and expiring it immediately
    res.cookie("token",null,{   //setting the cookie  ,not getting(so res.cookie not req.cookies)
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({ message: 'Logged out successfully' });
  });
  

//reset password
exports.forgotPassword=asynchandler(async(req,res,next)=>{

    //first check is user present
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return( res.status(401).json({message:"Not matched"}))
    }

    //now generate token

   const tokenmilgya= await user.resetTokenGenerate() //by crypto
   
   //save bhi krna hoga token ko
   await user.save()

   //now send this token to email
   const url=`${req.protocol}://${req.get("host")}/api/v1/user/resetPassword/${tokenmilgya}`

   const message=`Click Here to Reset the Password:${url}\n\n\n Ignore if not done by you.`
   
    console.log(message)
    try {
       await mail ({//basically we are calling imported function
        message,
        email:req.body.email
        })  
         
       res.status(200).json({
        success:true,
        message:"Email sent Successfully "
       })
        
    } catch (error) {
        //if not done, then erase this token from database
        user.resetPasswordToken=undefined
        user.resetPasswordExpire=undefined
        await user.save()
        return next()
    }

})


//now reset
exports.resetPassword=asynchandler(async(req,res,next)=>{
    //we can access token form url we got .as user click on url, we can access token from that url using re.param
    const token=req.params.token;  //bina hashed token milega, kyuki yhi return kiya tha usermodel pe
   
    //..we need to hash it , as we saved hashed token
    const gottoken=crypto.createHash("sha256").update(token).digest("hex")
    // console.log(gottoken)
    const{newPassword,confirmPassword}=req.body

    if(newPassword!==confirmPassword){
        return res.status(401).json({message:"Password doesn`t matches"})

    }
    //does token that we get from mail id matches with whta we stored before sending to mail
    let user=await User.findOne({resetPasswordToken:gottoken,resetPasswordExpire:{$gt:Date.now()}})

    if(!user){
        return res.status(401).json({message:"Some Error occured"})
    }

    user.password = newPassword;
    //ab wo token bhi to delete krna hoga. kaam ho chuka apna
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  
    await user.save();

    //now send the jwt token 
    getToken(user,200,res)  //basically we saved the cookie so that again login will not be required

})

//routes for profile update of the user

//password change

exports.passwordChange=asynchandler(async(req,res,next)=>{


    const{newPassword,confirmPassword,oldPassword}=req.body

    
    if(newPassword!==confirmPassword){
        return res.status(401).json({message:"Password doesn`t matches"})

    }
    const foundeduser=await User.findOne(req.finduser).select("+password") //document saved  in req.finduser when we call authentication check
    // if(!foundeduser){
    //     return res.status(401).json({message:"invalid credentials"})
    // }
    
    const match=await foundeduser.comparePassword(oldPassword) //puraane saved password se , we compared 
    
    if(!match){
        return res.status(401).json({message:"invalid credentials"})
    }

    //if matched. we change


    foundeduser.password=newPassword
    await foundeduser.save()

    getToken(foundeduser,200,res)
    // return next()
});

//updation of details

exports.profileUpdate=asynchandler(async(req,res,next)=>{

    const{newname,newemail,newavatar}=req.body

    const foundeduser=await User.findOne(req.finduser)

    if(newname){
        foundeduser.name=newname
        await foundeduser.save()
    }
    if(newemail){
        foundeduser.email=newemail
        await foundeduser.save()
    }
    if(newavatar){
        foundeduser.avatar=newavatar
        await foundeduser.save()
    }
    
    res.status(200).json({
        success:true,
        foundeduser
    })
    // return next()

})
//REQ.FINDUSER IS NULL ,,????????  WHYYYYYYYYYYYYYYY --> error was in auth file
//seeing the details
exports.getUserDetails = asynchandler(async (req, res, next) => {
    
    // console.log(req.userdetails)
    if (!req.userdetails) { //auth file seayega
        return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    const user = await User.findById(req.userdetails.id);
    
    res.status(200).json({
      success: true,
      user
    });
  });
//to get all users detail -->admin

exports.getAllUserDetails=asynchandler(async(req,res,next)=>{

    const all=await User.find();

    res.status(200).json({
        success:true,
        all
    })
})

//to get a particular user detail -->admin

exports.getUserDetailsbyid=asynchandler(async(req,res,next)=>{

    const singleuser=await User.findById(req.params.id);
   
    res.status(200).json({
        success:true,
        singleuser
    })
})

//now if an admin wants to update the role of user as admin

exports.makeAdmin=asynchandler(async(req,res,next)=>{

    const kisko=await User.findById(req.params.id);

    if(kisko.role==="admin"){
        return res.status(409).send({
            message:`${kisko.name} is already an admin`
        })
    }
    kisko.role="admin"

    await kisko.save()

    res.status(200).send({
        success:true,
        kisko
    })

})
//remake as user
exports.makeUser=asynchandler(async(req,res,next)=>{

    const kisko=await User.findById(req.params.id);

    if(kisko.role==="user"){
        return res.status(409).send({
            message:`${kisko.name} is already a user`
        })
    }

    kisko.role="user"

    await kisko.save()

    res.status(200).send({
        success:true,
        kisko
    })

})

//delete a user

exports.DeleteUser=asynchandler(async(req,res,next)=>{

    const singleuser=await User.findById(req.params.id);
    await User.deleteOne(singleuser)
    res.status(200).json({
        success:true,
        message:`${singleuser.name} Deleted Successfully`
    })

})
