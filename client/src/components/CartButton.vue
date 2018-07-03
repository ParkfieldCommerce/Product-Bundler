<template>
  <v-btn @click="addToCart">
    <v-icon>mdi-gift</v-icon>{{buttonActionText}}
  </v-btn>
</template>

<script>
import ShopifyService from '@/services/shopify-service';

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
      const boxItems = {
        price: this.$store.getters.totalBuildPrice,
      };

      async function createBox(items) {
        const createdBox = await ShopifyService.createBox(items);
        const createdBoxId = createdBox.data.id;
        console.log(createdBoxId);
      }

      if (this.$store.getters.hasSelectedMain) {
        boxItems.main = ({
          product_id: selectedMainProduct.id,
          title: selectedMainProduct.title,
          quantity: 1,
          type: selectedMainProduct.product_type,
        });
      }
      if (this.$store.getters.hasSelectedAddons) {
        boxItems.addons = [];
        selectedAddonProducts.forEach((addon) => {
          boxItems.addons.push({
            product_id: addon.id,
            title: addon.title,
            quantity: addon.quantity,
            type: addon.product_type,
          });
        });
      }
      if (this.$store.getters.hasSelectedCard) {
        boxItems.card = {
          product_id: selectedCardProduct.id,
          title: selectedCardProduct.title,
          quantity: 1,
          type: selectedCardProduct.product_type,
          message: selectedCardProduct.message,
        };
      }
      this.isAdding = true;
      createBox(boxItems);
    },
  },
};
</script>
