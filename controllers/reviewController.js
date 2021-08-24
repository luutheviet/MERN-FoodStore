const Reviews = require('../models/reviewModel')

const categoryControl = {
    getReviews: async(req, res) => {
        try {
            const reviews = await Reviews.find()
            res.json({ reviews })
        } catch (error) {
            return res.status(400).json({ msg: error.message })
        }
    },
    createReview: async(req, res) => {
        try {

            const { name, email, comment, rate, product_id } = req.body
            const newReview = new Reviews({ name, email, comment, rate, product_id })

            await newReview.save()
            res.json({ msg: 'Nhận xét của bạn đã được ghi lại!' })
        } catch (error) {
            return res.status(400).json({ msg: error.message })
        }
    },
    // deleteCategory: async(req, res) => {
    //     try {
    //         const products = await Products.findOne({ category: req.params.id })
    //         if (products) return res.status(400).json({ msg: "Cần xóa hết products liên quan trước" })
    //         await Categories.findByIdAndDelete(req.params.id)
    //         res.json({ msg: 'Delete category successfully' })
    //     } catch (error) {
    //         return res.status(500).json({ msg: error.message })
    //     }
    // },
    // updateCategory: async(req, res) => {
    //     try {
    //         const { name } = req.body
    //         await Categories.findOneAndUpdate({ _id: req.params.id }, { name })

    //         res.json({ msg: 'Update sucessfully' })
    //     } catch (error) {
    //         return res.status(500).json({ msg: error.message })
    //     }
    // }
}

module.exports = categoryControl