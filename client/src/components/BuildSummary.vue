<template>
  <div class="BuildSummary">
    <v-list>
      <v-list-tile class="BuildSummary__main-product">
        <v-list-tile-avatar>
        </v-list-tile-avatar>
        <v-list-tile-content>
          {{mainProduct.title}}-{{mainProduct | moneyFormat}}
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>mdi-gift</v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile class="BuildSummary__addon-product" v-for="addon in addonProducts" :key="addon.id">
        <v-list-tile-avatar>
        </v-list-tile-avatar>
        <v-list-tile-content>
        {{addon.title}} - {{addon.quantity}}
        {{addon | moneyFormat}}
        </v-list-tile-content>
        <v-list-tile-action>
          <button @click="removeAddon(addon)"><v-icon>mdi-close-circle</v-icon></button>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile class="BuildSummary__card-product">
        <v-list-tile-avatar>
        </v-list-tile-avatar>
        <v-list-tile-content>
          {{cardProduct.title}} - {{cardProduct | moneyFormat}}<br>
          Message: {{cardProduct.message}}
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>mdi-gift</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <div class="BuildSummary__total-price">{{totalBuildPrice}}</div>
  </div>
</template>

<script>
export default {
  computed: {
    mainProduct() {
      return this.$store.state.selectedMainProduct;
    },
    addonProducts() {
      return this.$store.state.selectedAddonProducts;
    },
    cardProduct() {
      return this.$store.state.selectedCardProduct;
    },
    totalBuildPrice() {
      return this.$store.getters.totalBuildPrice;
    },
  },
  methods: {
    removeAddon(product) {
      this.$store.commit('removeSelectedAddonProduct', product);
    },
  },
};
</script>
