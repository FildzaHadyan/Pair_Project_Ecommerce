const express = require("express");
const router = express.Router();
const routerBuyer = require("./buyers")
const routerSeller = require("./sellers");
const UserController = require("../controllers/UserController");


router.get("/", UserController.home)
router.get("register", UserController.registerForm)
router.post("/register", UserController.postRegisterForm)
router.get("/login", UserController.loginForm)
router.post("/login", UserController.postLoginForm)

router.use("/buyer", routerBuyer)
router.use("/seller", routerSeller)

module.exports = router