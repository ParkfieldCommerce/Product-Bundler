import ShopifyService from '@/services/shopify-service';

export default {
  getProducts(context) {
    let products = ShopifyService.fetchAllProducts();
    console.log(products.data);
    //context.commit('setProducts', products.data);
  },
};



