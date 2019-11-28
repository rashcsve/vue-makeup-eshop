<template>
  <div v-if="productsCount != 0" class="the-order-cart__products">
    <div class="the-order-cart">
      <h4 class="title title--medium">Cart</h4>
      <div
        class="the-order-cart__item"
        v-for="(product, index) in products"
        :key="index"
      >
        <div class="the-order-cart__image-wrapper">
          <div
            class="the-order-cart__image"
            :style="{
              'background-image':
                'url(' + require(`@/assets/${product.images[0].src}`) + ')'
            }"
          ></div>
        </div>

        <div class="the-order-cart__other">
          <div class="the-order-cart__title">
            {{ product.title }}
          </div>
          <div class="the-order-cart__total">
            {{ product.count }} items{{ product.stringifiedValues }}
          </div>
          <div class="the-order-cart__price">
            <b>{{ productTotalPrice(product) }} {{ currency }}</b>
          </div>
        </div>
        <div class="the-order-cart__icon" @click="removeItem(product)"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      store: this.$store,
      // currency: this.$root.$options.config.currency
      currency: '$'
    };
  },

  computed: {
    products() {
      console.log(this.store.getters.products);
      return this.store.getters.products;
    },

    productsCount() {
      return this.store.getters.productsCount;
    }
  },

  methods: {
    removeItem(product) {
      this.store.commit('removeProduct', product);
    },
    productTotalPrice(product) {
      let extraPrice = 0;
      if (product.extraPrice !== undefined) {
        extraPrice = product.extraPrice;
      }

      return product.price + extraPrice;
    }
  }
};
</script>

<style lang="scss" scoped>
.the-order-cart__icon {
  background: url('../assets/svg/close_basket.svg') no-repeat right;
  left: 0;
  top: 0;
  height: 20px;
  width: 20px;
  background-size: contain;
  cursor: pointer;
}

.the-order-cart__item {
  background-color: $color-light;
  margin: 0 0 16px 0;
  display: flex;
  padding: 16px;
  flex-direction: row;
}

.the-order-cart__image {
  background-size: cover;
  background-position: center;
  min-width: 80px;
  min-height: 80px;
}

.the-order-cart__other {
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  line-height: 24px;
  text-align: left;
  width: 100%;
}

.the-order-cart__title {
  text-decoration: underline;
}

.the-order-cart__products--empty {
  padding: 24px;
  background-color: whitesmoke;
  margin-bottom: 14px;
  text-align: center;
}
</style>
