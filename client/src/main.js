import Vue from 'vue';
import Vuetify from 'vuetify';
import 'babel-polyfill';
import App from './App.vue';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;
Vue.use(Vuetify);

Vue.filter('filterValue', option => {
  //Used to split the filter tag and just get the avalue
  return option.split('_').pop();
});

Vue.filter('getProductImage', product => {
  return product.images[0].src;
});

Vue.filter('moneyFormat', product => {
  if(product.variants){
    return `$${product.variants[0].price}`
  }
});

new Vue({
  router,
  store,
  data:{
    currentPage:1
  },
  created() {
    this.$store.dispatch('getProducts');
  },
  render: h => h(App),
}).$mount('#app');
