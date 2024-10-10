const {User, Profile} = require("../models")
const bcrypt = require("bcryptjs")
const {comparePassword} = require("../helper/bcrypt")

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
            const {errors} = req.query
            // console.log(errors)
            // res.send(errors)
            let data = await User.findAll()
            // res.send(data)
            // console.log(data,"<<<<<<<<<<<<<< data");
            
            res.render("registerForm", {errors}) 
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
       console.log('AAAAAAAAAAAAAAAA');
       
        try {
            // console.log(req.body, "<<<<<<<<<<<<<<<<<<<")
            // const {email, password} = req.body
            console.log(req.body, "<<<<<<<<<<<<<<<<<<<")
            // let data = await User.findOne({
            //     where: {
            //         email
            //     }
            // })

            // if (!data) {
            //     throw "Invalid e-mail or password"
            // }
            // if (data.role !== "buyer") {
            //     throw "Invalid e-mail or password"
            // }
            // if (data.role !== "seller") {
            //     throw "Invalid e-mail or password"
            // }

            // let passwordChecking = comparePassword(password, data.password)
            
            // if(!passwordChecking) {
            //     throw "Invalid e-mail or password"
            // }
            // req.session.UserId = data.id
            // req.session.role = data.role
            // res.redirect("/login")
        } catch (error) {
            if (error.name === "SequelizeValidationError" || "SequelizeUniqueConstraintError") {
                error = error.errors.map((el) => {
                    return el.message   
                })
                res.redirect(`/login?errors=${error}`)
            }
            else{
                console.log(error);
                res.send(error)
            }
        }
    }
    static async logout(req, res) {
            req.session.destroy((error) => {
                if(error) {
                    res.send(error)
                }
                else {
                    res.redirect("/login")
                }
            })
    }
}

module.exports = UserController;