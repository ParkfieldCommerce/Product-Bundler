<template>
  <v-app>
    <v-content>
      <v-container>
        <div id="app">
          <MainNavigation/>
          <router-view/>
        </div>
      </v-container>
    </v-content>
    <div class="BuildABox">
      <div class="BuildABox__main">
        <PageBar @changepage="changePage($event)" :currentpage="currentPage"></PageBar>
        <div v-if="currentPage == 1" class="BuildABox__page BuildABox__page--mainProducts">
          <ul class="BuildABox__main-products">
            <li v-for="product in mainProducts" :key="product.id">
              <MainProduct :product="product"></MainProduct>
            </li>
          </ul>
        </div>
        <div v-if="currentPage == 2" class="BuildABox__page BuildABox__page--addonProducts">
          <ProductFilter :options="addonFilterOptions('Occasion')" category="Occasion"></ProductFilter>
          <ProductFilter :options="addonFilterOptions('Type')" category="Type"></ProductFilter>
          <ul class="BuildABox__addon-products">
            <li v-for="product in addonProducts" :key="product.id">
              <AddonProduct :product="product"></AddonProduct>
            </li>
          </ul>
        </div>
        <div v-if="currentPage == 3" class="BuildABox__page BuildABox__page--cardProducts">
          <ProductFilter :options="cardFilterOptions('Occasion')" category="Occasion"></ProductFilter>
          <ul class="BuildABox__card-products">
            <li v-for="product in cardProducts" :key="product.id">
              <CardProduct :product="product"></CardProduct>
            </li>
          </ul>
        </div>
      </div>
      <div class="BuildABox__sidebar">
        <BuildSummary></BuildSummary>
        <CartButton></CartButton>
      </div>
    </div>
  </v-app>
</template>


<script>
import MainNavigation from '@/components/MainNavigation.vue';
import AddonProduct from '@/components/AddonProduct.vue'
import BuildSummary from '@/components/BuildSummary.vue'
import CardProduct from '@/components/CardProduct.vue'
import MainProduct from '@/components/MainProduct.vue'
import PageBar from '@/components/PageBar.vue'
import ProductFilter from '@/components/ProductFilter.vue'
import CartButton from '@/components/CartButton.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    MainNavigation,
    AddonProduct,
    BuildSummary,
    CardProduct,
    MainProduct,
    PageBar,
    ProductFilter,
    CartButton,
  },
  data () {
    return {
      currentPage:1
    }
  },
  computed:{
    mainProducts(){
      return this.$store.state.mainProducts;
    },
    ...mapGetters([
      'addonProducts',
      'cardProducts'
    ])
  },
  methods:{
    changePage(page){
      this.currentPage = page;
    },
    addonFilterOptions(category){
      let addonProducts = this.$store.state.addonProducts;
      let tags = [];
      for(let i = 0; i < addonProducts.length; i++){
        let productTags = addonProducts[i].tags.split(',');
        let tagsToAdd = productTags.filter( tag => {
          if(tag.indexOf(`${category}_`) > -1){
            return tags.indexOf(tag) == -1;
          }
        });
        tags = [...tags, ...tagsToAdd];
      }
      return tags;
    },
    cardFilterOptions(category){
      let cardProducts = this.$store.state.cardProducts;
      let tags = [];
      for(let i = 0; i < cardProducts.length; i++){
        let cardTags = cardProducts[i].tags.split(',');
        let tagsToAdd = cardTags.filter( tag => {
          if(tag.indexOf(`${category}_`) > -1){
            return tags.indexOf(tag) == -1;
          }
        });
        tags = [...tags, ...tagsToAdd];
      }
      return tags;
    }
  }
};
</script>
