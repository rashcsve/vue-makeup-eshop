<template>
  <div id="app">
    <section>
      <transition name="fade" mode="out-in">
        <TheNavigation
          @show-menu="menuIsOpened"
          @show-sidebar="showCartSidebar"
        />
      </transition>
      <div
        class="home__container"
        :class="{
          'home__container--modal': isOpenMenu,
        }"
      >
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
      <TheFooter />
    </section>
    <transition name="fade" mode="out-in">
      <Sidebar
        v-if="isOpenCartSidebar"
        @sidebar-status="showCartSidebar"
        class="the-order-navigation__sidebar the-order-navigation__sidebar--cart"
      />
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TheNavigation from "./components/TheNavigation.vue";
import TheFooter from "./components/TheFooter.vue";
import Sidebar from "./components/Sidebar.vue";

const isOpenMenu = ref(false);
const isOpenCartSidebar = ref(false);

// Methods
function menuIsOpened(value) {
  isOpenMenu.value = value;
}
function showCartSidebar(value) {
  console.log(value);
  isOpenCartSidebar.value = value;
}
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
