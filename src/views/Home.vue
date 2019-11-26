<template>
  <div class="home">
    <the-navigation @show-modal="modalIsOpened" />
    <div :class="{'home-container':true, 'home-container--modal': showModal}">
      <img src="../assets/images/hero.png" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TheNavigation from "../components/TheNavigation";

export default {
  name: "home",
  components: { TheNavigation },
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

<style scoped>
img {
  width: 100%;
}

.home-container--modal {
  overflow: hidden;
  filter: blur(20px);
  margin-top: 144px;
}
</style>
