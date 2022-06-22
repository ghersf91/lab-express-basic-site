const express = require('express')
const { join } = require('path')

const app = express()

app.set('view engine', 'hbs')
app.set('views', join(__dirname, 'views'))

require('./db')

const Product = require('./models/Product.model')

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/tienda', (req, res) => {
    Product
        .find()
        .select({ title: 1, price: 1 })
        .sort({ price: 1 })
        .then(ironProducts => res.render('tienda', { ironProducts }))
        .catch(err => console.log(err))
})

app.listen(3000, () => console.log('SERVER RUNNING ON PORT 3000'))