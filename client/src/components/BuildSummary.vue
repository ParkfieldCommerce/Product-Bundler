<template>
  <div class="BuildSummary">
    <div class="BuildSummary__main-product">
      {{mainProduct.title}}-{{mainProduct | moneyFormat}}
    </div>
    <ul class="BuildSummary__addon-products">
      <li v-for="addon in addonProducts">
        {{addon.title}} - {{addon.quantity}}
        {{addon | moneyFormat}}
        <button @click="removeAddon(addon)">x</button>
      </li>
    </ul>
    <div class="BuildSummary__card-product">
      {{cardProduct.title}} - {{cardProduct | moneyFormat}}
      {{cardProduct.message}}
    </div>
    <div class="BuildSummary__total-price">{{totalBuildPrice}}</div>
  </div>
</template>

<script>
export default {
  computed:{
    mainProduct(){
      return this.$store.state.selectedMainProduct;
    },
    addonProducts(){
      return this.$store.state.selectedAddonProducts;
    },
    cardProduct(){
      return this.$store.state.selectedCardProduct;
    },
    totalBuildPrice(){
      return this.$store.getters.totalBuildPrice;
    }
  },
  methods:{
    removeAddon(product){
      this.$store.commit('removeSelectedAddonProduct', product);
    }
  }
};
</script>