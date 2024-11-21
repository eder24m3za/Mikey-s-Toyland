const { Toys } = require('../models');

module.exports = {

    getToys: (req, res) => {
        res.send('Toys!');
    },

    createToys: async (req, res) => {
        const { name, description, price, company, size } = req.body;

        if( !name || !description || !price || !company || !size ) {
            return res.status(400).send('All fields are required');
        }

        try {
            const toy = await Toys.create({
                name: name,
                description: description,
                price: price,
                company: company,
                size: size
            });
            return res.status(201).send(toy);
        } catch (err) {
            return res.status(500).send('Error creating toy: ' + err);
        }
    }
};