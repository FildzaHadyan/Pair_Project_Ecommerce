const express = require("express");
const SellerController = require("../controllers/sellerController");
const router = express.Router();

router.get('/:sellerId', SellerController.productList)

router.get('/:sellerId/product/add', SellerController.showAddProduct)
router.post('/:sellerId/product/add', SellerController.postAddProduct)

router.get('/:sellerId/product/:id/edit', SellerController.showEditProduct)
router.post('/:sellerId/product/:id/edit', SellerController.postEditProduct)

router.get('/:sellerId/product/:id/delete', SellerController.deleteProduct)


module.exports = router