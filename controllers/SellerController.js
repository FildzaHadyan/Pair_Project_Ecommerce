const { Product, Category, UserProduct, Profile } = require("../models")
const { Op } = require("sequelize")

class SellerController {
    static async productList(req, res) {
        try {
            const { deleted } = req.query

            const { sellerId } = req.params

            let products = await Product.findAll({
                include: [
                    {
                        model: Profile,
                        where: { id: sellerId }
                    },
                    {
                        model: Category
                    }
                ], 
                order: ["productName"],
            })
            let profile = await Profile.findByPk(sellerId)

            res.render('sellerProducts', { title: `Seller Products`, products, rupiahFormat, deleted, sellerId, profile })

        } catch (error) {
            res.send(error)
        }
    }

    static async showAddProduct(req, res) {
        try {
            const { errors } = req.query
            const { sellerId } = req.params
            let categories = await Category.findAll()

            res.render('addProduct', { title: 'Add Product', categories, errors, sellerId })

        } catch (error) {
            res.send(error)
        }
    }

    static async postAddProduct(req, res) {
        try {
            const { sellerId } = req.params

            const { name, description, price, CategoryId } = req.body
            
            let newProduct = await Product.create({ 
                name, description, price, CategoryId
            })

            await UserProduct.create({ProfileId: sellerId, ProductId: newProduct.id})

            res.redirect(`/seller/${sellerId}`)

        } catch (error) {
            const { sellerId } = req.params
            if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
                error = error.errors.map(el => {
                    return el.message
                })
                res.redirect(`/seller/${sellerId}/product/add?errors=${error}`)
            }
            else {
                res.send(error)
            }
        }
    }

    static async showEditProduct(req, res) {
        try {
            const { errors } = req.query
            const { id, sellerId } = req.params
            let product = await Product.findByPk(+id)
            let categories = await Category.findAll()

            res.render('editProduct', { title: 'Edit Product', product, categories, errors, sellerId })

        } catch (error) {
            res.send(error)
        }
    }

    static async postEditProduct(req, res) {
        try {
            const { id, sellerId } = req.params

            const { name, description, price, CategoryId } = req.body

            await Product.update({ name, description, price, CategoryId }, { where: { id } })

            res.redirect(`/seller/${sellerId}`)

        } catch (error) {
            const { id, sellerId } = req.params
            if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
                error = error.errors.map(el => {
                    return el.message
                })
                res.redirect(`/seller/${sellerId}/product/${id}/edit?errors=${error}`)
            }
            else {
                res.send(error)
            }
        }
    }

    static async deleteProduct(req, res) {
        try {
            const { id, sellerId } = req.params

            let deletedProduct = await Product.findByPk(+id)

            await UserProduct.destroy({ where: { ProfileId: sellerId,  ProductId: id} })

            await Product.destroy({ where: { id} })

            res.redirect(`/seller/${sellerId}?deleted=${deletedProduct.name}`)

        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = SellerController