const {User, Profile} = require("../models")
const bcrypt = require("bcryptjs")

class UserController {
    static async home(req, res) {
        try {
            res.render("homePage")
        } catch (error) {
            res.send(error)
        }
    }

    static async registerForm(req, res) {
        try {
            // const {errors} = req.query
            // console.log(errors)
            // res.send(errors)
            let data = await User.findAll()
            // res.send(data)
            console.log(data,"<<<<<<<<<<<<<< data");
            
            res.render("registerForm", {data}) 
        } catch (error) {
            console.log(error, "<<<<<<<<<<< registerform");
            // res.send(error)
        }
    }
    static async postRegisterForm(req, res) {
        try {
            const {name, gender, email, password, role} = req.body
            let newUser = await User.create({ email, password, role})

            await Profile.create({name, gender, ProfileId: newUser.id, role})

            res.redirect("/login")
        } catch (error) {
            if (error.name === "SequelizeValidationError" || "SequelizeUniqueConstraintError") {
                error = error.errors.map((el) => {
                    return el.message   
                })
                res.redirect(`/register?errors=${error}`)
            }
            else{
                console.log(error);
                res.send(error)
            }
        }
    }
    static async loginForm(req, res) {
        try {
            // const {errors} = req.query
            // console.log(errors)
            // res.send(errors)
            res.render("loginForm")
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async postLoginForm(req, res) {
        try {
            const {email, password} = req.body


            res.redirect("/login")
        } catch (error) {
            if (error.name === "SequelizeValidationError" || "SequelizeUniqueConstraintError") {
                error = error.errors.map((el) => {
                    return el.message   
                })
                res.redirect(`/register?errors=${error}`)
            }
            else{
                console.log(error);
                res.send(error)
            }
        }
    }
    static async logout(req, res) {
        try {
            // if()
            res.redirect("/login")
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = UserController;