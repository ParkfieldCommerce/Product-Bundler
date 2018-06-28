<template>
  <v-btn @click="addToCart">
    <v-icon>mdi-gift</v-icon>{{buttonActionText}}
  </v-btn>
</template>

<script>
// import axios from 'axios';

export default {
  data() {
    return {
      isAdding: false,
    };
  },
  computed: {
    buttonActionText() {
      return this.isAdding ? 'Building...' : 'Create My Box';
    },
  },
  methods: {
    addToCart() {
      const mainProduct = this.$store.state.selectedMainProduct;
      const addonProducts = this.$store.state.selectedAddonProducts;
      const cardProduct = this.$store.state.selectedCardProduct;
      const cartQueue = [];
      const boxKey = (Math.floor(Math.random() * 1000) + 1).toString();

      function ajaxAdd(queue) {
        // Add Add to Cart Logic here
        console.log(queue);
      }
      if (mainProduct.variants) {
        cartQueue.push({
          id: mainProduct.variants[0].id,
          quantity: 1,
          properties: {
            BoxNum: boxKey,
          },
        });
      }
      if (addonProducts.length > 0) {
        addonProducts.forEach((addon) => {
          cartQueue.push({
            id: addon.variants[0].id,
            quantity: addon.quantity,
            properties: {
              BoxNum: boxKey,
            },
          });
        });
      }
      if (cardProduct.variants) {
        cartQueue.push({
          id: cardProduct.variants[0].id,
          quantity: 1,
          properties: {
            BoxNum: boxKey,
            Message: cardProduct.message,
          },
        });
      }
      this.isAdding = true;
      ajaxAdd(cartQueue);
    },
  },
};
</script>
