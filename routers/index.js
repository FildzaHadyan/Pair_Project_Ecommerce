const express = require("express");
const router = express.Router();
const routerBuyer = require("./buyers")
const routerSeller = require("./sellers");
const UserController = require("../controllers/UserController");


router.get("/", UserController.home)


//get login
router.get("/login", UserController.loginForm)
// post login
router.post("/login", UserController.postLoginForm)
//get register
router.get("/register", UserController.registerForm)
//post register
router.post("/register", UserController.postRegisterForm)

router.use(function (req, res, next) {
    if (!req.session.UserId) {
        const error = "Please register before proceed"
        return res.redirect(`/login?errors=${error}`)
    }else{
        next()       
    }     
})

const buyerSession = (function (req, res, next) {
    if (req.session.UserId && req.session.role !== "buyer") {
        const error = "Please Enter Valid Account"
        return res.redirect(`/login?errors=${error}`)
    }else{
        next()       
    }
}) 

const sellerSession = (function (req, res, next) {
    if (req.session.UserId && req.session.role !== "seller") {
        const error = "Please Enter Valid Account"
        return res.redirect(`/login?errors=${error}`)
    }else{
        next()       
    }
})


router.use("/buyer", buyerSession, routerBuyer)
router.use("/seller", sellerSession, routerSeller)

router.get("/logout", UserController.logout)

module.exports = router