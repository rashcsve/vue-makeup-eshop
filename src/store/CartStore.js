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
    getCartItemsCount() {
      console.log(this.itemsCount);
      return this.itemsCount;
    },
    getCartItems(state) {
      return state.items;
    },
    getCartTotal(state) {
      let totalPrice = 0.0;
      this.items.forEach((it) => (totalPrice += it.price * it.stock));
      this.total.totalPrice = totalPrice;
      return totalPrice.toFixed(1);
    },
  },
  actions: {
    addItemToCart(product) {
      let cartItem = this.items.find(
        (item) =>
          item.id === product.id &&
          item.selectedValue.name === product.selectedValue
      );

      if (!cartItem) {
        let updatedProduct = { ...product };
        delete updatedProduct.selectedValue;
        const selectedColorObject = product.product_colors.find(
          (color) => color.colour_name === product.selectedValue
        );
        updatedProduct.selectedValue = {
          name: product.selectedValue,
          color: selectedColorObject?.hex_value,
        };
        this.items.push({
          ...updatedProduct,
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
      let curItem = this.items.find(
        (item) => item.id === product.id && item.value === product.value
      );
      let index = this.items.findIndex(
        (item) => item.id === product.id && item.value === product.value
      );
      this.items.splice(index, 1);
      this.itemsCount = this.itemsCount - curItem.stock;
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
