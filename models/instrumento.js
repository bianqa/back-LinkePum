const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Instrumento = sequelize.define('Instrumento', {
    idInstrumento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo_instrumento: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'Instrumento',
    timestamps: false,
});

module.exports = Instrumento;
