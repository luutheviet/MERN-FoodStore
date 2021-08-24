const router = require('express').Router()
const ProCateCtrl = require('../controllers/productCategoryController')

router.get('/product-category/:category', ProCateCtrl.getProducts)

module.exports = router