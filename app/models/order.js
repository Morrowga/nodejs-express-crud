const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        qty: { type: Number, required: true }
      }
    ],
    session_token: {
      type: String,
      required: [true, "Product Session Token is required."]
    },
    total_price: {
      type: Number,
      required: [true, "Product Total Price is required."]
    },
    total_quantity: {
      type: Number,
      required: [true, "Product Total Quantity is required."]
    },
  }, 
  {
    timestamps: true
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
