<template>
  <div class="home">
    <the-navigation @show-modal="modalIsOpened" />
    <div
      :class="{ home__container: true, 'home__container--modal': showModal }"
    >
      <img
        src="../assets/images/hero.png"
        alt="Hero Image"
        class="home__image"
      />
      <div class="wrapper">
        <the-hero />
        <ul class="home__products-list">
          <li v-for="item in items" :key="item.id" class="home__products-li">
            <Product :product="item" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TheNavigation from '../components/TheNavigation';
import TheHero from '../components/TheHero';
import Product from '../components/Product';

import products from '../assets/json/products';

export default {
  name: 'home',
  components: { TheNavigation, TheHero, Product },
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
@import '../assets/styles/_variables.scss';

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

.home__products-list,
.home__products-li {
  list-style: none;
}

// To Do: compote or style Wrapper
.wrapper {
  padding: 0 64px;
  @media #{$media-max-tablet} {
    padding: 0 64px;
  }

  @media #{$media-phone-L} {
    padding: 0 16px;
  }
}
</style>
