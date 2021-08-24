require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')

const PORT = process.env.PORT || 5000


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

// Routes

app.use('/user', require('./routers/userRouter'))
app.use('/api', require('./routers/reviewRouter'))
app.use('/api', require('./routers/categoryRouter'))
app.use('/api', require('./routers/upload'))
app.use('/api', require('./routers/productRouter'))
app.use('/api', require('./routers/paymentRouter'))
app.use('/api', require('./routers/productsCategoryRouter'))

// Connect to mongodb

const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err
    console.log('Connect to MongoDB')
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log('Server is runing in PORT: ', PORT)
})