const getDefaultState = () => {
  return {
    transport: {},
    contact: {}
  };
};

// initial state
const state = getDefaultState();

export default {
  namespaced: true,
  state,
  getters: {
    getCartTransport(state) {
      return state.transport;
    },
    getCartContact(state) {
      console.log("get")
      console.log(state.contact)
      return state.contact;
    }
  },
  mutations: {
    setTransport(state, transport) {
      state.transport = transport;
    },
    setContact(state, contact) {
      console.log("pidoras")
      console.log(contact)
      state.contact = contact;
    },
    emptyForm(state) {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {}
};
