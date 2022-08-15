var express = require('express')
const fileupload = require("express-fileupload");
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var port = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(cors())
app.use(fileupload());
app.use('/uploads', express.static('uploads'));
app.use( 
  bodyParser.urlencoded({
    extended: true
  })
)

var Users = require('./routes/Users')
var Brand = require('./routes/Brand')
var Product = require('./routes/Product')
var ProductType = require('./routes/ProductType')

app.use('/users', Users)
app.use('/brand', Brand)
app.use('/product', Product)
app.use('/productType', ProductType)

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})