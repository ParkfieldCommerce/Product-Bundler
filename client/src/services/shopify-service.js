import Api from '@/services/api';

export default {
  async fetchAllProducts() {
    return Api().get('/shopify/fetchAllProducts');
  },
};
