const usersModel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const password = req.body.password;
  // isGoogle 
  const email = req.body.email.toLowerCase();
  usersModel
    .findOne({ email })
    .then(async (result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The email doesn't exist`,
        });
      }
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
          firstName:result.firstName,
          token: token,
          userId: result._id
        });
      } catch (error) {
        throw error;
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const googlelogin = (req, res) => {
  console.log(req.body.response.profileObj.email);
  // res.json(req.body.email)
  const email = req.body.response.profileObj.email.toLowerCase();
  usersModel
    .findOne({ email })
    .then(async (result) => {
      // console.log(result);
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
          role:"627cd37b12dec5d82be6786a"
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
        console.log("in else ");
        try {
          console.log("in try");
          let password=req.body.response.googleId
          const valid = await bcrypt.compare(password, result.password);
          if (!valid) {
            return res.status(403).json({
              success: false,
              message: `The password you’ve entered is incorrect`,
            });
          }
          console.log("after if valid");
          const payload = {
            firstName: result.firstName,
            lastName: result.lastName,
            userId: result._id,
            country: result.country,
          };

          console.log("payload",payload);

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
};

module.exports = {
  login,
  googlelogin
};
