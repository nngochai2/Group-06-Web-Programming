const mongoose = require('mongoose');

// Import models
const User = require('./models/user');
const Product = require('./models/product');
const Shop = require('./models/shop');
const Order = require('./models/order');

// Define your MongoDB connection string directly
const mongoURI = 'mongodb+srv://andrew:1234@cluster0.taoc8gg.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected');
  // Run the test script
  testModels();
})
.catch(err => console.log('Error connecting to MongoDB:', err));

async function testModels() {
  try {
    // Create a new user (vendor)
    const vendor = new User({
      username: 'vendor1',
      password: 'password',
      role: 'vendor',
      email: 'vendor1@example.com',
    });
    await vendor.save();
    console.log('Vendor created:', vendor);

    // Create a new product
    const product = new Product({
      name: 'Laptop',
      price: 1000,
      description: 'High-performance laptop',
    });
    await product.save();
    console.log('Product created:', product);

    // Create a new shop/distribution hub
    const shop = new Shop({
      vendorId: vendor._id,
      name: 'Electronics Hub',
      address: '123 Main St',
      products: [{ productId: product._id, quantity: 10 }],
    });
    await shop.save();
    console.log('Shop created:', shop);

    // Create a new user (customer)
    const customer = new User({
      username: 'customer1',
      password: 'password',
      role: 'customer',
      email: 'customer1@example.com',
    });
    await customer.save();
    console.log('Customer created:', customer);

    // Create a new order
    const order = new Order({
      customerId: customer._id,
      vendorId: vendor._id,
      shopId: shop._id,
      products: [{ productId: product._id, quantity: 1 }],
      totalAmount: product.price,
      deliveryAddress: '456 Elm St',
    });
    await order.save();
    console.log('Order created:', order);

    // Fetch and log the created order with populated fields
    const populatedOrder = await Order.findById(order._id)
      .populate('customerId')
      .populate('vendorId')
      .populate('shopId')
      .populate('products.productId');
    console.log('Populated Order:', populatedOrder);

  } catch (error) {
    console.error('Error testing models:', error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
  }
}
