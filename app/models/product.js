const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required."]
        },
        image:{
            type: String,
            required: [true, "Product image is required."]
        },
        price: {
            type: Number,
            required: [true, "Product Price is required."]
        },
    }, 
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product;