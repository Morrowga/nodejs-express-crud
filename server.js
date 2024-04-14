const express = require('express')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose')
const Product = require('./app/models/product')
const Order = require('./app/models/order')
const cron = require('node-cron');

app.use(express.json())
app.use(cors());

app.post('/orders', async (req,res) => {
    try {
        const order = await Order.create(req.body)
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/orders', async (req,res) => {
    try {
        const token = req.query.session_token;
        if (!token) {
            return res.status(400).json({ message: 'Session token is missing' });
        }
        const orders = await Order.find({ session_token: token }).populate('products.product');
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/delete-all-orders', async (req, res) => {
    try {
      const sessionToken = req.query.session_token;
  
      const order = await Order.find({ session_token: sessionToken });

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      await Order.deleteMany({ session_token: sessionToken });
      
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting order' });
    }
});

app.delete('/orders/:orderId', async (req, res) => {
    try {
      const orderId = req.params.orderId;
  
      const order = await Order.findOne({ _id: orderId });
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      await Order.deleteOne({ _id: orderId });
      
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting order' });
    }
});

app.post('/products', async (req,res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products', async (req,res) => {
    try {
        const product = await Product.find()
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://thihaeung:CQFROwXjFzjPyHoT@crud-for-js.w1olwcw.mongodb.net/?retryWrites=true&w=majority&appName=crud-for-js').then(() => {
    app.listen(3000, () => {
        
        console.log('connected')
    })

    // scheduleTask();
}).catch((error) => {
    console.log(error)
})

const scheduledTask = async () => {
    try {
        const deleteResult = await Order.deleteMany({});
        console.log(`Deleted ${deleteResult.deletedCount} documents from the order collection.`);
      } catch (error) {
        console.error('Error deleting documents:', error);
      }
};
  

const scheduleTask = () => {
    const taskSchedule = '0 0 * * *';
  
    cron.schedule(taskSchedule, scheduledTask);
  
    console.log('Task scheduled to run at midnight UTC.');
};
  