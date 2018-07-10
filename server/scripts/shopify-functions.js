const Shopify = require('shopify-api-node');

const SHOP_NAME = 'happy-box-product-builder-app-test.myshopify.com';
const SHOP_API_KEY = '3040feb3552de88cea2ac85cb0586e3f';
const SHOP_PASSWORD = 'cc89cb9f9cd7fa32554dd5f03f6fa5d0';
const BOXNAME = 'Your Box';

const shopify = new Shopify({
  shopName: process.env.SHOP_NAME || SHOP_NAME,
  apiKey: process.env.SHOP_API_KEY || SHOP_API_KEY,
  password: process.env.SHOP_PASSWORD || SHOP_PASSWORD
});

async function getAllProducts(){
  //Returns all the products in the store to send to client server
  let numOfProducts = await getNumOfProducts();
  let productsList = await fetchProducts(Math.ceil(numOfProducts/250));
  return productsList;
}
function getNumOfProducts(){
  //Gets the number of products in the store
  return shopify.product.count();
}
async function fetchProducts(page, productList = []){
  //Returns all the product objects in the store
  if(page != 0){
    let products = await getPageOfProducts(page);
    let updatedProductList = [...productList, ...products];
    return await fetchProducts(page - 1, updatedProductList);
  }else{
    return productList;
  }
}
async function getPageOfProducts(page){
  //Gets the total number of pages with 250 products
  let products = await shopify.product.list({ limit:250, page });
  return products;
}

module.exports.getAllProducts = getAllProducts;