'use strict';

import Model from 'sequelize';
import {v4} from 'uuid'
import hashPassword from '../helpers/bcrypt'
const {hashPassword} = require( '../helpers/bcrypt' );

const {
  Model
} = require( 'sequelize' );
module.exports = ( sequelize, DataTypes ) =>
{
  class User extends Model
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( models )
    {
      // define association here
    }
  }
  User.init( {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'User Firstname cannot be empty',
        },
        len: {
          args: [1, 20],
          msg: 'Firstname must between 1 - 20 character',
        },
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'User Lastname cannot be empty',
        },
        len: {
          args: [1, 20],
          msg: 'Lastname must between 1 - 20 character',
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'User fullname cannot be empty',
        },
        len: {
          args: [1, 20],
          msg: 'Firstname must between 1 - 20 character',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        argv: true,
        msg: 'email is already in use',
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty',
        },
      },
    },
    profile_picture: {types: DataTypes.STRING, allowNull: true},
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty',
        },
        len: {
          args: [5, 30],
          msg: 'Minimum length of password is 5',
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emergency_contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    academic_year: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    study_program: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    personal_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destroyedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
    {
      hooks: {
        beforeCreate( instance )
        {
          instance.id = v4();
          instance.password = hashPassword( instance.password );
          instance.role = 'customer';
        },
        beforeUpdate( instance )
        {
          instance.password = hashPassword( instance.password );
        },
      },
      sequelize,
      modelName: 'User',
      paranoid: true,
      deletedAt: 'destroyTime'
    } );
  return User;
};