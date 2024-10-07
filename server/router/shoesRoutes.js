const express = require('express');
const shoeController = require('../controllers/shoeController');
const isAuth = require('../middleware/auth');

const router = express.Router();

router.get('/', isAuth, shoeController.getAllShoes);
router.get('/:id', isAuth, shoeController.getShoeById);
router.post('/', isAuth, shoeController.addShoe);
router.put('/:id', isAuth, shoeController.updateShoe);
router.delete('/:id', isAuth, shoeController.deleteShoe);

module.exports = router;
