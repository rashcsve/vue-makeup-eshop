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
      alert("Order was sent! The data is in console");
      const cart = useCartStore();
      const form = useFormStore();

      const dataToSend = JSON.stringify({ ...cart.$state, ...form.$state });
      cart.emptyCart();
      form.emptyForm();
      console.log(dataToSend);
    },
  },
});