import Vue from 'vue';
import Vuex from 'vuex';

// import mutations from './mutations';
// import actions from './actions';
// import getters from './getters';

import cart from './modules/cart';
import items from './modules/items';

Vue.use(Vuex);

// const state = {
//   order: {
//     transport: {},
//     invoice: {},
//     products: [],
//     total: {}
//   }
// };

// const state = {
//   // cart,
//   products
// };

export default new Vuex.Store({
  modules: {
    cart,
    items
  }
  // mutations,
  // actions,
  // getters
});
