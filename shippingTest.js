const mongoose = require('mongoose');
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
.then(async () => {
  console.log('MongoDB Connected');

  // Create a test shipper user
  const shipper = new User({
    username: 'testShipper1',
    password: 'password', // Note: In a real application, you would hash the password before storing it.
    role: 'shipper',
    email: 'testShipper1@example.com',
  });
  await shipper.save();
  console.log('Test Shipper created:', shipper);

  // Run the shipping test script
  testShippingProcess();
})
.catch(err => console.log('Error connecting to MongoDB:', err));

async function testShippingProcess() {
  try {
    // 1. Order Creation
    // (Assuming an order is already created and stored in the database)

    // 2. Order Assignment
    const order = await Order.findOne({ status: 'Pending' }).populate('shopId');
    if (!order) {
      console.log('No pending orders found.');
      return;
    }
    console.log('Assigning Order:', order);

    const shipper = await User.findOne({ role: 'shipper' }); // Find a user with the role of a shipper
    if (!shipper) {
      console.log('No available shippers found.');
      return;
    }
    order.shipperId = shipper._id;
    order.status = 'Assigned';
    await order.save();

    // 3. Order Pickup
    console.log('Shipper picking up the order...');
    order.status = 'Picked Up';
    await order.save();

    // 4. Order Delivery
    console.log('Shipper delivering the order...');
    order.status = 'Delivered';
    await order.save();

    // 5. Order Completion
    console.log('Completing the order...');
    order.status = 'Completed';
    await order.save();

    console.log('Shipping process completed.');

  } catch (error) {
    console.error('Error testing shipping process:', error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
  }
}
