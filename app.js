const express = require('express');
const app = express();

// Definir las rutas
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Express!' });
});

// Otras rutas y configuraciones...

// Exportar la app
module.exports = app;
