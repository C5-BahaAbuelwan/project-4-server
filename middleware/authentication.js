const jwt = require("jsonwebtoken");

//  checks if the user logged in

const authentication = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }
    const token = req.headers.authorization.split(" ").pop();

    jwt.verify(token, process.env.SECRET, (err, result) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: `The token is invalid or expired`,
        });
      } else {
        req.token = result;
        console.log('from backend',req.token);
        next();
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  }
};

// server.use(async (req, res, next) => {
//   const user = await db.user.findFirst({where: { id:  req.session.userId }})
//   req.user = user
//   next()
// })



module.exports = authentication;
