import productApi from '@/api/index';
import cart from './cart';

export default {
  namespaced: true,
  state: {
    giraffes: [],
    services: [],
    items: []
  },
  getters: {
    availableProducts(state, getters) {
      return state.items.filter(item => item.quantity > 0);
    },
    itemIsInStock(state) {
      return product => {
        const found = state.items.find(pr => product.id === pr.id);
        if (found.quantity) {
          return found.quantity > 0;
        } else if (found) {
          return true;
        } else {
          return false;
        }
      };
    }
  },
  mutations: {
    setGiraffes(state, items) {
      state.giraffes = items;
    },
    setServices(state, items) {
      state.services = items;
    },
    setItems(state, items) {
      if (state.items.length === 0) {
        state.items = items;
      } else {
        state.items = state.items.concat(items);
      }
    },
    decrementItemQuantity(state, item) {
      const cartItem = state.items.find(it => item.id === it.id);
      cartItem.quantity--;
    }
  },
  actions: {
    async fetchGiraffes({ commit }) {
      try {
        const fetchedGiraffes = await productApi.getGiraffes();
        commit('setGiraffes', fetchedGiraffes);
        commit('setItems', fetchedGiraffes);
        return fetchedGiraffes;
      } catch (e) {
        console.log(e);
      }
    },
    async fetchServices({ commit }) {
      try {
        const fetchedServices = await productApi.getServices();
        commit('setServices', fetchedServices);
        commit('setItems', fetchedServices);
        return fetchedServices;
      } catch (e) {
        console.log(e);
      }
    }
  }
};
