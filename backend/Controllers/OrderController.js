const Order = require("../modals/OrderModal");
const User = require("../modals/UserModal");
const Product = require("../modals/ProductModal");
const asynchandler = require("../utils/asynchandler");

exports.createOrder = asynchandler(async (req, res, next) => {
  const {
    DeliveryAddress,
    OrderDetails,
    PaymentDetails,
    itemPrice,
    taxPrice,
    totalPrice,
    shippingPrice
  } = req.body;

  const neworder = await Order.create({
    DeliveryAddress,
    OrderDetails,
    PaymentDetails,
    itemPrice,
    taxPrice,
    totalPrice,
    shippingPrice,
    Fuser:req.userdetails._id,

  });

  await neworder.save()

  res.status(201).json({
    success:true,
    neworder
  })
});

//get  order details  

exports.getOrderDetails=asynchandler(async(req,res,next)=>{
   const orderid=req.params.pid
   const foundorder=await Order.findById(orderid).populate("Fuser","name email")  //Whenever in the schema of one collection we provide a reference (in any field) to a document from any other collection, we need a populate() method to fill the field with that document.
   
   if(!foundorder){
    return res.status(404).json({message:"Not Found"})
   }
  
   

   res.status(200).json({
    success:true,
    foundorder
  })
})

//get myorder details

exports.myOrders=asynchandler(async(req,res,next)=>{
  
  const order=await Order.find({Fuser:req.userdetails._id});
  // console.log(order)
  if(!order){
    return res.status(404).json({message:"Not Found"})
  }

  res.status(200).json({
    success:true,
    order
  })

})

//get all orders -->admin

exports.getAllOrders=asynchandler(async(req,res,next)=>{
  
  const order=await Order.find();

  if(!order){
    return res.status(404).json({message:"Not Found"})
  }

  let sum=0;
  order.forEach(ord=>{
    sum+=ord.totalPrice
  })
  res.status(200).json({
    success:true,
    total:sum,
    order
  })

})

//update order  status  -->admin

exports.UpdateStock = asynchandler(async (req, res, next) => {
  const order = await Order.findById(req.params.pid);

  if (!order) {
    return  res.staus(400).json({message:"Not found"});
  }

  if (order.orderStatus === "Delivered") {
    return res.staus(400).json({message:"You have already delivered this order"});
  }

  if (req.body.status === "Shipped") {
    order.OrderDetails.forEach(async (o) => {
      await updateStock(o.Fproduct, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.DeliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}


//delete order

exports.deleteOrder=asynchandler(async(req,res,next)=>{
  
  const order=await Order.findById(req.params.pid);

  if(!order){
    return res.status(404).json({message:"Not Found"})
  }

  await order.remove()

  res.status(200).json({
    success:true,
    total:sum,
    order
  })

})