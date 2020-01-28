module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/styles/_variables.scss";
          @import "@/assets/styles/_mixins.scss";
          @import "@/assets/styles/_base.scss";
        `
      }
    }
  }
};
