const express = require('express');
const router = express.Router();
const Shopify = require('shopify-api-node');

const SHOP_NAME = 'rejuvenation-therapeutics-corp.myshopify.com';
const SHOP_API_KEY = 'ee327c1849304f3eb816191b25534a6d';
const SHOP_PASSWORD = 'e38a764db26c65d19c4d75af771acc50';

const shopify = new Shopify({
  shopName: process.env.SHOP_NAME || SHOP_NAME,
  apiKey: process.env.SHOP_API_KEY || SHOP_API_KEY,
  password: process.env.SHOP_PASSWORD || SHOP_PASSWORD
});

router.get('/fetchAllProducts', (req ,res) =>{

  function fetchProducts(page, productList = []){
    //Recursive function that gets the full list of products
    if(page != 0){
      shopify.product.list({
        limit:250,
        page
      }).then(products => {
        let updatedProductList = [...productList, ...products];
        fetchProducts(page - 1, updatedProductList);
      })
      .catch(err => {
        console.log(err);
      });
    }else{
      res.json(productList);
    }
  }
  shopify.product.count()
    .then( count => {
      fetchProducts(Math.ceil(count/250));
    })
    .catch(err =>{
      console.log(err);
    });
});

module.exports = router;