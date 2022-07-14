const usersModel = require("../models/users");
const { OAuth2Client } = require("google-auth-library");
const { login } = require("./login");

// function to creat user

const register = (req, res) => {
  const { firstName, lastName, country, email, password, role } = req.body;
  const user = new usersModel({
    firstName,
    lastName,
    country,
    email,
    password,
    role,
  });
  user
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Account Created Successfully`,
        user: result,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const client = new OAuth2Client(
  "772371876471-b9bt95ad8nrmrvcvi8bb6qkgjnk140d9.apps.googleusercontent.com"
);
const CLIENT_ID =
  "772371876471-b9bt95ad8nrmrvcvi8bb6qkgjnk140d9.apps.googleusercontent.com";
/* 
const googlelogin = (req, res) => {
  console.log(req.body.response.profileObj.email);
  // res.json(req.body.email)
  const email = req.body.response.profileObj.email.toLowerCase();
  usersModel
    .findOne({ email })
    .then(async (result) => {
      console.log(result);
      if (!result) {
        console.log("in new user create");
        console.log("firstName:", req.body.response.profileObj.givenName);
        console.log("lastName:", req.body.response.profileObj.familyName);
        console.log("email:", req.body.response.profileObj.email);
        console.log("pass:", req.body.response.googleId);
        // console.log("firstName:", req.body.response.profileObj.givenName,);

        const user = new usersModel({
          firstName: req.body.response.profileObj.givenName,
          lastName: req.body.response.profileObj.familyName,
          country: "jo",
          email: req.body.response.profileObj.email,
          password: req.body.response.googleId,
          role,
        });
        console.log(user);
        user
          .save()
          .then((result) => {
            res.status(201).json({
              success: true,
              message: `Account Created Successfully`,
              user: result,
            });
          })
          .catch((err) => {
            if (err.keyPattern) {
              return res.status(409).json({
                success: false,
                message: `The email already exists`,
              });
            }
            res.status(500).json({
              success: false,
              message: `Server Error`,
              err: err.message,
            });
          });
      } else {
        try {
          const valid = await bcrypt.compare(password, result.password);
          if (!valid) {
            return res.status(403).json({
              success: false,
              message: `The password you’ve entered is incorrect`,
            });
          }
          const payload = {
            firstName: result.firstName,
            lastName: result.lastName,
            userId: result._id,
            country: result.country,
          };
          const options = { expiresIn: "120m" };
          const token = await jwt.sign(payload, process.env.SECRET, options);
          res.status(200).json({
            success: true,
            message: `Valid login credentials`,
            firstName: result.firstName,
            token: token,
            userId: result._id,
          });
        } catch (error) {
          throw error;
        }
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
}; */



module.exports = {
  register,
  
};
