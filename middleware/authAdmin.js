const jwt = require('jsonwebtoken')
const Users = require('../models/userModel')

const authAdmin = async(req, res, next) => {
    try {
        const user = await Users.findOne({
            _id: req.user.id
        })
        if (user.role === 0) return res.status(400).json({ msg: 'Khong duoc phep truy cap' })
        next()
    } catch (error) {
        return res.status.json({ msg: error.message })
    }
}

module.exports = authAdmin