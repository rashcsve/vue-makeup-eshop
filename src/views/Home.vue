<template>
  <div class="home">
    <the-navigation @show-modal="modalIsOpened" />
    <div :class="{'home-container':true, 'home-container__modal': showModal}">
      <img src="../assets/images/hero.png" alt="Hero Image" class="home-container__image" />
      <div class="wrapper">
        <the-hero />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TheNavigation from "../components/TheNavigation";
import TheHero from "../components/TheHero";

export default {
  name: "home",
  components: { TheNavigation, TheHero },
  data() {
    return {
      showModal: false
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
@import "../assets/styles/_variables.scss";

img {
  width: 100%;
}

.home-container {
  &__modal {
    overflow: hidden;
    filter: blur(20px);
    margin-top: 144px;
  }

  &__image {
    background: lighten(black, 40%);
    width: 100%;
    background-size: cover;
    background-position: center;
  }
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
