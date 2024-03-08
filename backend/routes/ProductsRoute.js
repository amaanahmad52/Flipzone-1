const express = require('express')
const router = express.Router()

const {createProducts,getProducts, updateProducts, deleteProducts, getParticularProduct, getAdminProducts}=require("../Controllers/ProductController")
const { isAuthenticationCheck, isadmin } = require('../utils/auth')





// router.get("/products",(req,res)=>{
//     res.status(200).json({message:"working fine"})
// })

router.route("/products").get( getProducts) //this can be accessed by users, so no security
// router.route("products/:keyword").get(getProducts)
router.route("/product/:id").get(getParticularProduct)

router.route("/admin/products/create").post(isAuthenticationCheck, isadmin("admin"),createProducts)//**ordering of middleware matters.(left to right) pehle check then do other
router.route("/admin/products/update/:id").put(isAuthenticationCheck, isadmin("admin"),updateProducts)
router.route("/admin/products/delete/:id").delete(isAuthenticationCheck, isadmin("admin"),deleteProducts)

router.route("/admin/products").get(isAuthenticationCheck, isadmin("admin"),getAdminProducts)


// router.route("/products/:name").get(getParticularProduct)


module.exports=router


// order of inheritence productsmodal->productcontroller->productroute