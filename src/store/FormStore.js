import { defineStore } from "pinia";

export const useFormStore = defineStore("FormStore", {
  state: () => ({
    transport: {},
    contact: {},
  }),
  actions: {
    setTransport(transport) {
      this.transport = JSON.parse(JSON.stringify(transport));
    },
    setContact(contact) {
      this.contact = JSON.parse(JSON.stringify(contact));
    },
    emptyForm() {
      this.contact = {};
      this.transport = {};
    },
  },
});

const getDefaultState = () => {
  return {
    transport: {},
    contact: {},
  };
};
