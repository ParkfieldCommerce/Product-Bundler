import Api from '@/services/api';

export default {
  async fetchAllProducts() {
    return Api().get('/shopify/fetchAllProducts');
  },
  async createBox(data) {
    return Api().post('/shopify/createBox', data)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
