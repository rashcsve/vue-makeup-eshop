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
      console.log('add');
      console.log(state.items);
    },
    incrementItemQuantity(state, cartItem) {
      console.log('incr');
      console.log(state.items);
      cartItem.stock++;
    },
    emptyCart(state) {
      state.items = [];
    }
  },
  actions: {
    addItemToCart({ state, getters, commit, rootState, rootGetters }, product) {
      console.log('prod');
      console.log(product);
      if (rootGetters['products/itemIsInStock'](product)) {
        const cartItem = state.items.find(item => item.id === product.id);
        if (!cartItem) {
          commit('addItemToCart', product);
        } else {
          commit('incrementItemQuantity', cartItem);
        }
        commit('products/decrementItemQuantity', product, { root: true });
      }
      // let product = JSON.parse(JSON.stringify(payload));
      // console.log(product);
      // product.productIdWithChoices = 'productId::' + product.id;
      // let stringifiedValues = '';
      // Object.keys(product.selectedValuesFromChoices).forEach(key => {
      //   let value = product.selectedValuesFromChoices[key];
      //   if (key === 'date-range') {
      //     value = value.start + ' - ' + value.end;
      //   }
      //   stringifiedValues !== ''
      //     ? (stringifiedValues += ', ' + value)
      //     : (stringifiedValues += value);
      //   product.productIdWithChoices += '__' + key + '::' + value;
      // });
      // product.stringifiedValues = stringifiedValues;
      // let productFromStore = null;
      // state.order.products.forEach(element => {
      //   if (element.productIdWithChoices === product.productIdWithChoices) {
      //     productFromStore = element;
      //     return;
      //   }
      // });
      // if (productFromStore) {
      //   productFromStore.count++;
      // } else {
      //   product.count = 1;
      //   state.order.products.push(product);
      // }
      // localStorage.setItem('product', product);
    }
  }
};
