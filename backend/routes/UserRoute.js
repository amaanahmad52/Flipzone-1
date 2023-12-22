const express = require('express')
const { createUser, loginUser, logout, resetPassword, forgotPassword, passwordChange, profileUpdate, getUserDetails, getAllUserDetails, makeAdmin, makeUser, DeleteUser} = require('../Controllers/UserController')
const { isAuthenticationCheck, isadmin } = require('../utils/auth')
const { Reviews } = require('../Controllers/ProductController')

const router = express.Router()

//general
router.route("/user/register").post(createUser)
router.route("/user/login").post(loginUser)
router.route("/user/logout").get(logout)
router.route("/user/forgotPassword").post(forgotPassword)
router.route("/user/resetPassword/:token").put(resetPassword)

//for a particular logined user
router.route("/user/me").get(isAuthenticationCheck,getUserDetails)
router.route("/user/changePassword").put(isAuthenticationCheck, passwordChange)
router.route("/user/profileUpdate").put(isAuthenticationCheck, profileUpdate)

router.route("/user/review").post(isAuthenticationCheck,Reviews)

//for admin
router.route("/admin/user/getAllUsers").get(isAuthenticationCheck,isadmin("admin"),getAllUserDetails)
router.route("/admin/user/getUser/:id").get(isAuthenticationCheck,isadmin("admin"),getUserDetails)
router.route("/admin/user/makeAdmin/:id").post(isAuthenticationCheck,isadmin("admin"),makeAdmin)
router.route("/admin/user/makeUser/:id").post(isAuthenticationCheck,isadmin("admin"),makeUser)
router.route("/admin/user/DeleteUser/:id").delete(isAuthenticationCheck,isadmin("admin"),DeleteUser)

module.exports=router 