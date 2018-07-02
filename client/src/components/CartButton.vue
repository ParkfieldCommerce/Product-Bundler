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
      const { selectedMainProduct, selectedAddonProducts, selectedCardProduct } = this.$store.state;
      const cartQueue = [];
      const boxKey = (Math.floor(Math.random() * 1000) + 1).toString();

      function ajaxAdd(queue) {
        // Add Add to Cart Logic here
        console.log(queue);
      }
      if (selectedMainProduct.variants) {
        cartQueue.push({
          id: selectedMainProduct.variants[0].id,
          quantity: 1,
          properties: {
            BoxNum: boxKey,
          },
        });
      }
      if (selectedAddonProducts.length > 0) {
        selectedAddonProducts.forEach((addon) => {
          cartQueue.push({
            id: addon.variants[0].id,
            quantity: addon.quantity,
            properties: {
              BoxNum: boxKey,
            },
          });
        });
      }
      if (selectedCardProduct.variants) {
        cartQueue.push({
          id: selectedCardProduct.variants[0].id,
          quantity: 1,
          properties: {
            BoxNum: boxKey,
            Message: selectedCardProduct.message,
          },
        });
      }
      this.isAdding = true;
      ajaxAdd(cartQueue);
    },
  },
};
</script>
