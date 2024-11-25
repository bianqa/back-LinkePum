const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
class Rol extends Model {}

Rol.init({
    idRol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,  
    },
  Instrumento_idInstrumento: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Instrumento',  
      key: 'idInstrumento'
    }
  },
  grupos_musicos_idAsociacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'grupos_musicos',  
      key: 'idAsociacion'
    }
  }
}, {
  sequelize,
  modelName: 'Rol',
  tableName: 'Rol', 
  timestamps: false, 
  freezeTableName: true 
});

module.exports = Rol;
