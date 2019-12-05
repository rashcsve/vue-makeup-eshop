import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// Store Watcher
store.subscribe(state => {
  localStorage.setItem('prodssuct', JSON.stringify(state));
});

new Vue({
  router,
  store,
  beforeCreate() {
    store.commit('initialiseStore');
  },
  render: h => h(App)
}).$mount('#app');
