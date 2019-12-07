import productApi from '@/api/index';

export default {
  namespaced: true,
  state: {
    giraffes: [],
    services: []
  },
  getters: {
    availableProducts(state, getters) {
      return state.items.filter(item => item.quantity > 0);
    },
    itemIsInStock() {
      return item => {
        return item.quantity > 0;
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
    decrementItemQuantity(state, item) {
      console.log('decr');
      console.log(state.items);
      console.log(item);
      let m = item;
      const productItem = state.items.find(pr => {
        return pr.choices.some(ch => {
          return ch.options.some(opt => {
            console.log('opt ');
            console.log(opt);
            console.log(m.id);
            return opt.id === m.id;
          });
        });
      });
      console.log('pr item');
      console.log(productItem);

      item.quantity--;
    }
  },
  actions: {
    async fetchGiraffes({ commit }) {
      try {
        const fetchedGiraffes = await productApi.getGiraffes();
        commit('setGiraffes', fetchedGiraffes);
        return fetchedGiraffes;
      } catch (e) {
        console.log(e);
      }
    },
    async fetchServices({ commit }) {
      try {
        const fetchedServices = await productApi.getServices();
        commit('setServices', fetchedServices);
        return fetchedServices;
      } catch (e) {
        console.log(e);
      }
    }
  }
};
