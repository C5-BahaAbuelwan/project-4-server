const productsModel = require("../models/products");

// function to creat product

const createNewProduct = (req, res) => {
  // get the title, description, price, image, category_id, feedback from admin side

  const { title, description, price, image, category_id, feedback } = req.body;

  //  creat new variable represent the product

  const product = new productsModel({
    title,
    description,
    price,
    image,
    category_id,
    feedback,
  });

  //   save product to server
  product
    .save()
    .then((product) => {
      // if create product done
      res.status(201).json({
        success: true,
        message: `Article created`,
        article: product,
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

// function to getAllProducts

const getAllProducts = (req, res) => {
  const { page = 1, limit = 100 } = req.params;
  // use find {} to return all product from server
  productsModel
    .find({})
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .populate("category_id")
    .then((product) => {
      const count = productsModel.countDocuments();

      // if the server contain products return product details
      if (product.length) {
        res.status(200).json({
          success: true,
          message: `All the product`,
          products: product,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
        });
      } else {
        //   if no product in server
        res.status(200).json({
          success: false,
          message: `No Product Yet`,
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
};

const getAllProductsFiltration = async(req, res) => {
  // const { page = 1, limit = 100 } = req.params;
  // use find {} to return all product from server
  await productsModel
    .find({})
    .populate("category_id")
    .then((product) => {
      // const count = productsModel.countDocuments();

      // if the server contain products return product details
      if (product.length) {
        res.status(200).json({
          success: true,
          message: `All the product`,
          products: product,
          // totalPages: Math.ceil(count / limit),
          // currentPage: page,
        });
      } else {
        //   if no product in server
        res.status(200).json({
          success: false,
          message: `No Product Yet`,
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
};

// function to getProductById

const getProductById = async (req, res) => {
  // get id from query
  let id = req.params.id;

  // use findById to return product has own the id in query
  await productsModel
    .findById(id)
    .populate({ path: "feedBack", populate: { path: "commenter" } })

    .populate("category_id")
    .then((result) => {
      if (result) {
        //   if find the product return the product
        res.status(200).json({
          success: true,
          message: `The product with id ⇾ ${id}`,
          product: result,
        });
      } else {
        //   if no article with the request id
        res.status(404).json({
          success: false,
          message: `The product is not found`,
        });
      }
    })
    .catch((error) => {
      // if the server has an error
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: error.message,
      });
    });
};

// use updateProductById to update on product has own the id in params

const updateProductById = (req, res) => {
  let id = req.params.id;
  productsModel
    .findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => {
      if (result) {
        return res.status(202).json({
          success: true,
          message: `product updated`,
          product: result,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: `The product: ${id} is not found`,
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

// use deleteProductById to update on product has own the id in params

const deleteProductById = (req, res) => {
  let id = req.params.id;
  productsModel
    .findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        return res.status(200).json({
          success: true,
          message: "product deleted",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: `The product: ${id} is not found`,
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

// to export function to use it in routs

module.exports = {
  createNewProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  getAllProductsFiltration
};
