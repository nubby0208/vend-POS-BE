const express = require('express')
const newProduct = express.Router()
const cors = require('cors')
const path = require('path');
const crypto = require('crypto');
const fs = require('fs')
const GenrateSku = require('../models/GenerateSku')
const Supplier = require('../models/Supplier')
const Variant = require('../models/Variant')
const Product = require('../models/Product')
const ProductImage = require('../models/ProductImage')
newProduct.use(cors())
newProduct.post('/imageUpload', async (req, res) => {
  var uploadedImages = Array.isArray(req.files.file) ? req.files.file : [req.files.file];
  var imageLength = uploadedImages.length - 1
  uploadedImages.forEach(function (file, index) {
    let new_name = file.md5 + path.extname(file.name)
    let new_path = 'uploads/' + new_name
    file.mv(new_path, (err) => {
      if(imageLength == index) {
        var response = {
          'images': new_path,
          'msg': 'Successful images uploaded !'
        }
        res.send(response)
      }
    })
  })
})

newProduct.post('/imageRemove', async (req, res) => {
  let file = req.files.file
  let new_name = file.md5 + path.extname(file.name)
  let new_path = 'uploads/' + new_name
  fs.unlink(new_path, (err) => {
    if (err) {
      console.error(err)
      return
    }
    var response = {
      'msg': 'Successful images removed !',
      'name': new_path
    }
    res.send(response)
  })
})

newProduct.post('/generateSKU', async (req, res) => {
  var currentdate = new Date();
  var datetime = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-"
                + currentdate.getDate() + " "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
  const sql = {
    create_at: datetime
  }
  GenrateSku.create(sql)
            .then(tbl => {
              var response = {
                'code': tbl.dataValues.skuCode
              }
              res.send(response)
            })
})

newProduct.post('/addSupplier', async (req, res) => {
  const supplierData = {
    name: req.body.name,
    description: req.body.description
  }

  Supplier.create(supplierData)
    .then(brand => {
      var response = {
        'msg': 'Successful add New supplier!'
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

newProduct.post('/getSupplier', async (req, res) => {
  const allSupplier = await Supplier.findAll()
  res.send({'data': allSupplier})
})

newProduct.post('/addVariant', async (req, res) => {

  const variantData = {
    name: req.body.name
  }

  Variant.create(variantData)
    .then(variant => {
      var response = {
        'msg': 'Successful add New variant !'
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

newProduct.post('/addProduct', async (req, res) => {

  const ProductData = {
    name: req.body.name,
    brand: req.body.brand,
    description: req.body.description,
    tags: JSON.stringify(req.body.tags),
    product_type: req.body.productType,
    isSell: req.body.isSell,
    inventory_type: req.body.inventory_type,
    sku_code: JSON.stringify(req.body.sku_code),
    supplier: JSON.stringify(req.body.supplierInformation),
    inventory_level: req.body.inventoryLevel,
    current_invenotry : req.body.currentInventory,
    re_order_point: req.body.re_order_point,
    re_order_quantity: req.body.re_order_quantity,
    relationShip: req.body.newRelationShip,
    relationShip_1: req.body.newRelationShip_1,
    tax: req.body.tax,
    supply_price: '',
    markup: req.body.markupPrice,
    retail_price: req.body.retailPrice,
    variant: JSON.stringify(req.body.variant),
    compositeCustomSKU: req.body.compositeCustomSKU,
  }

  Product.create(ProductData)
    .then(Product => {
      if(req.body.img.length != 0) {
        req.body.img.map((item, index) => {
          var data = { product_id: Product.dataValues.id, url: item}
          ProductImage.create(data)
          .then(ProductImage => {
            if(req.body.img.length == index + 1) {
              var response = {
                'msg': 'Successful add New Product !'
              }
              res.send(response)
            }

          })
        })
      } else {
        var response = {
          'msg': 'Successful add New Product !'
        }
        res.send(response)
      }


    })
    .catch(err => {
      var response = {
        'msg': err
      }
      res.send(response)
    })
})

newProduct.post('/getVariant', async (req, res) => {
  const allVariant = await Variant.findAll()
  res.send({'data': allVariant})
})

newProduct.post('/getProduct', async (req, res) => {
  const allProduct = await Product.findAll()
  const allImages = await ProductImage.findAll()
  res.send({ 'data': allProduct, 'images': allImages })
})
module.exports = newProduct;
