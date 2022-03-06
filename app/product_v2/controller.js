const port = process.env.PORT || 8000;
const Product = require('./model');

// import path dan file system untuk mengelola file upload pada create dan update
const path = require('path'); 
const fs = require('fs');
const { ObjectId } = require('mongodb');

const getAll = (req, res) => {
    const {q} = req.query;
    let nameQuery = {};
    q && (
        nameQuery = {
            name: new RegExp(q, 'i')
        }
    )
    !q && (
        nameQuery = {}
    )
    Product.find(nameQuery).exec()
        .then(result => res.send(result))
        .catch(error => res.send(error))
}

const getById = (req, res) => {
    const {id} = req.params;
    Product.findById(id)
        .then(result => res.send(result))
        .catch(error => res.send(error))
}

const create = (req,res) => {
    res.header("Access-Control-Allow-Origin", "true");
    const {name, price, stock, status} = req.body; // request dari body bisa berupa form atau json
    const image = req.file; // file image
    // jika image diupload
    if(image) {
        // target path ketika file image diupload dan mengubah nama sesuai aslinya
        const target = path.join(__dirname, '../../uploads', image.originalname); 
        fs.renameSync(image.path, target);
        Product.create({name, price, stock, status, image: `https://jonathan-mongodb-app.herokuapp.com/uploads/${image.originalname}` })
            .then(result => res.send(result))
            .catch(error => res.send(error))
    } 
}

const update = (req,res) => {
    const {name, price, stock, status} = req.body; // request dari body bisa berupa form atau json
    const {id} = req.params;
    const image = req.file; // file image
    // jika image diupload
    if(image) {
        // target path ketika file image diupload dan mengubah nama sesuai aslinya
        const target = path.join(__dirname, '../../uploads', image.originalname); 
        fs.renameSync(image.path, target);
        Product.updateOne({
            _id: ObjectId(id)
        },{name, price, stock, status, image: `https://jonathan-mongodb-app.herokuapp.com/uploads/${image.originalname}` })
            .then(result => res.send(result))
            .catch(error => res.send(error))
    } else {
        Product.updateOne({
            _id: ObjectId(id)
        },{name, price, stock, status})
            .then(result => res.send(result))
            .catch(error => res.send(error))
    }
}

const destroy = (req,res) => {
    const {id} = req.params;
    Product.deleteOne({
        _id: ObjectId(id)
    })
        .then(result => res.send(result))
        .catch(error => res.send(error))
}

module.exports = {
    create, getAll, getById, update, destroy
}