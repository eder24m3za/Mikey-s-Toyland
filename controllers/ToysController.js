const { Toys } = require('../models');
const Joi = require('joi');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const toySchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    company: Joi.string().required(),
    size: Joi.string().required(),
    image: Joi.string().optional()
});

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images'),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage });

module.exports = {
    getToys: async (req, res) => {
        try {
            const toys = await Toys.findAll();
            return res.status(200).send({ message: 'Toys retrieved successfully', data: toys });
        } catch (err) {
            return res.status(500).send({ errors: 'Error retrieving toys' + err });
        }
    },

    getToy: async (req, res) => {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).send({ errors: 'Invalid or missing ID' });
        }

        try {
            const toy = await Toys.findOne({ where: { id } });
            if (!toy) {
                return res.status(404).send({ errors: 'Toy not found' });
            }

            return res.status(200).send({ message: 'Toy retrieved successfully', data: toy });
        } catch (err) {
            return res.status(500).send({ errors: 'Error retrieving toy: ' + err });
        }
    },

    createToys: [
        upload.single('image'),
        async (req, res) => {
            const { name, description, price, company, size } = req.body;
            const image = req.file ? req.file.filename : null;

            const { error } = toySchema.validate({ name, description, price, company, size, image });
            if (error) {
                return res.status(400).send({ errors: error.details[0].message });
            }

            try {
                const toy = await Toys.create({ name, description, price, company, size, image });
                return res.status(201).send({ message: 'Toy created successfully', data: toy });
            } catch (err) {
                return res.status(500).send({ errors: 'Error creating toy: ' + err });
            }
        }
    ],

    updateToys: [
        upload.single('image'),
        async (req, res) => {
            const { id } = req.params;
            const { name, description, price, company, size } = req.body;
    
            if (!id || isNaN(id)) {
                return res.status(400).send({ errors: 'Invalid or missing ID' });
            }
    
            const { error } = toySchema.validate({ name, description, price, company, size });
            if (error) {
                return res.status(400).send({ errors: error.details[0].message });
            }
    
            try {
                const toy = await Toys.findOne({ where: { id } });
                if (!toy) {
                    return res.status(404).send({ errors: 'Toy not found' });
                }


                if (req.file) {
                    const newImage = req.file.filename;

                    if (toy.image) {
                        const oldImagePath = path.join(__dirname, '../public/images', toy.image);
                        if (fs.existsSync(oldImagePath)) {
                            fs.unlinkSync(oldImagePath);
                        }
                    }
    
                    // Actualiza la imagen y otros datos
                    await toy.update({ name, description, price, company, size, image: newImage });
                } else {
                    // Si no hay nueva imagen, solo actualiza otros datos
                    await toy.update({ name, description, price, company, size });
                }
    
                return res.status(200).send({ message: 'Toy updated successfully', data: toy });
            } catch (err) {
                return res.status(500).send({ errors: 'Error updating toy: ' + err });
            }
        }
    ],

    deleteToys: async (req, res) => {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).send({ errors: 'Invalid or missing ID' });
        }

        try {
            const toy = await Toys.findOne({ where: { id } });
            if (!toy) {
                return res.status(404).send({ errors: 'Toy not found' });
            }

            try {
                if (toy.image) {
                    const oldImagePath = path.join(__dirname, '../public/images', toy.image);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                        console.log('Imagen eliminada:', oldImagePath);
                    }
                }
            } catch (err) {
                console.error('Error al eliminar la imagen:', err);
            }
            
            await toy.destroy();
            return res.status(200).send({ message: 'Toy deleted successfully', data: toy });
        } catch (err) {
            return res.status(500).send({ errors: 'Error deleting toy: ' + err });
        }
    }
};
