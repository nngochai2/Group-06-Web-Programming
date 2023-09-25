const mongoose = require('mongoose');
const Product = require('./models/product');

// MongoDB connection string
const mongoURI = 'mongodb+srv://andrew:1234@cluster0.taoc8gg.mongodb.net/?retryWrites=true&w=majority'; 

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('Error connecting to MongoDB:', err));

// Define sample computer component products
const sampleProducts = [
    {
        name: 'Intel Core i7-12700K',
        price: 410,
        description: '12-core, 20-thread processor with a base clock speed of 3.6 GHz',
        category: 'Processors',
        stockQuantity: 25
    },
    {
        name: 'ASUS TUF Gaming GeForce RTX 3080',
        price: 900,
        description: '10GB GDDR6X Graphics Card with PCIe 4.0 support',
        category: 'Graphics Cards',
        stockQuantity: 10
    },
    {
        name: 'Corsair Vengeance LPX 64GB RAM',
        price: 300,
        description: 'DDR4 DRAM 3200MHz C16 Memory Kit',
        category: 'Memory',
        stockQuantity: 40
    },
    {
        name: 'Samsung 980 PRO NVMe SSD 2TB',
        price: 330,
        description: 'Internal Gaming SSD with PCIe 4.0 support',
        category: 'Storage',
        stockQuantity: 30
    },
    {
        name: 'ASUS ROG Strix Z590-E Gaming WiFi 6E Motherboard',
        price: 380,
        description: 'ATX Motherboard with PCIe 4.0, WiFi 6E, and 14+2 Power Stages',
        category: 'Motherboards',
        stockQuantity: 20
    }
    
];

// Insert sample products into the database
Product.insertMany(sampleProducts)
    .then(() => {
        console.log('Sample products have been created');
        mongoose.connection.close(); // Close the connection after insertion
    })
    .catch(err => console.error('Error creating sample products:', err));
