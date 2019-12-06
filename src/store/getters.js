const getters = {
  products: state => state.order.products,
  productsCount(state) {
    let count = 0;
    state.order.products.forEach(element => {
      count += element.count;
    });
    return count;
  },
  productsTotal(state) {
    let total = 0;
    let _iteratorNormalCompletion = true;
    let _didIteratorError = false;
    let _iteratorError = undefined;

    try {
      for (
        let _iterator = state.order.products[Symbol.iterator](), _step;
        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
        _iteratorNormalCompletion = true
      ) {
        let product = _step.value;
        let extra = 0;

        if (product.extraPrice !== undefined) {
          extra = product.extraPrice;
        }

        total += product.count * (product.price + extra);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
    return total;
  },
  productsTotalWithoutTax(state) {
    let total = 0;
    state.order.products.forEach(element => {
      total +=
        element.count * (element.price * ((100 - element.taxRate) / 100));
    });
    return total;
  },
  productsTotalTax(state) {
    let totalTaxMap = new Map();
    state.order.products.forEach(element => {
      let totalTaxPrice = 0;
      //check if key exists
      if (totalTaxMap.has(element.taxRate)) {
        totalTaxPrice = totalTaxMap.get(element.taxRate); // get the value
        totalTaxPrice +=
          element.count * (element.price * (element.taxRate / 100));
      } else {
        totalTaxPrice =
          element.count * (element.price * (element.taxRate / 100));
      }
      totalTaxMap.set(element.taxRate, totalTaxPrice); // set new key-value pair
    });
    return totalTaxMap;
  }
};

export default getters;
