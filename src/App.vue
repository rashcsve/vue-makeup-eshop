<template>
  <div id="app">
    <section>
      <transition name="fade" mode="out-in">
        <the-navigation
          @show-modal="modalIsOpened"
          @show-sidebar="showCartSidebar"
        />
      </transition>
      <div
        :class="{ home__container: true, 'home__container--modal': showModal }"
      >
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component"
          /></transition>
        </router-view>
      </div>
      <the-footer />
    </section>
    <transition name="fade" mode="out-in">
      <Sidebar
        v-if="isCartSidebarOpen"
        @sidebar-status="showCartSidebar"
        class="the-order-navigation__sidebar the-order-navigation__sidebar--cart"
      />
    </transition>
  </div>
</template>

<script>
import TheNavigation from "./components/TheNavigation";
import TheFooter from "./components/TheFooter";
import Sidebar from "./components/Sidebar";

export default {
  components: {
    TheNavigation,
    TheFooter,
    Sidebar,
  },
  data() {
    return {
      showModal: false,
      isCartSidebarOpen: false,
    };
  },
  methods: {
    modalIsOpened(value) {
      this.showModal = value;
    },
    showCartSidebar(value) {
      this.isCartSidebarOpen = value;
    },
  },
};
</script>

<style lang="scss">
.home__container {
  &--modal {
    overflow: hidden;
    filter: blur(20px);
    margin-top: 144px;
  }
}

.home__image {
  background: lighten($color-basic, 40%);
  width: 100%;
  background-size: cover;
  background-position: center;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.5s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
