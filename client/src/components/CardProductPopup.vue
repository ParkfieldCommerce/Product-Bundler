<template>
  <v-dialog :value="popupState" class="Product__card-popup" width="500" persistent>
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
    popupState: Boolean,
  },
  data() {
    return {
      message: '',
      isBlank: false,
    };
  },
  methods: {
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
      this.$emit('close-popup', true);
    },
  },
};
</script>
