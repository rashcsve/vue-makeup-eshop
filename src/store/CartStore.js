import { defineStore } from "pinia";

export const useCartStore = defineStore("CartStore", {
  persist: true,
  state: () => ({
    items: [],
    total: {},
    itemsCount: 0,
  }),
  getters: {
    hasItems() {
      return this.items && this.items.length !== 0;
    },
    getItemsCount() {
      return this.itemsCount;
    },
    getItems() {
      return this.items;
    },
    getTotal(state) {
      let totalPrice = 0.0;
      this.items.forEach((it) => (totalPrice += it.price * it.stock));
      this.total.totalPrice = totalPrice;
      return totalPrice % 1 === 0 ? totalPrice : totalPrice.toFixed(1);
    },
  },
  actions: {
    addItem(product) {
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
    emptyCart() {
      this.itemsCount = 0;
      this.items = [];
      this.total = {};
    },
    removeItem(product) {
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
