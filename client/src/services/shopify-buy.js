import BuyClient from 'shopify-buy';

const client = BuyClient.buildClient({
  domain: 'happy-box-product-builder-app-test.myshopify.com',
  storefrontAccessToken: '3cce23d206dce4320a1c55bafba32651',
});

export default async function ShopifyCheckout(box) {
  const boxVariantId = btoa(box.data.variants[0].admin_graphql_api_id);
  const { boxDescription } = box.data;
  const checkoutId = await client.checkout.create().then(checkout => checkout.id);
  const checkoutLineItems = [{ variantId: boxVariantId, quantity: 1, customAttributes: boxDescription }];

  const status = await client.checkout.addLineItems(checkoutId, checkoutLineItems).then((checkout) => {
    window.open(checkout.webUrl, '_blank');
    return true;
  }).catch((err) => {
    console.log(err);
    return false;
  });

  return status;
}
