import Api from '@/services/api';

export default {
  fetchAllProducts() {
    let test = async () => {
      return await Api().get('/shopify/fetchAllProducts');
    };
    console.log(test());
    return Api().get('/shopify/fetchAllProducts')
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

