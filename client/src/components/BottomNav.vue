<template>
  <v-bottom-nav fixed value="true" color="white">
    <v-btn flat color="red">
      <span>My Current Box</span>
      <v-icon dark>mdi-package-variant</v-icon>
    </v-btn>
    <v-btn v-show="enableBack()" @click="handleBackClick()" flat color="red">
      <span>Back</span>
      <v-icon dark>arrow_back</v-icon>
    </v-btn>
    <v-btn v-show="enableNext()" @click="handleNextClick()" flat color="red">
      <span>Next</span>
      <v-icon dark>arrow_forward</v-icon>
    </v-btn>
    <CartButton></CartButton>
  </v-bottom-nav>
</template>

<script>
import CartButton from '@/components/CartButton.vue';

export default {
  name: 'BottomNav',
  props: {
    currentpage: Number,
  },
  components: {
    CartButton,
  },
  computed: {
  },
  methods: {
    enableNext() {
      if (this.currentpage === 1 && this.$store.getters.hasSelectedMain) {
        return true;
      }
      if (this.currentpage === 2 && this.$store.getters.hasSelectedAddons) {
        return true;
      }
      return false;
    },
    enableBack() {
      if (this.currentpage > 1 && this.currentpage <= 3) {
        return true;
      }
      return false;
    },
    handleBackClick() {
      if (this.currentpage !== 1) {
        this.changePage(this.currentpage - 1);
      }
    },
    handleNextClick() {
      if (this.currentpage === 1 && this.$store.getters.hasSelectedMain) {
        this.changePage(this.currentpage + 1);
      }
      if (this.currentpage === 2 && this.$store.getters.hasSelectedAddons) {
        this.changePage(this.currentpage + 1);
      }
    },
    changePage(page) {
      this.$emit('changePage', page);
    },
    hasSelectedMain() {
      if (this.$store.state.selectedMainProduct.id) {
        return true;
      }
      return false;
    },
    hasSelectedAddons() {
      if (this.$store.state.selectedAddonProducts.length > 0) {
        return true;
      }
      return false;
    },
    hasSelectedCard() {
      if (this.$store.state.selectedCardProduct.id) {
        return true;
      }
      return false;
    },
  },
};
</script>
