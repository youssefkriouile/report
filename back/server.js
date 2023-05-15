const express = require("express");
const app = express();
const products = require('./data/products.js');


app.use(express.json()); 

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});