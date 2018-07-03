import BuyClient from 'shopify-buy';

const client = BuyClient.buildClient({
  domain: 'happy-box-product-builder-app-test.myshopify.com',
  storefrontAccessToken: '3cce23d206dce4320a1c55bafba32651'
});

export default client;