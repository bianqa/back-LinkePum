const Musico = require('../models/musico');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await Musico.findAll();
        const userArray = users.map(musico => musico.toJSON());
        res.status(200).json(userArray);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).send('Hubo un problema al obtener los usuarios.');
    }
};
