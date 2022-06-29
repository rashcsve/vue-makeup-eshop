import { createApp, configureCompat } from "vue";
import App from "./App.vue";
import { router } from "./router";
import { store } from "./store";

console.log(store);

configureCompat({
  MODE: 3,
});

const app = createApp(App);
app.use(store);
app.use(router);

// actually mount to DOM
app.mount("#app");
