const { DataTypes } = require('sequelize');
const sequelize = require('../database/database.js');

const Users = sequelize.define('Users', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,  // Desativa os campos createdAt e updatedAt
});

module.exports = Users;
