const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Musico = require('../models/musico');
const crypto = require('crypto');

const SECRET_KEY = crypto.randomBytes(64).toString('hex');

exports.register = async (req, res) => {
    const { nombre, apellido, usuario, contrasena, ubicacion } = req.body;
    try {
        const existingUser = await Musico.findOne({ where: { usuario } });
        if (existingUser) {
            return res.status(400).json({ error: 'El usuario ya existe.' });
        }
        const hashedPassword = bcrypt.hashSync(contrasena, 8);
        const newMusico = await Musico.create({
            nombre,
            apellido,
            usuario,
            contrasena: hashedPassword,
            ubicacion,
        });
        const token = jwt.sign({ id: newMusico.idMusico }, SECRET_KEY, { expiresIn: 86400 });
        res.status(201).send({ auth: true, token });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).send('Hubo un problema al registrar el usuario.');
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await Musico.findOne({ where: { usuario: username } });
        if (!user) return res.status(404).send('Usuario no encontrado.');
        const passwordIsValid = bcrypt.compareSync(password, user.contrasena);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        const token = jwt.sign({ id: user.idMusico }, SECRET_KEY, { expiresIn: 86400 });
        res.status(200).send({ auth: true, token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send('Hubo un problema al iniciar sesión.');
    }
};

exports.checkUserExists = async (req, res) => {
    const { username } = req.query;
    if (!username) return res.status(400).json({ error: 'El nombre de usuario es requerido.' });
    try {
        const user = await Musico.findOne({ where: { usuario: username } });
        res.status(200).json({ exists: !!user });
    } catch (error) {
        console.error('Error al verificar el usuario:', error);
        res.status(500).json({ error: 'Hubo un problema al verificar el usuario.' });
    }
};
