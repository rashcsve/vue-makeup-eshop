import { createApp, configureCompat } from "vue";
import App from "./App.vue";
import { router } from "./router";
import { store } from "./store";

configureCompat({
  MODE: 3,
  ATTR_FALSE_VALUE: false,
});

const app = createApp(App);
app.use(store);
app.use(router);

app.mount("#app");
