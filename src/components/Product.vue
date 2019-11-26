<template>
  <div class="product">
    <ProductGallery
      :images="product.images"
      :master-image="product.images[0].src"
    />
    <div class="product__info">
      <!-- To Do: add Title h3 el h1 modifier And Title Compote! -->
      <h3>{{ product.title }}</h3>
      <div class="product__price">
        <div class="product__price -with-tax">
          {{ product.subtitle }}
          {{ product.currency }}
        </div>
      </div>
      <div class="product__add-to-cart">
        <ProductDescription :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductGallery from '../components/ProductGallery';
import ProductDescription from '../components/ProductDescription';

export default {
  components: {
    ProductGallery,
    ProductDescription
  },
  props: {
    product: {
      type: Object,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/_variables';
@import '../assets/styles/_mixins';

.product {
  display: flex;
  width: 100%;
  height: 100%;
  margin: 55px 0 100px;

  @media #{$media-max-tablet} {
    flex-direction: column;
    margin: 48px 0 32px;
  }
}

.product__info {
  width: 40%;
  padding: 32px 24px 32px 48px;
  text-align: left;

  @media #{$media-max-tablet} {
    width: auto;
    padding: 32px 16px;
  }
}

.product__price {
  padding: 24px 0;
  font-size: 32px;

  @media #{$media-max-tablet} {
    font-size: 30px;
  }

  &--with-tax {
    padding: 4px 0;
  }

  &--without-tax {
    padding: 4px 0;
    font-size: 12px;
    font-weight: 100;
  }
}
</style>
