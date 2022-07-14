const express = require("express");
const { login } = require("../controllers/login");
const { googlelogin } = require("../controllers/login");

const loginRouter = express.Router();

loginRouter.post("/", login);
loginRouter.post("/", login);
loginRouter.post("/googlelogin", googlelogin);

module.exports = loginRouter;
