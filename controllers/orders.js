const ordersModel = require("../models/order");


const creatNewOrders=(req,res)=>{
    const userId=req.token.userId

    const order= new ordersModel({
        user_id:userId,
        order
    })
    order.save().then().catch()

}


