const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Import Routers
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
//
const productsRouter = require("./routes/products");
const categoryRouter = require("./routes/category");
// const  cartRouter =require("./routes/cart");
const rolesRouter = require("./routes/role");
// const cloudinaryRouter=require("./routes/upload")

const cartRouter = require("./routes/cart");

// Routes Middleware
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/products", productsRouter);
app.use("/category", categoryRouter);
app.use("/cart", cartRouter);
app.use("/roles", rolesRouter);

// app.use("/", cloudinaryRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});





//! 