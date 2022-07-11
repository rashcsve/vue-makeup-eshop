<template>
  <div class="the-order-cart__products">
    <div class="the-order-cart">
      <div
        class="the-order-cart__item"
        v-for="(product, index) in getCartItems"
        :key="index"
      >
        <router-link
          :to="`/products/${product.id}`"
          class="the-order-cart__image-wrapper"
        >
          <div
            class="the-order-cart__image"
            :style="{
              'background-image': `url(${product.api_featured_image})`,
            }"
          />
        </router-link>

        <div class="the-order-cart__other">
          <div class="the-order-cart__title">{{ product.name }}</div>
          <div class="the-order-cart__perex">{{ product.brand }}</div>
          <div class="the-order-cart__total">
            {{ product.stock }} {{ product.stock > 1 ? "items" : "item" }} -
            {{ product.selectedValue.name }}
            <div
              class="the-order-cart__color"
              :style="{ backgroundColor: product.selectedValue.color }"
            />
          </div>
        </div>
        <div class="the-order-cart__right">
          <div class="the-order-cart__icon" @click="removeItem(product)"></div>
          <div class="the-order-cart__price">
            <b>${{ product.price * product.stock }} </b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "../store/CartStore";
const cartStore = useCartStore();

// Computed
const getCartItems = cartStore.getCartItems;

// Methods
function removeItem(product) {
  cartStore.removeProduct(product);
}
</script>

<style lang="scss" scoped>
.the-order-cart__icon {
  background: url("../assets/svg/close_basket.svg") no-repeat right;
  left: 0;
  top: 0;
  height: 16px;
  width: 16px;
  background-size: contain;
  cursor: pointer;
}

.the-order-cart__item {
  background-color: $color-background;
  margin: 0 0 16px 0;
  display: flex;
  padding: 16px;
  flex-direction: row;
  color: $color-basic;
}

.the-order-cart__image {
  background-size: contain;
  background-position: center;
  min-width: 80px;
  min-height: 80px;
}

.the-order-cart__other {
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  line-height: 24px;
  text-align: left;
  width: 100%;
}

.the-order-cart__title {
  text-decoration: underline;
}

.the-order-cart__right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  min-width: 80px;
  @media #{$media-min-tablet} {
    min-width: 50px;
  }
}

.the-order-cart__products--empty {
  padding: 24px;
  background-color: whitesmoke;
  margin-bottom: 14px;
  text-align: center;
}

.the-order-cart__total {
  display: flex;
  @media #{$media-min-tablet} {
    flex-direction: column;
  }
}

.the-order-cart__color {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-left: 8px;
  @media #{$media-min-tablet} {
    margin: 0;
  }
}
</style>
