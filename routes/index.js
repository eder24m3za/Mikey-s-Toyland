const express = require('express');
const router = express.Router();
const toysController = require('../controllers/ToysController');

router.get('/toys', (req, res) => {
    toysController.getToys(req, res);
});

router.post('/toys', (req, res) => {
    toysController.createToys(req, res);
});

module.exports = router;