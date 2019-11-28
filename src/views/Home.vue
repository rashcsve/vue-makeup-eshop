<template>
  <div class="home">
    <the-navigation @show-modal="modalIsOpened" />
    <div :class="{ home__container: true, 'home__container--modal': showModal }">
      <img src="../assets/images/hero.png" alt="Hero Image" class="home__image" />
      <container>
        <the-hero />
        <ul class="home__products-list">
          <li v-for="item in items" :key="item.id" class="home__products-li">
            <Product :product="item" />
          </li>
        </ul>
      </container>
      <the-footer />
    </div>
  </div>
</template>

<script>
import TheNavigation from "../components/TheNavigation";
import TheHero from "../components/TheHero";
import Product from "../components/Product";
import Container from "../components/Container";
import TheFooter from "../components/TheFooter";

import products from "../assets/json/products";

export default {
  name: "home",
  components: {
    TheNavigation,
    TheHero,
    Product,
    Container,
    TheFooter
  },
  data() {
    return {
      showModal: false,
      items: products
    };
  },
  computed: {
    addModalClass() {
      return this.showModal;
    }
  },

  methods: {
    modalIsOpened(value) {
      this.showModal = value;
    }
  }
};
</script>

<style lang="scss">
img {
  width: 100%;
}

.home__container {
  &--modal {
    overflow: hidden;
    filter: blur(20px);
    margin-top: 144px;
  }
}

.home__image {
  background: lighten(black, 40%);
  width: 100%;
  background-size: cover;
  background-position: center;
}
</style>
