const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'generatesku',
  {
    skuCode: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    create_at: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
)