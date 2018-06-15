import Api from '@/services/api';

export default {
  fetchAllProducts() {
    return Api().get('/shopify/fetchAllProducts')
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

