const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Instrumento = require('./instrumento');

const Musico = sequelize.define('Musico', {
    idMusico: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ubicacion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
    },
    foto_perfil: {
        type: DataTypes.STRING,
    },
    foto_portada: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'Musico',
    timestamps: false,
});

Musico.belongsToMany(Instrumento, { through: 'musico_instrumento', foreignKey: 'Musico_idMusico' });
Instrumento.belongsToMany(Musico, { through: 'musico_instrumento', foreignKey: 'Instrumento_idInstrumento' });

module.exports = Musico;
