<template>
  <loading v-if="loading" />
  <container v-else>
    <div class="products">
      <h2 class="title title--h1">Lips Products</h2>
      <div class="products__container">
        <section
          v-for="(product, index) in products"
          :key="index"
          class="products__item"
        >
          <ProductCard
            :id="product.id"
            :image="product.api_featured_image"
            :title="product.name"
            :perex="product.brand"
            :price="product.price"
          />
        </section>
      </div>
    </div>
  </container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Loading from "../components/Loading.vue";
import Container from "../components/Container.vue";
import ProductCard from "../components/ProductCard.vue";

import MakeupService from "../services/api/MakeupService";

const products = ref([]);
const loading = ref(false);

onMounted(async () => {
  try {
    loading.value = true;
    const response = await MakeupService.getLipsProducts();
    products.value = response;
    loading.value = false;
  } catch (e) {
    loading.value = false;
    console.log(e);
  }
});
</script>
