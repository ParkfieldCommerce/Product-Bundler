<template>
  <div class="BuildABox">
    <div class="BuildABox__main">
      <v-stepper non-linear v-model.number="currentPage">
        <PageBar @changepage="changePage($event)" :currentpage="currentPage"></PageBar>
        <v-stepper-items>
          <v-stepper-content step="1" class="BuildABox__page BuildABox__page--mainProducts">
            <v-layout wrap row class="BuildABox__main-products">
              <v-flex mb-4 ml-2 mr-2 xs12 md4  v-for="product in mainProducts" :key="product.id">
                <MainProduct :product="product"></MainProduct>
              </v-flex>
            </v-layout>
          </v-stepper-content>
          <v-stepper-content step="2" class="BuildABox__page BuildABox__page--addonProducts">
            <v-layout wrap row>
              <v-flex mb-6 pl-1 pr-1>
                <ProductFilter
                  :options="addonFilterOptions('Occasion')"
                  category="Occasion">
                </ProductFilter>
              </v-flex>
              <v-flex mb-6 pl-1 pr-1>
                <ProductFilter
                  :options="addonFilterOptions('Type')"
                  category="Type">
                </ProductFilter>
              </v-flex>
            </v-layout>
            <v-layout wrap class="BuildABox__addon-products">
              <v-flex mb-4 pr-2 pl-2 xs12 md4  v-for="product in addonProducts" :key="product.id">
                <AddonProduct :product="product"></AddonProduct>
              </v-flex>
            </v-layout>
          </v-stepper-content>
          <v-stepper-content step="3" class="BuildABox__page BuildABox__page--cardProducts">
            <ProductFilter
              :options="cardFilterOptions('Occasion')"
              category="Occasion">
            </ProductFilter>
            <v-layout wrap class="BuildABox__card-products">
              <v-flex mb-4 pr-2 pl-2 xs12 md4 v-for="product in cardProducts" :key="product.id">
                <CardProduct :product="product"></CardProduct>
              </v-flex>
            </v-layout>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
    <BottomNav
      @changePage="changePage"
      :currentpage="currentPage"
      @show-summary="showSummary">
    </BottomNav>
    <div class="BuildABox__sidebar">
      <BuildSummary
        :show-summary="showBuildSummary"
        @show-summary="showSummary">
      </BuildSummary>
    </div>
  </div>
</template>

<script>
import AddonProduct from '@/components/AddonProduct.vue';
import BuildSummary from '@/components/BuildSummary.vue';
import CardProduct from '@/components/CardProduct.vue';
import MainProduct from '@/components/MainProduct.vue';
import PageBar from '@/components/PageBar.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import BottomNav from '@/components/BottomNav.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'home',
  components: {
    AddonProduct,
    BuildSummary,
    CardProduct,
    MainProduct,
    PageBar,
    ProductFilter,
    BottomNav,
  },
  data() {
    return {
      currentPage: 1,
      showBuildSummary: false,
    };
  },
  computed: {
    mainProducts() {
      return this.$store.state.mainProducts;
    },
    ...mapGetters([
      'addonProducts',
      'cardProducts',
    ]),
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    filterTagsToAdd(currentTags, tags, category) {
      // Finds unique tags in the product not in the current list of tags
      return tags.filter((tag) => {
        if (tag.indexOf(`${category}_`) > -1) {
          return currentTags.indexOf(tag) === -1;
        }
        return false;
      });
    },
    createOptions(category, products) {
      // Creates an array of option objects(text-value) for the v-select component
      let tags = [];
      tags.push(`${category}_all`);
      for (let i = 0; i < products.length; i++) {
        const productTags = products[i].tags.split(',');
        const tagsToAdd = this.filterTagsToAdd(tags, productTags, category);
        tags = [...tags, ...tagsToAdd];
      }
      tags = tags.map((tag) => {
        const optionObject = {};
        optionObject.text = tag.split('_').pop();
        optionObject.value = tag;
        if (tag.indexOf('_all') > -1) {
          optionObject.text = `All ${tag.split('_').shift()}s`;
        }
        return optionObject;
      });
      return tags;
    },
    addonFilterOptions(category) {
      const { addonProducts } = this.$store.state;
      return this.createOptions(category, addonProducts);
    },
    cardFilterOptions(category) {
      const { cardProducts } = this.$store.state;
      return this.createOptions(category, cardProducts);
    },
    showSummary(event) {
      this.showBuildSummary = event;
    },
    hideSummary() {
      this.showBuildSummary = false;
    },
  },
};
</script>
