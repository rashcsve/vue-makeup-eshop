const mutations = {
  // TO-DO: same names!!!
  setOrderTotal(state, orderTotal) {
    state.order.total = orderTotal;
  },
  setTransport(state, transport) {
    state.order.transport = transport;
  },
  updateInvoice(state, invoice) {
    state.order.invoice = invoice;
  },
  setProducts(state, products) {
    // update products
    state.order.products = products;
  },
  removeProduct(state, product) {
    let index = state.order.products.indexOf(product);

    if (index > -1) {
      state.order.products.splice(index, 1);
    }
  },
  addProduct(state, product) {
    var product = JSON.parse(JSON.stringify(product));

    //rozsir produkt o uniq id
    product.productIdWithChoices = 'productId::' + product.id;
    var stringifiedValues = '';
    Object.keys(product.selectedValuesFromChoices).forEach(key => {
      var value = product.selectedValuesFromChoices[key];
      if (key === 'date-range') {
        var start = value.start;
        var end = value.end;
        value = start + ' - ' + end;
      }
      stringifiedValues += ', ' + value;
      product.productIdWithChoices += '__' + key + '::' + value;
    });
    product.stringifiedValues = stringifiedValues;

    var productFromStore = null;
    state.order.products.forEach(element => {
      if (element.productIdWithChoices === product.productIdWithChoices) {
        productFromStore = element;
        return;
      }
    });

    //Handle adding new / or recout
    if (productFromStore) {
      productFromStore.count++;
    } else {
      product.count = 1;
      state.order.products.push(product);
    }
  }
};

export default mutations;
