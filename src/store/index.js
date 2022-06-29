import { createStore } from "vuex";

// import VuexPersist from "vuex-persist";

import cart from "./modules/cart";
import form from "./modules/form";

// Save cart products to Local storage
// const vuexPersist = new VuexPersist({
//   key: "cart",
//   modules: ["cart"],
//   storage: window.localStorage,
// });
console.log(createStore);
export const store = createStore({
  modules: {
    cart,
    form,
  },
  actions: {
    submitOrder({ state, commit }) {
      alert("Order was sent! The data is in console");
      const dataToSend = JSON.stringify({ ...state.cart, ...state.form });
      commit("cart/emptyCart");
      commit("form/emptyForm");
      console.log(dataToSend);
    },
  },
});

export function useStore() {
  return store;
}
