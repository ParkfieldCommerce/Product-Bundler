const express = require('express');
const router = express.Router();
const Shopify = require('shopify-api-node');
const ShopifyFunctions = require('../scripts/shopify-functions.js');
const helpers = require('../scripts/helpers.js');

const SHOP_NAME = 'happy-box-product-builder-app-test.myshopify.com';
const SHOP_API_KEY = '3040feb3552de88cea2ac85cb0586e3f';
const SHOP_PASSWORD = 'cc89cb9f9cd7fa32554dd5f03f6fa5d0';
const BOXNAME = 'Your Box';

const shopify = new Shopify({
  shopName: process.env.SHOP_NAME || SHOP_NAME,
  apiKey: process.env.SHOP_API_KEY || SHOP_API_KEY,
  password: process.env.SHOP_PASSWORD || SHOP_PASSWORD
});

router.get('/fetchAllProducts', async (req ,res) => {
  let allProducts = await ShopifyFunctions.getAllProducts();
  res.json(allProducts);
});

router.post('/createBox', (req, res) => {
  const items = req.body;
  const metafields = helpers.getMetaFields(items);
  const boxDescription = helpers.getBoxDescription(items);
  async function enableSalesChannel(product){
    //must enable product on sales channel to checkout
    await shopify.productListing.create(product.id)
    .then((response) => {
      console.log('Product Successfully Enabled on App Sales Channel');
    })
    .catch((err) =>{
      console.log(err);
    });
  }

  shopify.product.create({
    title: BOXNAME,
    product_type: "Built Box",
    metafields,
    variants:[{
      "price":items.price
    }]
  })
  .then(async (response) => {
    response.boxDescription = boxDescription;
    await enableSalesChannel(response);
    res.send(response);
  })
  .catch((err)=> {
    console.log(err);
  });
});

router.post('/order-created', (req, res) => {
  async function getMetafields(productId){
    let metafields = [];
    await shopify.metafield.list({
      metafield:{
        owner_resource:'product',
        owner_id: productId
      }
    })
    .then((res) => {
      metafields = res;
    })
    .catch((err) => {
      console.log(err);
    });
    return metafields;
  }
  async function updateProductQuantity(inventoryList){
    let locations = await shopify.location.list();
    let locationId = locations[0].id;
    inventoryList.forEach( item => {
      shopify.inventoryLevel.adjust({
        location_id: locationId,
        inventory_item_id: item.id, 
        available_adjustment: item.quantity*-1
      })
      .then( success => {
        console.log(success);
      })
      .catch( err => {
        console.log(err);
      });
    });
  }
  function deleteBoxProduct(productId){
    shopify.product.delete(productId)
      .catch(err => {
        console.log(err);
      });
  }
  function getProductsToUpdate(metafields){
    const productIds = metafields
    .filter(metafield => metafield.key === 'inventory_id')
    .map( metafield => parseInt(metafield.value));
    const productQuantities = metafields
      .filter(metafield => metafield.key === 'quantity')
      .map( metafield => parseInt(metafield.value));
    let productsToUpdate = [];
    productIds.forEach((id, index)=>{
      let inventoryItem = {
        id,
        quantity: productQuantities[index]
      };
      productsToUpdate.push(inventoryItem);
    });
    return productsToUpdate;
  }
  console.log('====== ORDER CREATED ======');
  const orderItems = req.body.line_items;
  orderItems.forEach(async (orderItem) => {
    if(orderItem.title === BOXNAME){
      const metafields = await getMetafields(orderItem.product_id);
      const updateInventoryList = getProductsToUpdate(metafields);
      updateProductQuantity(updateInventoryList);
      deleteBoxProduct(orderItem.product_id);
    }
  });
  res.end();
})

module.exports = router;