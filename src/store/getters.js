const getters = {
  products(state) {
    return state.order.products;
  },
  productsCount(state) {
    let count = 0;
    state.order.products.forEach(function(element) {
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
    state.order.products.forEach(function(element) {
      total += element.count * element.priceWithoutTax;
    });
    return total;
  },
  productsTotalTax(state) {
    let totalTax = {};
    state.order.products.forEach(function(element) {
      let el = element;

      if (totalTax[el.taxRate] === undefined) {
        totalTax[el.taxRate] = 0;
      }

      totalTax[el.taxRate] += el.count * el.taxPrice;
    });
    return totalTax;
  }
};

export default getters;
