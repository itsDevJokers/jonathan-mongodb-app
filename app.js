// Mendaftarkan dependencies yang telah diinstall melalui npm
require('./config/mongoose');
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const logger = require('morgan');
const port = process.env.PORT || 8000;
const productRouter = require('./app/product/routes');
const productRouterV2 = require('./app/product_v2/routes');


app.use(logger('dev')); // middleware untuk mengetahui aktivitas request

app.use(cors()); // cors atau middleware untuk mengijinkan request data dari client

// app.use((req,res,next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// })
// kedua middleware berfungsi untuk parsing data ke dalam bentuk json berdasarkan body-parse
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use('/uploads/', express.static(path.join(__dirname, 'uploads'))); // middleware untuk mengelola file yang bisa didownload berdasarkan letak path folder
app.use('/api/v1', productRouter);
app.use('/api/v2', productRouterV2);
// ketika server sukses berjalan dengan port yang sudah ditentukan
app.listen(port)
