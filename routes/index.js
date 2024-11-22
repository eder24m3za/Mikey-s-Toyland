const express = require('express');
const router = express.Router();
const toysController = require('../controllers/ToysController');

router.get('/toys', toysController.getToys);
router.get('/toys/:id', toysController.getToy);
router.post('/toys', toysController.createToys);
router.put('/toys/:id', toysController.updateToys);
router.delete('/toys/:id', toysController.deleteToys);

module.exports = router;
