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
      return this.$store.getters.hasSelectedMain;
    },
    hasSelectedAddons() {
      return this.$store.getters.hasSelectedAddons;
    },
    hasSelectedCard() {
      return this.$store.getters.hasSelectedCard;
    },
  },
};
</script>
