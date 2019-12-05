const mutations = {
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
  removeProduct(state, product) {
    let index = state.order.products.indexOf(product);

    if (index > -1) {
      state.order.products.splice(index, 1);
    }
  },
  addProduct(state, product) {
    var product = JSON.parse(JSON.stringify(product));

    product.productIdWithChoices = 'productId::' + product.id;
    let stringifiedValues = '';
    Object.keys(product.selectedValuesFromChoices).forEach(key => {
      let value = product.selectedValuesFromChoices[key];
      if (key === 'date-range') {
        let start = value.start;
        let end = value.end;
        value = start + ' - ' + end;
      }
      stringifiedValues !== "" ? (stringifiedValues += ', ' + value) : (stringifiedValues += value)
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
  }
};

export default mutations;
