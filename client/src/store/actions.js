import ShopifyService from '@/services/shopify-service';

export default {
  getProducts() {
    ShopifyService.fetchAllProducts();
  },
};

