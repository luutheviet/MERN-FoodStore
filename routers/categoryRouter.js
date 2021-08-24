const router = require('express').Router()
const category = require('../controllers/categoryController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/category')
    .get(category.getCategories)
    .post(auth, authAdmin, category.createCatagory)

router.route('/category/:id')
    .delete(auth, authAdmin, category.deleteCategory)
    .put(auth, authAdmin, category.updateCategory)

module.exports = router