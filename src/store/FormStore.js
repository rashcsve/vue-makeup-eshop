import { defineStore } from "pinia";

export const useFormStore = defineStore("FormStore", {
  state: () => ({
    transport: {},
    contact: {},
  }),
  actions: {
    setTransport(transport) {
      this.transport = transport;
    },
    setContact(contact) {
      this.contact = JSON.parse(JSON.stringify(contact));
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
