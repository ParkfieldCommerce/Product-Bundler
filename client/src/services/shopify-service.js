import Api from '@/services/api';

export default {
  fetchAllProducts() {
    return Api().post('/fetchAllProducts');
  },
};

