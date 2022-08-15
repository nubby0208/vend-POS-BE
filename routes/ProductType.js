const express = require('express')
const productType = express.Router()
const cors = require('cors')
const ProductType = require('../models/ProductType')
productType.use(cors())

productType.post('/', async (req, res) => {
  const allData = await ProductType.findAll()
  res.send({'data': allData})
})

productType.post('/addProductType', (req, res) => {
    const productTypeData = {
      type: req.body.type,
    }

    ProductType.create(productTypeData)
      .then(brand => {
        var response = {
          'msg': 'Successful add New Product Type!'
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

module.exports = productType;