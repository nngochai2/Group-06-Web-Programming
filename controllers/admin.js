const Product = require('../models/product');

exports.postProduct = (req, res, next) => {
    const prod = new Product({
        title: req.body.title,
        imageURL: req.body.imageURL,
        price: req.body.price,
        description: req.body.description
    });
    prod.save()
        .then(result => {
            res.redirect('/');
        }).catch(err => console.log(err));

}

exports.editProductPage = (req, res, next) => {
    Product.findById(req.params.prodId)
        .then(product => {
            res.render('edit-product', { product: product, path: '/', pageTitle: 'Edit Product', name: 'Tina' });
        }).catch(err => console.log(err));

}

exports.editProductPost = (req, res, next) => {

    Product.updateOne({ _id: req.body.id }, { $set: { title: req.body.title, imageURL: req.body.imageURL, price: req.body.price, description: req.body.description } })
        .then(result => {
            res.redirect('/products/' + req.body.id);
        })
        .catch(err => console.log(err));
}

exports.deleteProduct = (req, res, next) => {

    Product.findByIdAndRemove(req.body.id) //findAndModify
        .then(result => {
            res.redirect('/');
        })
        .catch(err => console.log(err));

}