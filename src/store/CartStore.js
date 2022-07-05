import { defineStore } from "pinia";

export const useCartStore = defineStore("CartStore", {
  persist: true,
  state: () => {
    return getDefaultState();
  },
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
      state.items.forEach((it) => (totalPrice += it.price * it.stock));
      state.total.totalPrice = totalPrice;
      return totalPrice.toFixed(1);
    },
  },
  actions: {
    addItemToCart(product) {
      console.log(this.items);
      let cartItem = this.items.find(
        (item) =>
          item.id === product.id &&
          item.value.colour_name === product.value.colour_name
      );
      console.log(cartItem);
      if (!cartItem) {
        this.items.push({
          ...product,
          stock: 1,
        });
      } else {
        cartItem.stock++;
        cartItem = { ...product };
      }
      this.itemsCount++;
    },
    submitOrder({ state }) {
      Object.assign(state, getDefaultState());
    },
    removeProduct(product) {
      let curItem = state.items.find(
        (item) => item.id === product.id && item.value === product.value
      );
      let index = state.items.findIndex(
        (item) => item.id === product.id && item.value === product.value
      );
      curItem.stock > 1 ? curItem.stock-- : state.items.splice(index, 1);
      state.itemsCount--;
    },
  },
});

const getDefaultState = () => {
  return {
    items: [],
    total: {},
    itemsCount: 0,
  };
};
