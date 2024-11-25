const Publicacion = require('../models/publicacion');
const Grupos = require('../models/grupos');
const Musico = require('../models/musico');

exports.getPublicaciones = async (req, res) => {
    try {
        const publicaciones = await Publicacion.findAll({
            include: [
                {
                    model: Grupos,
                    attributes: ['nombre', 'descripcion', 'ubicacion'],
                },
                {
                    model: Musico,
                    attributes: ['nombre', 'apellido', 'ubicacion'],
                }
            ]
        });
        res.status(200).json(publicaciones);
    } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
        res.status(500).json({ error: 'Hubo un problema al obtener las publicaciones.' });
    }
};
