const { ObjectId } = require('mongodb');
const db = require('../../config/mongodb');

// import path dan file system untuk mengelola file upload pada create dan update
const path = require('path'); 
const fs = require('fs');

const get = (req, res) => {
    const {q} = req.query;
    let nameQuery = {};
    q && (
        nameQuery = {
            name: q
        }
    )
    !q && (
        nameQuery = {}
    )
    db.collection('products').find(nameQuery)
        .toArray()
        .then(result => res.send(result))
        .catch(error => res.send(error))
}

const getById = (req, res) => {
    const {id} = req.params;
    db.collection('products').findOne({ _id: ObjectId(id)})
        .then(result => res.send(result))
        .catch(error => res.send(error))
}

const create = (req, res) => {
    const {name, price, stock, status} = req.body; // request dari body bisa berupa form atau json
    const image = req.file; // file image
    // jika image diupload
    if(image) {
        // target path ketika file image diupload dan mengubah nama sesuai aslinya
        const target = path.join(__dirname, '../../uploads', image.originalname); 
        fs.renameSync(image.path, target);
        db.collection('products').insertOne({
            name, 
            price: parseInt(price), 
            stock: parseInt(stock), 
            status: status == true ? true : false, 
            image: `https://jonathan-mongodb-app.herokuapp.com/uploads/${image.originalname}` 
        })
            .then(result => res.send(result))
            .catch(error => res.send(error))
        
    }
}

const update = (req, res) => {
    const {name, price, stock, status} = req.body;
    const {id} = req.params;
    const image = req.file; // file image
    if(image) {
        // target path ketika file image diupload dan mengubah nama sesuai aslinya
        const target = path.join(__dirname, '../../uploads', image.originalname); 
        fs.renameSync(image.path, target);
        db.collection('products').updateOne(
            { _id: ObjectId(id)},
            { $set: {
                name, 
                price: parseInt(price), 
                stock: parseInt(stock), 
                status: status == true ? true : false, 
                image: `https://jonathan-mongodb-app.herokuapp.com/uploads/${image.originalname}` }}
        )
            .then(result => res.send(result))
            .catch(error => res.send(error))
    } else {
        db.collection('products').updateOne(
            { _id: ObjectId(id)},
            { $set: {
                name, 
                price: parseInt(price), 
                stock: parseInt(stock), 
                status: status == true ? true : false, 
            }}
        )
            .then(result => res.send(result))
            .catch(error => res.send(error))
    }
}

const destroy = (req, res) => {
    const {id} = req.params;
    db.collection('products').deleteOne({ _id: ObjectId(id)})
        .then(result => res.send(result))
        .catch(error => res.send(error))
}

module.exports = {
    get, getById, create, update, destroy
}