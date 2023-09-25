const mongoose = require('mongoose');
const Order = require('./models/order'); // Adjust the path as needed

// Define your MongoDB connection string
const mongoURI = 'mongodb+srv://andrew:1234@cluster0.taoc8gg.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected');
  // Run the script to generate orders
  generateOrders();
})
.catch(err => console.log('Error connecting to MongoDB:', err));

// Replace these with actual Product IDs from your database
const productIds = [
    '651091f16a5c7f5ec3d68d01',
    '6510dfda2c00d273aca8c84d',
    '6510dfda2c00d273aca8c84b',
    '6510e0383e243649dacc24cc',
    '6510e0383e243649dacc24ce',
    '6510e0383e243649dacc24cf',
  // ... more product ids
];

function getRandomProduct() {
  const randomIndex = Math.floor(Math.random() * productIds.length);
  return {
    productId: productIds[randomIndex],
    quantity: Math.floor(Math.random() * 10) + 1, // Quantity between 1 and 10
  };
}

function getRandomStatus() {
  const statuses = ['Active', 'Inactive'];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
}

async function generateOrders() {
  try {
    for (let i = 0; i < 15; i++) {
      const order = new Order({
        products: [getRandomProduct(), getRandomProduct()],
        status: getRandomStatus(),
        totalAmount: Math.floor(Math.random() * 1000) + 100, // Amount between 100 and 1000
        deliveryAddress: '123 Street, City, Country',
      });

      await order.save();
    }
    console.log('15 orders have been created');
  } catch (error) {
    console.error('Error creating orders:', error);
  } finally {
    mongoose.connection.close();
  }
}
