<template>
  <v-card class="Product Product--card" :dark="isSelected">
    <v-card-media
      class="Product__image"
      :src="product | getProductImage"
      height="200">
    </v-card-media>
    <v-card-title class="Product__title">{{product.title}}</v-card-title>
    <v-card-actions>
      <v-btn class="Product__button" @click="selectProduct">{{buttonActionText}}</v-btn>
    </v-card-actions>
    <CardProductPopup
      :product="product"
      :popup-state="popupIsActive"
      @close-popup="closePopup"
    >
    </CardProductPopup>
  </v-card>
</template>

<script>
import CardProductPopup from './CardProductPopup.vue';

export default {
  props: {
    product: Object,
  },
  components: {
    CardProductPopup,
  },
  data() {
    return {
      popupIsActive: false,
    };
  },
  computed: {
    buttonActionText() {
      return this.$store.getters.isSelectedCardProduct(this.product) ? 'Edit' : 'Select Card';
    },
    isSelected() {
      return this.$store.getters.isSelectedCardProduct(this.product);
    },
  },
  methods: {
    selectProduct() {
      this.popupIsActive = true;
      this.$store.commit('updateSelectedCardProduct', this.product);
    },
    closePopup() {
      this.popupIsActive = false;
    },
  },
};
</script>
