<template>
  <loading v-if="loading"/>
  <div v-else class="the-home-products">
    <h2 class="title title--h1 the-home-products__title">Featured Products</h2>
    <div class="the-home-products__products">
      <section v-for="(product, index) in products" :key="index">
        <ProductCard :id="product.id" :image="product.api_featured_image" :title="product.name" :perex="product.brand" :price="product.price" />
      </section>
    </div>
    <Button dark class="the-home-products__button" router-link="/products" :title="buttonTitle" />
  </div>
</template>

<script>
import Button from './Button'
import Loading from './Loading'
import ProductCard from './ProductCard'

import MakeupService from '../services/api/MakeupService'

export default {
  components: {
    Button,
    Loading,
    ProductCard
  },
  data() {
    return {
      products: [],
      loading: false,
      buttonTitle: 'See All'
    }
  },
  async created() {
    this.loading = true
    const response = await MakeupService.getHomepageProducts()
    this.products = response.data
    this.loading = false
  }
}
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