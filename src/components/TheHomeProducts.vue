<template>
  <Loading v-if="loading" />
  <div v-else class="the-home-products">
    <h2 class="title title--h1 the-home-products__title">Featured Products</h2>
    <div class="the-home-products__products">
      <section v-for="(product, index) in products" :key="index">
        <ProductCard
          :id="product.id"
          :image="product.api_featured_image"
          :title="product.name"
          :perex="product.brand"
          :price="product.price"
        />
      </section>
    </div>
    <Button
      dark
      class="the-home-products__button"
      router-link="/products"
      title="See All"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Button from "./Button.vue";
import ProductCard from "./ProductCard.vue";
import MakeupService from "../services/api/MakeupService";

const products = ref([]);
const loading = ref(false);

onMounted(async () => {
  try {
    loading.value = true;
    const response = await MakeupService.getHomepageProducts();
    products.value = response.data;
    loading.value = false;
  } catch (e) {
    console.log(e);
    loading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.the-home-products {
  margin: 32px 0;
  @media #{$media-min-tablet} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.the-home-products__products {
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
  flex-wrap: wrap;
  @media #{$media-phone-L} {
    justify-content: center;
  }
}
.the-home-products__title {
  margin: 64px 0 32px;
}
.the-home-products__button {
  display: flex;
  justify-content: center;
  margin: 32px 0 64px;
}
</style>
