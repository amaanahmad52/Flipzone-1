




    //.cookie method has 3 parameters[]   res.cookie(name, value [, options])
    //httponly when set to true, js of client side browser will not be able to get authorized things from cookies
    
const getToken = async(userdetails, statusCode, res) => { //saves token in cookie
    const token =await userdetails.getJWTTOKEN(); //function defined in usermodel
  //  console.log(token);
    // options for cookie
    const options = {
    //   expires: new Date(
    //     Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    //   ),
    expires: new Date(Date.now() + 86400000),
      httpOnly: true,
    };
    
                                
    
     res.status(statusCode).cookie("token", token, options).json({  //express method to set cookie res.cookie
      success: true,
      userdetails,
      token
      
    })
    
      


   

   
    
  };

      
module.exports=getToken



// When next() is called within a middleware function, it tells Express.js to pass control to the next middleware function. This allows you to define multiple middleware functions that execute sequentially and perform different tasks for the incoming request.//

// /res.cookie(name, value, [options]):...............................................

// This method is used to set a cookie in the HTTP response. It sets a cookie with the specified name and value.
// The options parameter is an optional object that allows you to provide additional settings for the cookie, such as expires, maxAge, domain, path, secure, httpOnly, and sameSite.
// Example usage: res.cookie('cookieName', 'cookieValue', { expires: new Date(Date.now() + 86400000), secure: true })/


// and

// req.cookies:............................................

// This property provides access to the cookies sent by the client in the HTTP request.
// It is an object that contains the parsed cookie values, with the cookie names as the keys and their corresponding values.
// To access a specific cookie value, you can use the syntax req.cookies.cookieName, where 'cookieName' is the name of the desired cookie.
// Example usage: const cookieValue = req.cookies.cookieName
// It's important to note that in order to use req.cookies, you need to have the appropriate middleware, such as cookie-parser, configured in your Express application to parse and handle cookies.