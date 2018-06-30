<template>
  <v-card class="Product Product--main" :dark="isSelected">
    <v-card-media
      class="Product__image"
      :src="product | getProductImage"
      height="200px">
    </v-card-media>
    <v-card-title class="Product__title">{{product.title}}</v-card-title>
    <v-card-actions>
      <v-btn class="Product__button" @click="selectProduct">{{buttonActionText}}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    product: Object,
  },
  computed: {
    buttonActionText() {
      return this.$store.getters.isSelectedMainProduct(this.product) ? 'Remove' : 'Select Bag';
    },
    isSelected() {
      return this.$store.getters.isSelectedMainProduct(this.product);
    },
  },
  methods: {
    selectProduct() {
      if (this.$store.state.selectedMainProduct.id === this.product.id) {
        this.$store.commit('updateSelectedMainProduct', {});
      } else {
        this.$store.commit('updateSelectedMainProduct', this.product);
      }
    },
  },
};
</script>
