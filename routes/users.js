const express=require("express")
const { register } = require("../controllers/users");
const { googlelogin } = require("../controllers/users");

const usersRouter = express.Router();

usersRouter.post("/", register);




module.exports = usersRouter;
