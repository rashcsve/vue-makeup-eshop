<template>
  <loading v-if="loading"/>
  <container v-else >
  <div class="products">
    <h2 class="title title--h1">Lips Products</h2>
    <div class="products__container">
      <section v-for="(product, index) in products" :key="index">
        <ProductCard :id="product.id" :image="product.api_featured_image" :title="product.name" :perex="product.brand" :price="product.price" />
      </section>
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
    this.products = await MakeupService.getLipsProducts()
    console.log(this.products)
    this.loading = false
  }
}
</script>
