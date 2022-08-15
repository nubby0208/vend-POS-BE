const Sequelize = require('sequelize')
const db = {}
// const DBname = 'vend'
// const DBuser = 'vend'
// const DBpassword = '@cC146fz5'

const DBname = 'login_react'
const DBuser = 'root'
const DBpassword = ''

const sequelize = new Sequelize(DBname, DBuser, DBpassword, {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

db.sequelize = sequelize

module.exports = db
