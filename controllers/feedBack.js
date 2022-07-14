const feedBackModel = require("../models/feedBack");
const productsModel = require("../models/products");

// function to creat feedBack

const creatNewFeedBack = (req, res) => {
  const productId = req.params.id;
  const { feedBack } = req.body;

  const newFeedBack = new feedBackModel({
    feedBack,
    commenter: req.token.userId,
  });
  newFeedBack
    .save()
    .then((result) => {
      console.log("result : ", result);

      console.log("result.id: ", result._id);
      productsModel
        .findOneAndUpdate(
          { _id: productId },
          { $push: { feedBack: result._id } },
          { new: true }
        )
        .then((result) => {
          console.log(result);

          res.status(201).json({
            success: true,
            message: `feedBack added`,
            product: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const deleteFeedBackById=(req,res)=>{
  let id = req.params.id;
  
  feedBackModel.findByIdAndDelete(id).then((result)=>{
    if(result){
      return res.status(200).json({
        success : true,
        message: "feedBack deleted"
      })
    } else {
      return res.status(404).json({
        success :false,
        message : `The feedBack: ${id} is not found`,
      })
    }
  }).catch((err)=>{
    res.status(500).json({
      success: false,
      message : "server Error",
      err : err.message
    })

  })

}


module.exports = {
  creatNewFeedBack,
  deleteFeedBackById
}
