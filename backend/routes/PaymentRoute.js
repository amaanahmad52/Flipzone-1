const express = require('express')
const { isAuthenticationCheck } = require('../utils/auth')
const { processPayment, getPublishableKey } = require('../Controllers/PaymentController')
const router=express.Router()

router.route("/process/payment").post(isAuthenticationCheck,processPayment)
router.route("/publishableKey").get(isAuthenticationCheck,getPublishableKey)


module.exports=router 