import ShopifyService from '@/services/shopify-service';

export default {
  async getProducts(context) {
    const products = await ShopifyService.fetchAllProducts();
    context.commit('setProducts', products.data);
  },
};
