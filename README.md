# node-mongodb
This is sample server code using node.js and MongoDB

## prerequisite

### mongodb-win32-x86_64-2012plus-4.2.5-signed.msi
Download from https://dl.mongodb.org/dl/win32/x86_64 and install MongoDB and configure on your local and just start this service

### nosqlbooster4mongo-5.2.10.exe
Download from https://www.nosqlbooster.com and install GUI tool to run view database and collections

### Postman-win64-7.22.1-Setup.exe
Download from https://www.postman.com/downloads/ and install postman to test all end points 


## Data base used in this project
### DB name: mydb, table name: products, all CRUD operations are performed in node.js

### A typical top-level directory layout

 node-mongoDB
    ├── controllers                   # Business logic
    ├── models                        # Model 
    ├── routes                        # contain routes for all end points
    ├── app.js                        # Server configurations code
    ├── package.json                  # All dependencies
    ├── package-lock.json
    └── README.md
    
## Dependencies
Run following command to install dependencies
```bash
npm install --save express body-parser mongoose
```
    
## app.js
```python
const express = require('express');
const bodyParser = require('body-parser');

const product = require('./routes/product.route'); // Imports routes for the products
const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://localhost:27017/mydb'; // local database
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
/**All routes related to prduct */
app.use('/products', product);

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
```

## product.model.js
```python
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**Product attributes */
let ProductSchema = new Schema({
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
});

// Export the model
module.exports = mongoose.model('Product', ProductSchema);
```
## product.controller.js
It contains only create method
```python
const Product = require('../models/product.model');

/**Create product using save function of mongodb */
exports.product_create = function (req, res) {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};

```
## product.route.js
```python
const express = require('express');
const router = express.Router();

/**Product controller!!**/
const product_controller = require('../controllers/product.controller');

/** * End points for CRUD operations**/

router.post('/create', product_controller.product_create); // Create produc

module.exports = router;
```
## Test end points
Test all end points using postman

