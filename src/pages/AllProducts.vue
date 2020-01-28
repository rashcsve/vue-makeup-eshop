<template>
  <loading v-if="loading"/>
  <container v-else>
  <div class="products">
    <h2 class="title title--h1">Cruelty Free Products</h2>
    <div class="products__container">
      <div v-for="(product, index) in products" :key="index" class="products__item">
        <ProductCard :id="product.id" :image="product.api_featured_image" :title="product.name" :perex="product.brand" :price="product.price" />
      </div>
    </div>
  </div>
   </container>
</template>

<script>
import Loading from '../components/Loading'
import Container from '../components/Container';
import ProductCard from '../components/ProductCard'

import MakeupService from '../services/api/MakeupService'

export default {
  components: {
    Loading,
    Container,
    ProductCard
  },
  data() {
    return {
      products: [],
      loading: false,
    }
  },
  async created() {
    this.loading = true
    const response = await MakeupService.getAllCrueltyFree()
    this.products = response.data
    this.loading = false
  }
}
</script>
