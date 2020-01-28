import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

import cart from './modules/cart';
import form from './modules/form';

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: 'cart',
  modules: ['cart'],
  storage: window.localStorage
});

export default new Vuex.Store({
  modules: {
    cart,
    form
  },
  actions: {
    submitOrder({ state, commit }) {
      alert('Order was sent! The data is in console');
      const dataToSend = JSON.stringify({ ...state.cart, ... state.form});
      console.log(dataToSend);
      commit('cart/emptyCart');
      commit('form/emptyForm');
      console.log(state);
    }
  },
  plugins: [vuexPersist.plugin]
});
