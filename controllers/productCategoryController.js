const Products = require('../models/productModel')

const proCateCtrl = {
    getProducts: async(req, res) => {
        try {
            const products = await Products.find(req.params)
            res.json({ products })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }
}

module.exports = proCateCtrl