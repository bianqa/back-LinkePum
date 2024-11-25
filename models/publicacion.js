const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Publicacion = sequelize.define('Publicacion', {
    idPublicacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    imagen: {
        type: DataTypes.STRING(500),
    },
    texto: {
        type: DataTypes.STRING(100),
    },
    fecha_publicacion: {
        type: DataTypes.STRING(45),
        allowNull: false,
    }
}, {
    tableName: 'Publicacion',
    timestamps: false,
});

const Grupos = require('./grupos');
const Musico = require('./musico');

// Relaciones
Publicacion.belongsTo(Grupos, { foreignKey: 'Grupos_idGrupos' });
Publicacion.belongsTo(Musico, { foreignKey: 'Musico_idMusico' });

module.exports = Publicacion;
