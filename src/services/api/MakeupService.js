import Api from './Api';

export default {
  getLipsProducts() {
    return Api().get(
      'products.json?product_tags=cruelty+free&product_type=lipstick'
    );
  },
  getFaceProducts() {
    return Api().get(
      'products.json?product_tags=cruelty+free&product_type=foundation'
    );
  },
  getAllCrueltyFree() {
    return Api().get(`products.json?product_tags=cruelty+free`);
  },
  getHomepageProducts() {
    return Api().get(
      `products.json?product_tags=cruelty+free&price_greater_than=6`
    );
  },
  getProduct(id) {
    return Api().get('products/' + id, { crossdomain: true });
  }
};