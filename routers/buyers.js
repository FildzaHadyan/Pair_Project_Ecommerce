const express = require("express");
const BuyerController = require("../controllers/buyerController");
const router = express.Router();

router.get('/', BuyerController.home)
router.get('/categories', BuyerController.allCategories)
router.get('/categories/:CategoryId', BuyerController.sortByCategory)

router.get('/buyProduct/:id', BuyerController.buyProduct)
router.get('/buyProduct/:id/stockDecrease', BuyerController.decreaseStock)


module.exports = router