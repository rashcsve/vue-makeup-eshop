// module.exports = {
//   css: {
//     loaderOptions: {
//       sass: {
//         prependData: `
//           @import "@/assets/styles/_variables.scss";
//           @import "@/assets/styles/_mixins.scss";
//           @import "@/assets/styles/_base.scss";
//         `,
//       },
//     },
//   },
// };

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/styles/_variables.scss";
          @import "@/assets/styles/_mixins.scss";
          @import "@/assets/styles/_base.scss";
        `,
      },
    },
  },
});
