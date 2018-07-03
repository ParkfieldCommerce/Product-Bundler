import ShopifyService from '@/services/shopify-service';

const MAIN_PRODUCT_TYPE = 'Box';
const ADDON_PRODUCT_TYPE = 'Gift';
const CARD_PRODUCT_TYPE = 'Card';

export default {
  async getProducts(context) {
    const products = await ShopifyService.fetchAllProducts();
    const totalProductList = products.data;

    const mainProductList = totalProductList.filter((product) => {
      const productAvailable = product.variants[0].inventory_policy > 0 || !product.inventory_policy;
      return product.product_type === MAIN_PRODUCT_TYPE && productAvailable;
    });

    const addonProductList = totalProductList.filter((product) => {
      const productAvailable = product.variants[0].inventory_quantity > 0;
      return product.product_type === ADDON_PRODUCT_TYPE && productAvailable;
    });

    const cardProductList = totalProductList.filter((product) => {
      const productAvailable = product.variants[0].inventory_quantity > 0;
      return product.product_type === CARD_PRODUCT_TYPE && productAvailable;
    });
    context.commit('setMainProducts', mainProductList);
    context.commit('setAddonProducts', addonProductList);
    context.commit('setCardProducts', cardProductList);
  },
};
