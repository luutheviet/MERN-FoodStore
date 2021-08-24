const Products = require('../models/productModel')

class APIfeatures {
    constructor(query, queryString) {
        this.query = query
        this.queryString = queryString
    }
    filtering() {
        const queryObj = {...this.queryString }
        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryObj[el]))
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, math => '$' + math)
        this.query.find(JSON.parse(queryStr))
        return this
    }

    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createAt')
        }
        return this
    }

    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this
    }
}

const productController = {
    getProducts: async(req, res) => {
        try {
            // const { product_id } = req.body
            const features = new APIfeatures(Products.find(), req.query).filtering().sorting().paginating()
            const products = await features.query
            if (products.length === 0) {
                return res.status(400).json({ msg: 'Khong tim thay product trong csdl' })
            }
            res.json({
                status: 'success',
                result: products.length,
                products: products
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    createProducts: async(req, res) => {
        try {
            const { product_id, title, price, description, content, images, category } = req.body
            if (!images) return res.status(400).json({ msg: 'No img upload' })

            const product = await Products.findOne({ product_id })
            if (product) {
                return res.status(400).json({ msg: 'This product is exists' })
            }

            const newProduct = new Products({
                product_id,
                title,
                price,
                description,
                content,
                images,
                category
            })
            await newProduct.save()

            res.json({ newProduct })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    deleteProducts: async(req, res) => {
        try {
            const id = req.params.id
            await Products.findByIdAndDelete(id)
            res.json({ msg: 'Xoa thanh cong' })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    updateProducts: async(req, res) => {
        try {
            const { title, price, description, content, images, category } = req.body
            if (!images) {
                return res.status(400).json({ msg: 'Chua chon anh update' })
            }
            await Products.findByIdAndUpdate(req.params.id, {
                title,
                price,
                description,
                content,
                images,
                category
            })
            res.json({ msg: 'update thanh cong' })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }
}

module.exports = productController