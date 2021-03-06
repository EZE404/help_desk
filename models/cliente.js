'use strict';

const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {

    //########## ID ##################
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'id',
      autoIncrement: true
    },
    //############ NOMBRE #############
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'nombre',
      //--------- VALIDACION ----------
      validate: {
        notNull: {
          msg: "El nombre no puede ser nulo"
        },
        notEmpty: {
          args: true,
          msg: "El nombre no puede estar vacío"
        },
        is: {
          args: /^[a-zA-ZÀ-ÿ]+([\s][a-zA-ZÀ-ÿ]+)*$/g,
          msg: "El nombre solo puede contener letras sin espacios dobles, ni espacios al principio y fin"
        }
      }
      //--------------------------------
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'apellido',
      //--------- VALIDACION ----------
      validate: {
        notNull: {
          msg: "El apellido no puede ser nulo"
        },
        notEmpty: {
          args: true,
          msg: "El apellido no puede estar vacío"
        },
        is: {
          args: /^[a-zA-ZÀ-ÿ]+([\s][a-zA-ZÀ-ÿ]+)*$/g,
          msg: "El apellido solo puede contener letras sin espacios dobles, ni espacios al principio y fin"
        }
      }
      //--------------------------------
    },
    //############### DNI #################
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'dni',
      validate: {
        notNull: {
          args: true,
          msg: "El DNI no puede ser nulo"
        },
        notEmpty: {
          args: true,
          msg: "El dni no puede estar vacío"
        },
        isNumeric: {
          args: true,
          msg: "El DNI solo puede contener números"
        },
        len: {
          args: [8, 10],
          msg: "El DNI debe ser una cadena de números de entre 8 y 10 dígitos"
        }
      }
    },
    //############## EMAIL #################
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'email',
      validate: {
        isEmail: {
          args: true,
          msg: "El correo debe ser una dirección válida"
        }
      }
    },
    //############ TELEFONO ################
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'telefono',
      validate: {
        notEmpty: {
          args: true,
          msg: "El teléfono no puede estar vacío"
        },
        isNumeric: {
          args: true,
          msg: "El teléfono debe ser una cadena solo de números"
        },
        len: {
          args: [10, 14],
          msg: "El teléfono debe ser un número válido entre 10 y 14 dígitos"
        }

      }
    },
    fechaAlta: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'fecha_alta',
      validate: {
        isDate: {
          args: true,
          msg: "La fecha de alta tiene que ser una fecha válida"
        }
      }
    },
    //########### CONTRASEÑA ##############
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'pass',
      validate: {
        notContains: {
          args: ' ',
          msg: "La contraseña no puede contener espacios"
        },
        len: {
          args: [8, 64],
          msg: "La contraseña debe contener entre 8 y 64caracteres"
        }
      }
    },
    //############# VERIFICADO ##############
    verificado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      field: 'verificado',
      validate: {
        validar(valor) {
          if (typeof valor !== 'boolean') {
            throw new Error("Verificado debe ser un booleano");
          }
        }
      }
    },
    //############# UUIDV4 ###########
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      field: 'uuid',
      validate: {
        isUUID: {
          args: 4,
          msg: "El UUID debe ser un UUIDV4 válido"
        }
      }
    }
    
  }, {});
  
  Cliente.associate = (models) => {

    Cliente.hasMany(models.Solicitud);

  };

  return Cliente;
};
