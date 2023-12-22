const asynchandler = require("./asynchandler");
const jwt = require('jsonwebtoken');
const User=require("../modals/UserModal")
exports.isAuthenticationCheck=asynchandler(async(req,res,next)=>{

    //we need token from cookie to check  (jo ki login ya signup ke time store ho gya)
    //we will not use localstorage as it is risky
    const {token}=req.cookies  //its method of cookie-parser npm to get saved cookie 
    // console.log(token)


    //now we verify and get data from token

    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;   //as we given id as payload at creation time, so we use that keyword only

    req.finduser=await User.findById(userId)   //saved on req.finduser.. **it can be used whenever needed after login
    // console.log(req.finduser)
    // Proceed to the next middleware or route in the router.route
    next();
})


// first read thia
// function myFunction(...string) {
//     console.log(string);
//   }

//   myFunction('hello', 'world'); // Output: ['hello', 'world']

// In JavaScript, the (...string) syntax is called the "rest parameter" syntax. It allows you to pass multiple individual arguments to a function and access them as an array-like object called the "rest parameter."
  

exports.isadmin = (...roles) => { //it check for user, if he is admin or not
    return async (req, res, next) => {
      try {
        // Remember, we have saved the user in the request after JWT verification as `req.finduser`.
        // console.log(req.finduser)
        if (!roles.includes(req.finduser.role)) {
          return res.status(401).json({ message: `${req.finduser.role} is not allowed to access this place` });
        }
    
        next();
      } catch (error) {
        // Handle any errors that occur during authorization
        next(error);
      }
    };
  };
  
  
