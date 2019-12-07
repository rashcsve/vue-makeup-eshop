import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { currency } from '@/services/currency';

Vue.config.productionTip = false;
Vue.filter('currency', currency);

// Store Watcher
store.subscribe(state => {
  localStorage.setItem('product', JSON.stringify(state));
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
