import { defineStore } from "pinia";

export const useFormStore = defineStore("FormStore", {
  persist: true,
  state: () => {
    return getDefaultState();
  },
  actions: {
    setTransport(state, transport) {
      state.transport = transport;
    },
    setContact(state, contact) {
      state.contact = contact;
    },
    emptyForm(state) {
      Object.assign(state, getDefaultState());
    },
  },
});

const getDefaultState = () => {
  return {
    transport: {},
    contact: {},
  };
};
