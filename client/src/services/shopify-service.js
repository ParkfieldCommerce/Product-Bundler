import Api from '@/services/api';

export default {
  async fetchAllProducts() {
    const test = await Api().get('/shopify/fetchAllProducts');
    return test;
  },
};
