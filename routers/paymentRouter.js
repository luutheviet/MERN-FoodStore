const router = require('express').Router()
const paymentCtrl = require('../controllers/paymentController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/payment')
    .get(auth, authAdmin, paymentCtrl.getPayments)
    .post(auth, paymentCtrl.createPayment)
router.route('/payment/:id')
    .put(auth, authAdmin, paymentCtrl.updatePayment)
    .delete(auth, authAdmin, paymentCtrl.deletePayment)
module.exports = router