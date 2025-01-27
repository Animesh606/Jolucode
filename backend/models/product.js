const mongoose = require('mongoose')

const productSchema = new mongoose.Schema ({

    name:{
        type:string
    },
    price:{
        type:Number
    }
})

const Product = mongoose.model('Product',productSchema)

module.exports = Product;