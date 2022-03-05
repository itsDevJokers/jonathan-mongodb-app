const router = require('express').Router();
const multer = require('multer');
const { get, getById, create, update, destroy } = require('./controller');
const upload = multer({ dest: 'uploads'});



router.get('/product', get);
router.get('/product/:id', getById);
router.post('/product', upload.single('image'), create);
router.put('/product/:id', upload.single('image'), update);
router.delete('/product/:id', destroy);

module.exports = router;