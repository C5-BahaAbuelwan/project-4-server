const categoryModel = require("../models/category");

// function to creat category

const creatNewCategory = (req, res) => {
  // get the title from admin side
  const { title } = req.body;

  //  creat new variable represent the Category
  const category = new categoryModel({
    title,
  });
  //   save category to server
  category
    .save()
    .then((category) => {
      // if create category done
      res.status(201).json({
        success: true,
        message: `category created`,
        category: category,
      });
    })
    .catch((err) => {
      // if error in server
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const allCategory=(req,res)=>{
  categoryModel.find({}).then((result)=>{
    // if the server contain products return product details
    if (result.length) {
      res.status(200).json({
        success: true,
        message: `All the Category`,
        Category: result,
      });
    } else {
      //   if no product in server
      res.status(200).json({
        success: false,
        message: `No Category Yet`,
      });
    }
  })
  .catch((err) => {
    //   if server error

    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  });
}

const deleteCategoryById = (req, res) => {
  let id = req.params.id;

  categoryModel
    .findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        return res.status(200).json({
          success: true,
          message: "category deleted",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: `The category: ${id} is not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "server Error",
        err: err.message,
      });
    });
};

const updateCategoryById = (req, res) => {
    let id = req.params.id;
    categoryModel
      .findByIdAndUpdate(id, req.body, { new: true })
      .then((result) => {
        if (result) {
         return res.status(202).json({
            success: true,
            message: `category updated`,
            category: result,
          });
        } else{
          return res.status(404).json({
            success: false,
            message: `The category: ${id} is not found`,
          });
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
  creatNewCategory,
  deleteCategoryById,
  updateCategoryById,
  allCategory
};
