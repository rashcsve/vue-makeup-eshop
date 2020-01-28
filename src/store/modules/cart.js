
const getDefaultState = () => {
  return {
    items: [],
    total: {},
    itemsCount: 0
  };
};

// initial state
const state = getDefaultState();

export default {
  namespaced: true,
  state,
  getters: {
    hasItems(state) {
      return state.items && state.items.length !== 0;
    },
    getCartItemsCount(state) {
      return state.itemsCount;
    },
    getCartItems(state) {
      return state.items;
    },
    getCartTotal(state) {
      let totalPrice = 0.0;
      state.items.forEach(it => (totalPrice += it.price * it.stock));
      state.total.totalPrice = totalPrice;
      return totalPrice.toFixed(1);
    }
  },
  mutations: {
    removeProduct(state, product) {
      let curItem = state.items.find(
        item =>
          item.id === product.id && item.value === product.value
      );
      let index = state.items.findIndex(item => item.id === product.id && item.value === product.value)
      curItem.stock > 1 ? curItem.stock-- : state.items.splice(index, 1);
      state.itemsCount--;
    },
    addItemToCart(state, product) {
      state.items.push({
        ...product,
        stock: 1
      });
    },
    incrementItemQuantity(state, product) {
      let curItem = state.items.find(
        item =>
          item.id === product.id
      );
      curItem.stock++;
      curItem = { ...product };
    },
    incrementItemsCount(state) {
      state.itemsCount++;
    },
    emptyCart(state) {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    addItemToCart({ state, commit }, product) {
      console.log("adding to cart")
      const cartItem = state.items.find(
        item => item.id === product.id &&
          item.value.colour_name === product.value.colour_name
      )
      if (!cartItem) {
        commit('addItemToCart', product);
      } else {
        commit('incrementItemQuantity', product);
      }
      commit('incrementItemsCount');
    },
    submitOrder({ state, commit }) {
      alert('Order was sent! The data is in console');
      const dataToSend = JSON.stringify(state);
      console.log(dataToSend);
      commit('emptyCart');
      console.log(state);
    }
  }
};
