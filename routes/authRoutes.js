const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Musico = require('../models/musico');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();
const SECRET_KEY = require('crypto').randomBytes(64).toString('hex');

router.post('/register', async (req, res) => {
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

        const token = jwt.sign({ id: newMusico.idMusico }, SECRET_KEY, {
            expiresIn: 86400, // 24 horas
        });

        res.status(201).send({ auth: true, token });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).send('Hubo un problema al registrar el usuario.');
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    let usuario = username;
    const user = await Musico.findOne({ where: { usuario } });

    if (!user) {
        console.log('Usuario no encontrado');
        return res.status(404).send('Usuario no encontrado.');
    }

    const passwordIsValid = bcrypt.compareSync(password, user.contrasena);

    if (!passwordIsValid) {
        console.log('Contraseña incorrecta');
        return res.status(401).send({ auth: false, token: null });
    }

    const token = jwt.sign({ id: user.idMusico }, SECRET_KEY, { expiresIn: 86400 });

    console.log('Login exitoso');
    res.status(200).send({ auth: true, token });
});

module.exports = router;
