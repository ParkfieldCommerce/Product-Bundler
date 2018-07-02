<template>
  <v-dialog
    :value="showSummary"
    class="BuildSummary"
    persistent
    transition="dialog-bottom-transition"
    max-width="500px"
  >
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="closeBuildSummary()">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title>Settings</v-toolbar-title>
    </v-toolbar>
    <v-list>
      <v-list-tile v-if="hasSelectedMain()" class="BuildSummary__main-product">
        <v-list-tile-avatar>
          <img :src="mainProduct.image.src" :alt="mainProduct.image.alt">
        </v-list-tile-avatar>
        <v-list-tile-content>
          {{mainProduct.title}}-{{mainProduct | moneyFormat}}
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>mdi-gift</v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile
        v-if="hasSelectedAddons()"
        class="BuildSummary__addon-product"
        v-for="addon in addonProducts"
        :key="addon.id"
      >
        <v-list-tile-avatar>
          <img :src="addon.image.src" :alt="addon.image.alt">
        </v-list-tile-avatar>
        <v-list-tile-content>
        {{addon.title}} - {{addon.quantity}}
        {{addon | moneyFormat}}
        </v-list-tile-content>
        <v-list-tile-action>
          <button @click="removeAddon(addon)"><v-icon>mdi-close-circle</v-icon></button>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile v-if="hasSelectedCard()" class="BuildSummary__card-product">
        <v-list-tile-avatar>
          <img :src="cardProduct.image.src" :alt="cardProduct.image.alt">
        </v-list-tile-avatar>
        <v-list-tile-content>
          {{cardProduct.title}} - {{cardProduct | moneyFormat}}<br>
          Message: {{cardProduct.message}}
        </v-list-tile-content>
        <v-list-tile-action>
          <button @click="openCardPopup">
            <v-icon>mdi-lead-pencil</v-icon>
          </button>
        </v-list-tile-action>
        <CardProductPopup
          :product="cardProduct"
          :popup-state="popupIsActive"
          @close-popup="closeCardPopup"
        >
        </CardProductPopup>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile>
        <v-list-tile-avatar><div class="title">Total</div></v-list-tile-avatar>
        <v-list-tile-content class="title align-end justify-center">
          <div class="BuildSummary__total-price">{{totalBuildPrice}}</div>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-dialog>
</template>

<script>
import CardProductPopup from './CardProductPopup.vue';

export default {
  components: {
    CardProductPopup,
  },
  props: {
    showSummary: Boolean,
  },
  data() {
    return {
      popupIsActive: false,
    };
  },
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
    hasSelectedMain() {
      return this.$store.getters.hasSelectedMain;
    },
    hasSelectedAddons() {
      return this.$store.getters.hasSelectedAddons;
    },
    hasSelectedCard() {
      return this.$store.getters.hasSelectedCard;
    },
    openCardPopup() {
      this.popupIsActive = true;
    },
    closeCardPopup() {
      this.popupIsActive = false;
    },
    closeBuildSummary() {
      this.$emit('show-summary', false);
    }
  },
};
</script>
