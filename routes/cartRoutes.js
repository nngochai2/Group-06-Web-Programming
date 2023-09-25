/* RMIT University Vietnam
  Course: COSC2430 Web Programming
  Semester: 2023B
  Assessment: Assignment 2
  Author: Group 6
  ID: Pham Thanh Mai (s3978365)
       Nguyen Ngoc Hai (s3978281)
       Phan Nguyen Viet Nhan (s3978145)
       Tran Nhat Minh (s3977767)
       Nguyen Duy Anh (s4022628
  Acknowledgement: Bootstrap, FontAwesome , Ion-icon, W3School, Freepik */
const express = require("express");
const Cart = require("../models/cart");
const Product = require("../models/product"); 
const { ensureAuthenticated } = require("../middleware/authentication");


const router = new express.Router();

// Get cart items
router.get("/cart", ensureAuthenticated, async (req, res) => {
  const owner = req.user._id;

  try {
    const cart = await Cart.findOne({ owner });
    if (cart && cart.items.length > 0) {
      res.status(200).send(cart);
    } else {
      res.send(null);
    }
  } catch (error) {
    res.status(500).send();
  }
});

// Add item to cart
router.post("/cart", ensureAuthenticated, async (req, res) => {
  const owner = req.user._id;
  const { productId, quantity } = req.body; 

  try {
    const cart = await Cart.findOne({ owner });
    const product = await Product.findOne({ _id: productId }); 

    if (!product) {
      res.status(404).send({ message: "Product not found" }); 
      return;
    }
    const price = product.price;
    const name = product.name;

    if (cart) {
      const productIndex = cart.items.findIndex((p) => p.productId == productId); 

      if (productIndex > -1) {
        let productItem = cart.items[productIndex];
        productItem.quantity += quantity;
        cart.bill += quantity * price;
        cart.items[productIndex] = productItem;
        await cart.save();
        res.status(200).send(cart);
      } else {
        cart.items.push({ productId, name, quantity, price }); 
        cart.bill += quantity * price;
        await cart.save();
        res.status(200).send(cart);
      }
    } else {
      const newCart = await Cart.create({
        owner,
        items: [{ productId, name, quantity, price }], 
        bill: quantity * price,
      });
      return res.status(201).send(newCart);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

router.delete("/cart/", ensureAuthenticated, async (req, res) => {
  const owner = req.user._id;
  const productId = req.query.productId; 

  try {
    let cart = await Cart.findOne({ owner });

    const productIndex = cart.items.findIndex((p) => p.productId == productId); 
    if (productIndex > -1) {
      let productItem = cart.items[productIndex];
      cart.bill -= productItem.quantity * productItem.price;
      cart.bill = Math.max(cart.bill, 0);
      cart.items.splice(productIndex, 1);
      await cart.save();
      res.status(200).send(cart);
    } else {
      res.status(404).send("Product not found"); 
    }
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

module.exports = router;
