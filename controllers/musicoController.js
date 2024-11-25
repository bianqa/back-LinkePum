const Musico = require('../models/musico');
const Instrumento = require('../models/instrumento');

exports.getMusicoById = async (req, res) => {
    const musicoId = req.params.id;
    try {
        const musico = await Musico.findOne({ where: { idMusico: musicoId } });
        if (!musico) return res.status(404).send('Músico no encontrado.');
        res.status(200).send(musico);
    } catch (error) {
        console.error('Error al obtener los datos del músico:', error);
        res.status(500).send('Hubo un problema al obtener los datos del músico.');
    }
};

exports.getMusicoInstrumentos = async (req, res) => {
    const musicoId = req.params.id;
    try {
        const musico = await Musico.findOne({
            where: { idMusico: musicoId },
            include: {
                model: Instrumento,
                through: { attributes: [] },
                attributes: ['nombre'],
            }
        });
        if (!musico) return res.status(404).json({ message: 'Músico no encontrado.' });
        const instrumentos = musico.Instrumentos.map(inst => inst.nombre);
        res.status(200).json({ instrumentos });
    } catch (error) {
        console.error('Error al obtener los instrumentos del músico:', error);
        res.status(500).json({ error: 'Hubo un problema al obtener los instrumentos del músico.' });
    }
};

exports.getUserMe = async (req, res) => {
    const musicoId = req.musico.id;
    try {
        const musico = await Musico.findOne({ where: { idMusico: musicoId } });
        if (!musico) return res.status(404).send('Músico no encontrado.');
        res.status(200).send(musico);
    } catch (error) {
        console.error('Error al obtener los datos del músico:', error);
        res.status(500).send('Hubo un problema al obtener los datos del músico.');
    }
};

exports.deleteUser = async (req, res) => {
    const musicoId = req.musico.id;
    try {
        const musico = await Musico.findOne({ where: { idMusico: musicoId } });
        if (!musico) return res.status(404).json({ message: 'Músico no encontrado.' });
        await Musico.destroy({ where: { idMusico: musicoId } });
        res.status(200).json({ message: 'Músico eliminado con éxito.' });
    } catch (error) {
        console.error('Error al eliminar el músico:', error);
        res.status(500).json({ message: 'Hubo un problema al eliminar el músico.' });
    }
};

exports.updateUser = async (req, res) => {
    const musicoId = req.musico.id;
    const { nombre, apellido, ubicacion, descripcion, foto_perfil, foto_portada } = req.body;
    try {
        const [updated] = await Musico.update(
            { nombre, apellido, ubicacion, descripcion, foto_perfil, foto_portada },
            { where: { idMusico: musicoId } }
        );
        if (updated) {
            const updatedMusico = await Musico.findOne({ where: { idMusico: musicoId } });
            res.status(200).json(updatedMusico);
        } else {
            res.status(404).json({ error: 'Músico no encontrado.' });
        }
    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        res.status(500).json({ error: 'Hubo un problema al actualizar el perfil.' });
    }
};
