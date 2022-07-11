import { defineStore } from "pinia";

import { useCartStore } from "./CartStore";
import { useFormStore } from "./FormStore";

export const useStore = defineStore("MainStore", {
  persist: true,
  state: () => {
    isOpenSidebar: false;
  },
  actions: {
    setOpenSidebar(value) {
      this.isOpenSidebar = value;
    },
    submitOrder() {
      alert("Order was sent! The data are in console");
      const cart = useCartStore();
      const form = useFormStore();
      console.log(cart);

      const dataToSend = JSON.stringify({ ...cart.$state, ...form.$state });
      console.log(dataToSend);
      cart.emptyCart();
      form.emptyForm();
    },
  },
});
