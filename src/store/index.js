import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

const state = {
  order: {
    transport: {},
    invoice: {},
    products: [],
    total: {}
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  // TO DO - what is setter wtf
  setters: {
    setProducts: function setProducts(state, products) {
      // update products
      state.order.products = products;
    }
  }
});
