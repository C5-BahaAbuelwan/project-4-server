const express = require("express");

const {   creatNewCategory,
} = require("../controllers/category");
const {   deleteCategoryById,
} = require("../controllers/category");
const {   updateCategoryById,
} = require("../controllers/category");
const {   allCategory,
} = require("../controllers/category");

const categoryRouter = express.Router();


categoryRouter.post("/", creatNewCategory);
categoryRouter.put("/:id", updateCategoryById);
categoryRouter.delete("/:id", deleteCategoryById);
categoryRouter.get("/", allCategory);



module.exports = categoryRouter;
