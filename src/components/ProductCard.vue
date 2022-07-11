<template>
  <router-link :to="`/products/${id}`" class="product-card">
    <div class="product-card__img-wrapper">
      <img :src="image" alt="product-photo" />
    </div>
    <div class="product-card__info">
      <h3 class="title title--h3 product-card__title">
        {{ title }}
      </h3>
      <div class="product-card__other">
        <p class="product-card__perex">{{ perex }}</p>
        <p class="product-card__price">${{ trimAmount(+price) }}</p>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { defineProps } from "vue";
import { trimAmount } from "../services/currency";
import Button from "../components/Button.vue";

const props = defineProps({
  id: Number,
  image: String,
  title: String,
  perex: String,
  price: String,
});
</script>

<style lang="scss" scoped>
.product-card {
  display: flex;
  flex-direction: column;
  max-width: 240px;
  width: 100%;
  color: $color-basic;

  &:hover {
    opacity: 0.8;
  }
}
.product-card__other {
  display: flex;
  justify-content: space-between;
  @media #{$media-max-tablet} {
    flex-direction: column;
    align-items: flex-start;
  }
}
.product-card__price {
  font-weight: bold;
}
.product-card__perex {
  font-size: 20px;
}
.product-card__title {
  margin-bottom: 0;
}
.product-card__img-wrapper {
  @media #{$media-min-tablet} {
    max-width: 200px;
  }
}
</style>
