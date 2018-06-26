<template>
  <v-card class="Product Product--addon" :class="isSelected ? 'Product--selected' : ''">
    <v-card-media class="Product__image" :src="product | getProductImage" height="200px"></v-card-media>
    <v-card-title class="Product__title">{{product.title}}</v-card-title>
    <v-card-actions>
      <v-btn class="Product__button" @click="selectProduct">{{buttonActionText}}</v-btn>
      <div class="Product__quantity">
        <v-btn flat class="Product__quantity-btn" @click="updateQuantity(true)">+</v-btn>
        <v-text-field readonly type="number" class="Product__quantity-value">{{quantity}}</v-text-field>
        <v-btn flat class="Product__quantity-btn" @click="updateQuantity(false)">-</v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      added: false,
      quantity: 1,
    };
  },
  props: {
    product: Object,
  },
  computed: {
    isSelected() {
      return this.$store.getters.isSelectedAddonProduct(this.product);
    },
    buttonActionText() {
      return this.added ? 'Added' : 'Add';
    },
  },
  methods: {
    selectProduct() {
      this.$store.commit('updateSelectedAddonProducts', { product: this.product, quantity: parseInt(this.quantity, 10) });
      this.added = true;
      setTimeout(() => {
        this.added = false;
      }, 1500);
    },
    updateQuantity(increment) {
      if (increment) {
        this.quantity += 1;
      }

      if (this.quantity - 1 > 0 && !increment) {
        this.quantity -= 1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .Product__quantity{
    display: flex;
    align-items: center;
  }
  .card__actions{
    justify-content: space-between;
  }
</style>
