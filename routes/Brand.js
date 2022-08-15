const express = require('express')
const brand = express.Router()
const cors = require('cors')
const Brand = require('../models/Brand')
brand.use(cors())

brand.post('/', async (req, res) => {
  const allData = await Brand.findAll()
  res.send({'data': allData})
})

brand.post('/addBrand', (req, res) => {
    console.log(req.body.name, req.body.description)
    const brandData = {
      name: req.body.name,
      description: req.body.description
    }

    Brand.create(brandData)
      .then(brand => {
        var response = {
          'msg': 'Successful add New brand!'
        }
        res.send(response)
      })
      .catch(err => {
        var response = {
          'msg': err
        }
        res.send(response)
      })
})

module.exports = brand;