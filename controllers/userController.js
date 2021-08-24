const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Payments = require('../models/paymentModel')


const userController = {
    register: async(req, res) => {
        try {
            const { name, email, password } = req.body;
            const user = await User.findOne({ email })
            if (user) {
                return res.status(400).json({ msg: "Địa chỉ email đã được sử dụng!" })
            }
            if (password.length < 8) {
                return res.status(400).json({ msg: 'Mật khẩu phải ít nhất 8 ký tự!' })
            }

            const hashPass = await bcrypt.hash(password, 10)
            const newUser = new User({ name, email, password: hashPass })

            // Luu vao csdl
            await newUser.save()
                // Tao jsonwebtoken to authentication

            const accesstoken = createAcesstoken({ id: newUser._id })
            const refreshtoken = createRefreshtoken({ id: newUser._id })

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            res.json({ accesstoken, refreshtoken })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) return res.status(400).json({ msg: 'Bạn phải đăng nhập' })

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                    if (err) return res.status(400).json({ msg: 'Bạn phải đăng nhập' })
                    const accesstoken = createAcesstoken({ id: user.id })
                    res.json({ user, accesstoken })
                })
                // res.json({ rf_token })
        } catch (error) {
            return res.status(500).json({ msg: err.message })
        }

    },
    login: async(req, res) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) return res.status(400).json({ msg: 'Không tồn tại tài khoản!' })
            const checkPassword = await bcrypt.compare(password, user.password)
            if (!checkPassword) return res.status(400).json({ msg: 'Sai mật khẩu!' })

            // Dang nhap thanh cong
            const accesstoken = createAcesstoken({ id: user._id })
            const refreshtoken = createRefreshtoken({ id: user._id })

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            res.json({ accesstoken, refreshtoken })

        } catch (error) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async(req, res) => {
        try {
            res.clearCookie('refreshtoken', {
                path: '/user/refresh_token'
            })
            res.json({ msg: 'Đăng xuất thành công!' })
        } catch (error) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUser: async(req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password')
            if (!user) return res.status(400).json({ msg: 'Tai khoan khong ton tai' })

            res.json(user)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    addCart: async(req, res) => {
        try {
            const user = await User.findById(req.user.id)
            if (!user) return res.status(400).json({ msg: "Tài khoản không tồn tại" })

            await User.findOneAndUpdate({ _id: req.user.id }, {
                cart: req.body.cart
            })

            return res.json({ msg: "Thêm vào giỏ hàng" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    history: async(req, res) => {
        try {
            const history = await Payments.find({ user_id: req.user.id })

            res.json(history)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }
}

const createAcesstoken = (user) => {
    return jwt.sign(user, process.env.ACESSTOKEN_SECRET, { expiresIn: '11m' })
}
const createRefreshtoken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
}

module.exports = userController