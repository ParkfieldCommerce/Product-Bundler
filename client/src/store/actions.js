import ShopifyService from '@/services/shopify-service';

const MAIN_PRODUCT_TYPE = 'Box';
const ADDON_PRODUCT_TYPE = 'Gift';
const CARD_PRODUCT_TYPE = 'Card';

export default {
  async getProducts(context) {
    const products = await ShopifyService.fetchAllProducts();
    let totalProductList = products.data;

    let mainProductList = totalProductList.filter(product =>{
      return (product.product_type == MAIN_PRODUCT_TYPE && (product.variants[0].inventory_policy > 0 || !product.inventory_policy));
    });

    let addonProductList = totalProductList.filter(product =>{
      return (product.product_type == ADDON_PRODUCT_TYPE && product.variants[0].inventory_quantity > 0);
    });

    let cardProductList = totalProductList.filter(product =>{
      return (product.product_type == CARD_PRODUCT_TYPE && product.variants[0].inventory_quantity > 0);
    });
    context.commit('setMainProducts', mainProductList);
    context.commit('setAddonProducts', addonProductList);
    context.commit('setCardProducts', cardProductList);
  },
};
