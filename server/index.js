require('dotenv').config();
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const linksRoute = require('./routes/links.routes')

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
app.use('/', linksRoute)

mongoose.connect(process.env.MONGODB_URL)
    .then(() => { console.log('Mongo connected') })
    .catch(err => console.error('Connection failed :', err))

app.get('/', ((req, res) => {
    console.log('reached the server')
    res.status(200).json({ message: 'yo nvm bro th' })
}))

app.listen(3000, (() => {
    console.log('server started running on port 3000')
}))