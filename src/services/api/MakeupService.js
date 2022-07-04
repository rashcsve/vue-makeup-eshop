import Api from "./Api";

export default {
  async getLipsProducts() {
    let lipsProducts = [];
    const lipsticks = await Api().get(
      "products.json?product_tags=cruelty+free&product_type=lipstick"
    );
    const lipliners = await Api().get(
      "products.json?product_tags=cruelty+free&product_type=lip_liner"
    );
    Object.keys(lipsticks.data).forEach((pr) => {
      lipsProducts.push(lipsticks.data[pr]);
    });
    Object.keys(lipliners.data).forEach((pr) => {
      lipsProducts.push(lipliners.data[pr]);
    });
    return lipsProducts;
  },
  getFaceProducts() {
    return Api().get(
      "products.json?product_tags=cruelty+free&product_type=foundation"
    );
  },
  getAllProducts() {
    return Api().get(`products.json?product_tags=cruelty+free`);
  },
  getHomepageProducts() {
    return Api().get(
      `products.json?product_tags=cruelty+free&price_greater_than=6`
    );
  },
  async getProduct(id) {
    const kek = await Api().get("products/" + id, { crossdomain: true });
    console.log(kek, typeof kek);
    return kek;
  },
};
