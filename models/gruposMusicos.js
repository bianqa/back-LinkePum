const { DataTypes } = require('sequelize');
const db = require('../config/database'); 

const GruposMusicos = db.define('GruposMusicos', {
  idAsociacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Grupos_idGrupos: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Grupos', 
      key: 'idGrupos',
    },
  },
  Musico_idMusico: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Musico', 
      key: 'idMusico',
    },
  },
  activo: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1, 
  },
}, {
  tableName: 'grupos_musicos', 
  timestamps: false,       
});

module.exports = GruposMusicos;
