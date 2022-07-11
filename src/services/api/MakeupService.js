import Api from "./Api";

const API_URL = "products.json?product_tags=cruelty+free";
const API_PRODUCT_URL = API_URL + "&product_type=";

export default {
  async getLipsProducts() {
    const urls = [`${API_PRODUCT_URL}lipstick`, `${API_PRODUCT_URL}lip_liner`];
    const requests = urls.map((url) => Api().get(url));
    const [lipsticks, lipliners] = await Promise.all(requests);
    return [...lipsticks?.data, ...lipliners?.data];
  },
  getFaceProducts() {
    return Api().get(`${API_PRODUCT_URL}foundation`);
  },
  getAllProducts() {
    return Api().get(API_URL);
  },
  getHomepageProducts() {
    return Api().get(`${API_URL}&price_greater_than=6`);
  },
  getProduct(id) {
    return Api().get("products/" + id);
  },
};
