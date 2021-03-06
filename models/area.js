'use strict';

module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define('Area', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'id',
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'nombre',
      validate: {
        notNull: {
          args: true,
          msg: "El nombre no puede ser nulo"
        },
        notEmpty: {
          args: true,
          msg: "El nombre no puede estar vacío"
        },
        is: {
          args: /^[a-zA-ZÀ-ÿ0-9]+([\s][a-zA-ZÀ-ÿ0-9]+)*$/g,
          msg: "El nombre solo puede contener letras y números. Sin espacios dobles ni espacios al principio o final"
        }
      }
    },
    activa: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    editable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {});

  Area.associate = (models) => {

    Area.hasMany(models.Empleado);
    
    Area.hasMany(models.Solicitud);
    
  };
  
  return Area;
};
