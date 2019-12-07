import productApi from '@/api/index';

export default {
  namespaced: true,
  state: {
    // {id, name, price, extraPrice, image, quantity, value}
    items: [],
    transport: {},
    invoice: {},
    total: {}
  },

  getters: {
    getCartItems(state, getters, rootState, rootGetters) {
      return state.items.map(cartItem => {
        const item = rootState.products.items.find(
          item => item.id === cartItem.id
        );
        return {
          ...item
        };
      });
    },
    getCartTotal(state, getters) {},
    getProductsCount(state) {
      let count = 0;
      state.items.forEach(element => {
        count += element.count;
      });
      return count;
    }
  },
  mutations: {
    addItemToCart(state, product) {
      state.items.push({
        // product newly added to cart
        ...product,
        stock: 1
      });
    },
    incrementItemQuantity(state, cartItem) {
      cartItem.stock++;
    },
    emptyCart(state) {
      state.items = [];
    }
  },
  actions: {
    addItemToCart({ state, getters, commit, rootState, rootGetters }, product) {
      if (rootGetters['items/itemIsInStock'](product)) {
        const cartItem = state.items.find(item => item.id === product.id);
        if (!cartItem) {
          commit('addItemToCart', product);
        } else {
          commit('incrementItemQuantity', cartItem);
        }
        commit('items/decrementItemQuantity', product, { root: true });
      } else {
        console.log('Impossible to make an order - no such items');
      }
    }
  }
};
