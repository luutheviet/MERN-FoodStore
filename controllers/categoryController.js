const Categories = require('../models/categoryModel')
const Products = require('../models/productModel')

const categoryControl = {
    getCategories: async(req, res) => {
        try {
            const categories = await Categories.find()
            res.json({ categories })
        } catch (error) {
            return res.status(400).json({ msg: error.message })
        }
    },
    createCatagory: async(req, res) => {
        try {

            const { name } = req.body
            const category = await Categories.findOne({ name })
            if (category) return res.status(400).json({ msg: "This categor already exits" })

            const newCategory = new Categories({ name })

            await newCategory.save()
            res.json({ msg: 'Create category successfully' })
        } catch (error) {
            return res.status(400).json({ msg: error.message })
        }
    },
    deleteCategory: async(req, res) => {
        try {
            const products = await Products.findOne({ category: req.params.id })
            if (products) return res.status(400).json({ msg: "Cần xóa hết products liên quan trước" })
            await Categories.findByIdAndDelete(req.params.id)
            res.json({ msg: 'Delete category successfully' })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    updateCategory: async(req, res) => {
        try {
            const { name } = req.body
            await Categories.findOneAndUpdate({ _id: req.params.id }, { name })

            res.json({ msg: 'Update sucessfully' })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }
}

module.exports = categoryControl