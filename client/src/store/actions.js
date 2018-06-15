import ShopifyService from '@/services/shopify-service';

export default {
  getListOfProducts() {
    ShopifyService.fetchAllProducts();
  },
};

