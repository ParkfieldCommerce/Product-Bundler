import BuyClient from 'shopify-buy';

const client = BuyClient.buildClient({
  domain: 'happy-box-product-builder-app-test.myshopify.com',
  storefrontAccessToken: '3cce23d206dce4320a1c55bafba32651',
});

export async function ShopifyCheckout(box) {
  console.log(box);
  const boxId = btoa(box.data.variants[0].admin_graphql_api_id);
  // const { boxDescription } = box.data;
  const checkoutId = await client.checkout.create().then(checkout => checkout.id);
  const checkoutLineItems = [{ variantId: boxId, quantity: 1 }];

  client.checkout.addLineItems(checkoutId, checkoutLineItems).then((checkout) => {
    console.log(checkout.id);
    console.log('why wont u adddddd');
    console.log(checkout.lineItems);
    console.log(checkout.webUrl);
  }).catch((err) => {
    console.log(err);
  });
}
