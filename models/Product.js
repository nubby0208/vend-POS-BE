const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'product',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    brand: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    tags: {
      type: Sequelize.STRING
    },
    product_type: {
      type: Sequelize.STRING
    },
    isSell: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0
    },
    inventory_type: {
      type: Sequelize.ENUM("standard", "variant", "composite"),
      defaultValue: "standard",
    },
    sku_code: {
      type: Sequelize.STRING
    },
    supplier: {
      type: Sequelize.STRING
    },
    inventory_level: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0
    },
    current_invenotry: {
      type: Sequelize.STRING
    },
    re_order_point: {
      type: Sequelize.STRING
    },
    re_order_quantity: {
      type: Sequelize.STRING
    },
    relationShip: {
      type: Sequelize.STRING
    },
    relationShip_1: {
      type: Sequelize.STRING
    },
    tax: {
      type: Sequelize.STRING
    },
    supply_price: {
      type: Sequelize.STRING
    },
    markup: {
      type: Sequelize.STRING
    },
    retail_price: {
      type: Sequelize.STRING
    },
    variant: {
      type: Sequelize.STRING
    },
    compositeCustomSKU: {
      type: Sequelize.STRING
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1
    },
    create_at: { 
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    }
  },
  {
    timestamps: false
  }
)