const mutations = {
  // ADD_TO_CART(state, payload) {
  // },

  setOrderTotal(state, payload) {
    state.order.total = payload;
  },
  setTransport(state, payload) {
    state.order.transport = payload;
  },
  updateInvoice(state, payload) {
    state.order.invoice = payload;
  },
  setProducts(state, payload) {
    state.order.products = payload;
  },
  // setState(state, payload) {
  //   Vue.set(state, payload);
  // },
  removeProduct(state, product) {
    let index = state.order.products.indexOf(product);
    if (index > -1) {
      state.order.products.splice(index, 1);
    }
  },
  addProduct(state, payload) {
    let product = JSON.parse(JSON.stringify(payload));
    console.log(product)
    product.productIdWithChoices = 'productId::' + product.id;

    let stringifiedValues = '';
    Object.keys(product.selectedValuesFromChoices).forEach(key => {
      let value = product.selectedValuesFromChoices[key];
      if (key === 'date-range') {
        value = value.start + ' - ' + value.end;
      }
      stringifiedValues !== ''
        ? (stringifiedValues += ', ' + value)
        : (stringifiedValues += value);
      product.productIdWithChoices += '__' + key + '::' + value;
    });
    product.stringifiedValues = stringifiedValues;

    let productFromStore = null;
    state.order.products.forEach(element => {
      if (element.productIdWithChoices === product.productIdWithChoices) {
        productFromStore = element;
        return;
      }
    });

    if (productFromStore) {
      productFromStore.count++;
    } else {
      product.count = 1;
      state.order.products.push(product);
    }

    localStorage.setItem('product', product);
  },
  initialiseStore(state) {
    // if (localStorage.getItem('product')) {
    //   console.log('mmm');
    //   this.replaceState(
    //     Object.assign(state, JSON.parse(localStorage.getItem('product')))
    //   );
    // } else {
    //   localStorage.removeItem('product');
    // }
  }
};

export default mutations;
