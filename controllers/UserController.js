const {User, Profile} = require("../models/index")
const bcrypt = require("bcrypt")

class UserController {
    static async home(req, res) {
        try {
            res.redirect("/login")
        } catch (error) {
            res.send(error)
        }
    }
    static async registerForm(req, res) {
        try {

            console.log(data)
            // res.render("registerForm")
        } catch (error) {
            res.send(error)
        }
    }
    static async postRegisterForm(req, res) {
        try {
            const {name, gender, email, password, role} = req.body
            let newUser = await User.create({ email, password, role})

            await Profile.create({name, gender, ProfileId: newUser.id, role})

            res.redirect("/login")
        } catch (error) {
            res.send(error)
        }
    }
    static async loginForm(req, res) {
        try {
            res.redirect("/login")
        } catch (error) {
            res.send(error)
        }
    }
    static async postLoginForm(req, res) {
        try {
            res.redirect("/login")
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = UserController;