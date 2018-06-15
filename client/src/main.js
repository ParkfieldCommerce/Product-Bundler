import Vue from 'vue';
import Vuetify from 'vuetify';
import 'babel-polyfill';
import App from './App.vue';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;
Vue.use(Vuetify);

new Vue({
  router,
  store,
  created() {
    this.$store.dispatch('getProducts');
  },
  render: h => h(App),
}).$mount('#app');
