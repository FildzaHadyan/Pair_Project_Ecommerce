const express = require("express");
const router = express.Router();
const routerBuyer = require("./buyers")
const routerSeller = require("./sellers");
const UserController = require("../controllers/UserController");


// router.get("/", UserController.home)

//get register
router.get("/register", UserController.registerForm)
//post register
// router.post("/register", UserController.postRegisterForm)

//get login
router.get("/login", UserController.loginForm)
//post login
// router.post("/login", UserController.postLoginForm)




router.use("/buyer", routerBuyer)
router.use("/seller", routerSeller)

router.get("/logout", UserController.logout)

module.exports = router