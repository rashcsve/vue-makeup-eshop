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
        <p class="product-card__price">{{ price }} $</p>
      </div>
    </div>
     <!-- To Do: router link on :id -->
    <Button :title="buttonTitle" />
  </router-link>
</template>

<script>
import Button from '../components/Button';

  export default {
    components: {
      Button
    },
    data() {
      return {
        buttonTitle: "Buy"
      }
    },
    props: {
      id: {
        type: Number,
        default: 0
      },
      image: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      perex: {
        type: String,
        default: ''
      },
      price: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
.product-card {
  display: flex;
  flex-direction: column;
  width: 300px;
}
.product-card__other {
  display: flex;
  justify-content: space-between;
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
</style>