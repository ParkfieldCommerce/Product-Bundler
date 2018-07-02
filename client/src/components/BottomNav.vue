<template>
  <v-bottom-nav fixed value="true" color="white">
    <v-btn flat color="red" @click="showBuildSummary()">
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
    <CartButton v-show="enableCreate()"></CartButton>
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
    showBuildSummary() {
      this.$emit('show-summary', true);
    },
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
    enableCreate() {
      const { getters } = this.$store;
      if (getters.hasSelectedMain && getters.hasSelectedAddons && getters.hasSelectedCard) {
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
  },
};
</script>
