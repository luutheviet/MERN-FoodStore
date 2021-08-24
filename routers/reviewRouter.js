const router = require('express').Router()
const review = require('../controllers/reviewController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/reviews')
    .get(review.getReviews)
    .post(auth, review.createReview)

// router.route('/reviews/:id')
//     .delete(auth, authAdmin, category.deleteCategory)
//     .put(auth, authAdmin, category.updateCategory)

module.exports = router