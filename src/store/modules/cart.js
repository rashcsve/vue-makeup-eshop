const getDefaultState = () => {
  return {
    items: [],
    transport: {},
    invoice: {},
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
      let totalPrice = 0;
      state.items.forEach(it => (totalPrice += it.price * it.stock));
      state.total.totalPrice = totalPrice;
      return totalPrice;
    },
    getCartTotalWithoutTax(state) {
      let totalPriceWithoutTax = 0;
      state.items.forEach(
        it =>
          (totalPriceWithoutTax +=
            ((100 - it.taxRate) / 100) * it.price * it.stock)
      );
      state.total.totalPriceWithoutTax = totalPriceWithoutTax;
      return totalPriceWithoutTax;
    },
    getCartTaxes(state) {
      let cartTaxes = {};
      state.items.forEach(it => {
        const curTaxPrice = (it.taxRate / 100) * it.price * it.stock;
        if (cartTaxes[it.taxRate]) {
          cartTaxes[it.taxRate] += curTaxPrice;
        } else {
          cartTaxes[it.taxRate] = curTaxPrice;
        }
      });
      state.total.totalCartTaxes = cartTaxes;
      return cartTaxes;
    },
    getCartTransport(state) {
      return state.transport;
    },
    getCartInvoice(state) {
      return state.invoice;
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
    incrementItemQuantity(state, product) {
      let curItem = state.items.find(
        item =>
          item.id === product.id &&
          item.dateTimeValue === product.dateTimeValue &&
          item.additionalValue === product.additionalValue &&
          item.additionalLabel === product.additionalLabel
      );
      curItem.stock++;
      curItem = { ...product };
    },
    incrementItemsCount(state) {
      state.itemsCount++;
    },
    setTransport(state, transport) {
      state.transport = transport;
    },
    setInvoice(state, invoice) {
      state.invoice = invoice;
    },
    emptyCart(state) {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    addItemToCart({ state, commit, rootGetters }, product) {
      if (rootGetters['items/itemIsInStock'](product)) {
        const cartItem = state.items.find(
          item =>
            item.id === product.id &&
            item.dateTimeValue === product.dateTimeValue &&
            item.additionalLabel === product.additionalLabel &&
            item.additionalValue === product.additionalValue
        );
        if (!cartItem) {
          commit('addItemToCart', product);
        } else {
          commit('incrementItemQuantity', product);
        }
        commit('incrementItemsCount');
        commit('items/decrementItemQuantity', product, { root: true });
      } else {
        console.log('Impossible to make an order - no such items');
      }
    },
    addTransportToCart({ state, commit }, transport) {
      // const cartTransport = state.items.find(tr => tr.id === transport.id);
      // if (!cartTransport) {
      commit('setTransport', transport);
      // } else {
      //   console.log('Only one transport is possible');
      // }
    },
    addInvoiceToCart({ commit }, invoice) {
      commit('setInvoice', invoice);
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
