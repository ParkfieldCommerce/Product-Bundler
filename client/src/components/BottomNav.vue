<template>
  <v-bottom-nav value="true" absolute color="white">
    <v-btn @click="changePage(1)">1</v-btn>
    <v-btn @click="changePage(2)">2</v-btn>
    <v-btn @click="changePage(3)">3</v-btn>
    <CartButton></CartButton>
  </v-bottom-nav>
</template>

<script>
import CartButton from '@/components/CartButton.vue';

export default {
  name: 'BottomNav',
  components: {
    CartButton
  },
  methods: {
    changePage(page) {
      this.$emit('changePage', page);
    }
  },
};
</script>
