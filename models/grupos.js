const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta según tu estructura de carpetas

const Grupos = sequelize.define('Grupos', {
    idGrupos: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(300),
    },
    fecha_creacion: {
        type: DataTypes.DATE,
    },
    promedio_rankin: {
        type: DataTypes.STRING(45),
    },
    ubicacion: {
        type: DataTypes.STRING(100),
    }
}, {
    tableName: 'Grupos',
    timestamps: false,
});

module.exports = Grupos;
