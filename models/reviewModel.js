const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    comment: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Reviews', reviewSchema)