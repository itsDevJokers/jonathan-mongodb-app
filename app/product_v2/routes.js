const router = require('express').Router();
const multer = require('multer');
const { create, getAll, getById, update, destroy } = require('./controller');
// const { get, getById, create } = require('./controller');
const upload = multer({ dest: 'uploads'});

// router.get('/product', get);
// router.get('/product/:id', getById);
router.post('/product', upload.single('image'), create);
router.get('/product', getAll)
router.get('/product/:id', getById)
router.put('/product/:id', upload.single('image'), update)
router.delete('/product/:id', destroy)
module.exports = router;