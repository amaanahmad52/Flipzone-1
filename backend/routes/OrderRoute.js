const express = require('express')
const { isAuthenticationCheck, isadmin } = require('../utils/auth')
const { createOrder, getOrderDetails, myOrders, getAllOrders, UpdateStock, deleteOrder } = require('../Controllers/OrderController')
const router=express.Router()

router.route("/order/create").post(isAuthenticationCheck,createOrder)
router.route("/order/details/:pid").get(isAuthenticationCheck,getOrderDetails)
router.route("/order/myorders").get(isAuthenticationCheck,myOrders)

router.route("/admin/order/allOrders").get(isAuthenticationCheck,isadmin("admin"), getAllOrders)
router.route("/admin/order/update/:pid").put(isAuthenticationCheck,isadmin("admin"), UpdateStock)
router.route("/order/cancelOrder/:pid").delete(isAuthenticationCheck, deleteOrder)



module.exports=router 