//  RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023B
// Assessment: Assignment 2
// Author: Group 6
// ID: Pham Thanh Mai (s3978365)
//      Nguyen Ngoc Hai (s3978281)
//      Phan Nguyen Viet Nhan (s3978145)
//      Tran Nhat Minh (s3977767)
//      Nguyen Duy Anh (s4022628)
// Acknowledgement: Bootstrap, FontAwesome , Ion-icon, W3School, Freepik
const mongoose = require('mongoose');
// Import models
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

async function createSampleOrders() {
    try {
        const order1 = new Order({
            distributionHub: "Alpha",
            products: [
                { productId: "60d0fe4ef9ae550017b9c202", quantity: 2 },
                { productId: "60d0fe4ef9ae550017b9c203", quantity: 1 }
            ],
            status: "Active",
            deliveryAddress: "123 Street, City, Country",
            totalAmount: 100,
        });

        const order2 = new Order({
            distributionHub: "Beta",
            products: [
                { productId: "60d0fe4ef9ae550017b9c204", quantity: 3 }
            ],
            status: "Inactive",
            deliveryAddress: "456 Avenue, City, Country",
            totalAmount: 150,
        });

        const order3 = new Order({
            distributionHub: "Gamma",
            products: [
                { productId: "60d0fe4ef9ae550017b9c205", quantity: 1 },
                { productId: "60d0fe4ef9ae550017b9c206", quantity: 2 }
            ],
            status: "Active",
            deliveryAddress: "789 Boulevard, City, Country",
            totalAmount: 200,
        });

        const order4 = new Order({
            distributionHub: "Alpha",
            products: [
                { productId: "60d0fe4ef9ae550017b9c207", quantity: 4 }
            ],
            status: "Inactive",
            deliveryAddress: "101 Road, City, Country",
            totalAmount: 250,
        });

        await order1.save();
        await order2.save();
        await order3.save();
        await order4.save();

        console.log('Sample orders have been created');
    } catch (error) {
        console.error('Error creating sample orders:', error);
    }
}

createSampleOrders();
