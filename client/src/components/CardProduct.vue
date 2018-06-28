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
    <v-dialog v-model="popupIsActive" class="Product__card-popup" width="500">
      <v-card class="Product__card-popup__content">
        <v-card-media
          class="Product__card-popup__image"
          :src="product | getProductImage"
          height="200">
        </v-card-media>
        <v-card-title class="Product__card-popup__heading">Write your card</v-card-title>
        <p class="Product__card-popup__body"></p>
        <v-card-actions class="Product__card-popup__actions">
          <v-textarea
            outline
            v-if="!isBlank"
            v-model="message"
            name="message"
            cols="30"
            rows="3">
          </v-textarea>
          <label for="BlankCard"></label>
          <v-checkbox
            :label="`Click here if you want your card blank`"
            name="BlankCard"
            v-model="isBlank"
            @change="clearMessage">
          </v-checkbox>
          <v-btn @click="updateMessage">All Set</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<style lang="scss" scoped>
  .Product__card-popup__actions{
    flex-flow: row wrap;
  }
</style>

<script>
export default {
  props: {
    product: Object,
  },
  data() {
    return {
      popupIsActive: false,
      message: '',
      isBlank: false,
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
    clearMessage() {
      if (this.isBlank) {
        this.message = '';
      }
    },
    updateMessage() {
      this.$store.commit('updateSelectedCardMessage', this.message);
      this.closePopup();
    },
    closePopup() {
      this.popupIsActive = false;
    },
  },
};
</script>
