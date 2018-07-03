const express = require('express');
const router = express.Router();
const Shopify = require('shopify-api-node');
const helpers = require('../helpers.js');

const SHOP_NAME = 'happy-box-product-builder-app-test.myshopify.com';
const SHOP_API_KEY = '3040feb3552de88cea2ac85cb0586e3f';
const SHOP_PASSWORD = 'cc89cb9f9cd7fa32554dd5f03f6fa5d0';

const shopify = new Shopify({
  shopName: process.env.SHOP_NAME || SHOP_NAME,
  apiKey: process.env.SHOP_API_KEY || SHOP_API_KEY,
  password: process.env.SHOP_PASSWORD || SHOP_PASSWORD
});

router.get('/fetchAllProducts', (req ,res) => {
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

router.post('/createBox', (req, res) => {
  const items = req.body;
  const metafields = helpers.getMetaFields(items);
  console.log(metafields);
  shopify.product.create({
    "title": "Your Box",
    "product_type": "Built Box",
    "metafields":[ 
      { key: 'id',
      value: '501264351283',
      value_type: 'string',
      namespace: 'main' },
    { key: 'title',
      value: 'Leaf Box',
      value_type: 'string',
      namespace: 'main' },
    { key: 'quantity',
      value: '1',
      value_type: 'string',
      namespace: 'main' },
    { key: 'type',
      value: 'Box',
      value_type: 'string',
      namespace: 'main' } ]
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err)=> {
    console.log(err);
  });
  res.send('hello');
});
module.exports = router;