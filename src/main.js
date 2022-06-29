import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp({ router, store, ...App });
// actually mount to DOM
app.mount("#app");
