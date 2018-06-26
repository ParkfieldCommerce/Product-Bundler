<template>
  <v-stepper-header>
    <v-stepper-step
      step="1"
      :complete="hasSelectedMain()"
    >
      Select Main Product
    </v-stepper-step>
    <v-divider></v-divider>

    <v-stepper-step
      step="2"
      :complete="hasSelectedAddons()"
    >
      Select Addon Products
    </v-stepper-step>
    <v-divider></v-divider>

    <v-stepper-step
      step="3"
      :complete="hasSelectedCard()"
    >
      Write Card
    </v-stepper-step>
  </v-stepper-header>
</template>

<script>
export default {
  props: {
    currentpage: Number,
  },
  methods: {
    hasSelectedMain() {
      if(this.$store.state.selectedMainProduct.id){
        return true;
      }
      return false;
    },
    hasSelectedAddons() {
      if(this.$store.state.selectedAddonProducts.length > 0){
        return true;
      }
      return false;
    },
    hasSelectedCard() {
      if(this.$store.state.selectedCardProduct.id){
        return true;
      }
      return false;
    }
  },
};
</script>
