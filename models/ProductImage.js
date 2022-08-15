const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'productimage',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: Sequelize.STRING
    },
    url: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
)