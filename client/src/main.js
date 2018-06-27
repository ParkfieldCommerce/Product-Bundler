import '@babel/polyfill'
import Vue from 'vue';
import './plugins/vuetify'
import Vuetify from 'vuetify';
import App from './App.vue';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;
Vue.use(Vuetify);

//  Used to split the filter tag and just get the avalue
Vue.filter('filterValue', option => option.split('_').pop());

Vue.filter('getProductImage', product => product.images[0].src);

Vue.filter('moneyFormat', (product) => {
  if (product.variants) {
    return `$${product.variants[0].price}`;
  }
  return 'Price Unavailable';
});

new Vue({
  router,
  store,
  data: {
    currentPage: 1,
  },
  created() {
    this.$store.dispatch('getProducts');
  },
  render: h => h(App),
}).$mount('#app');
