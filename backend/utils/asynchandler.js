function asynchandler(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      //if wrong id
      if (error.name === "CastError") {
        return res
          .status(400)
          .json({ message: `Invalid Objects: ${error.path}` });
      }
      //if duplicate emails
      if (error.code === 11000) {
        return res
          .status(400)
          .json({
            message: `this ${Object.keys(error.keyValue)} already exists`,
          });
      }
      //if token is expired
      // JWT EXPIRE error
      if (error.name === "TokenExpiredError") {
        const message = `Json Web Token is Expired, Try again `;
        return res
          .status(400)
          .json({
            message
          });
      }
      // Pass the error to the next error-handling middleware
      next(error);
    } 
  };
}

module.exports = asynchandler;

//   module.exports=asynchandler

// module.exports = (theFunc) => (req, res, next) => {
//   Promise.resolve(theFunc(req, res, next)).catch(next);
// };
