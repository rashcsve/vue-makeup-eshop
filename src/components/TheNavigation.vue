<template>
  <nav :class="{ 'the-navigation': true, 'the-navigation--open': isOpenMenu }">
    <div class="the-navigation__main">
      <div class="the-navigation__first">
        <div
          @click="toggleMenu"
          class="the-navigation__menu the-navigation__hover"
          :class="{
            'the-navigation__menu--open': isOpenMenu,
          }"
        >
          <div
            v-if="!isOpenMenu"
            class="the-navigation__link the-navigation__link--menu"
          >
            Menu
          </div>
          <div v-else class="the-navigation__link the-navigation__link--close">
            Close
          </div>
        </div>
        <router-link class="the-navigation__logo" to="/">
          <h3 class="title title--h1">cosmetics</h3>
        </router-link>
        <div
          @click="openSidebar"
          class="the-navigation__basket the-navigation__hover"
        >
          <div class="the-navigation__link the-navigation__link--cart">
            Cart
          </div>
          <transition>
            <div
              :style="{ visibility: hasItems ? 'visible' : 'hidden' }"
              class="the-navigation__count"
            >
              <AnimatedInteger :value="getItemsCount" />
            </div>
          </transition>
        </div>
      </div>
      <div class="the-navigation__products">
        <router-link
          v-for="link in links"
          :to="link.to"
          :key="link.name"
          class="the-navigation__hover the-navigation__link the-navigation__link--center"
        >
          {{ link.name }}
        </router-link>
      </div>
    </div>
    <div class="the-navigation__other" v-if="isOpenMenu">
      <div class="the-navigation__items">
        <ul class="the-navigation__ul">
          <li
            class="the-navigation__li"
            v-for="link in menuLinks"
            :key="link.name"
          >
            <router-link
              class="the-navigation__li-link"
              :to="link.to"
              @click="toggleMenu"
            >
              {{ link.name }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="the-navigation__information">
        <div class="the-navigation__information-social">
          <SocialLink name="instagram" link="https://www.instagram.com/" />
          <SocialLink name="facebook" link="https://www.facebook.com/" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

import SocialLink from "./SocialLink.vue";
import AnimatedInteger from "./AnimatedInteger.vue";

const emit = defineEmits(["showMenu", "showSidebar"]);
const store = useStore();

// Data
const isOpenMenu = ref(false);
const links = [
  { name: "Face", to: "/face" },
  { name: "All", to: "/products" },
  { name: "Lips", to: "/lips" },
];
const menuLinks = [
  { name: "About", to: "/about" },
  { name: "All", to: "/products" },
];

// Computed
const hasItems = computed(() => store.getters["cart/hasItems"]);
const getItemsCount = computed(() => store.getters["cart/getCartItemsCount"]);
console.log(getItemsCount.value);

// Methods
function toggleMenu() {
  isOpenMenu.value = !isOpenMenu.value;
  emit("showMenu", isOpenMenu.value);
}

function openSidebar() {
  emit("showSidebar", true);
}
</script>

<style lang="scss" scoped>
.the-navigation {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 100%;

  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.3s ease;
    background-color: rgba(255, 255, 255, 0.8);
  }

  &--open {
    position: fixed;
    min-height: 100vh;
    max-height: 100vh;
    overflow: scroll;
    top: 0;
    left: 0;
    &:before {
      opacity: 1;
    }
  }
}

.the-navigation__first {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  @media screen and (min-width: 1441px) {
    width: 1440px;
    margin: 0 auto;
  }
}

.the-navigation__main {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 96px;
  padding: 35px 65px 0;

  @media #{$media-max-tablet} {
    padding: 16px 32px 0;
  }
  @media screen and (min-width: 768px) {
    min-height: $navigation-height;
  }
}

.the-navigation__li-link {
  color: $color-basic;
  text-decoration: none;

  &:hover {
    color: $color-basic;
  }
}

.the-navigation__link {
  color: $color-basic;
  text-decoration: none;
  height: 32px;
  width: 48px;
  font-weight: 300;
  line-height: 19px;
  padding: 8px 0 5px 0;
  text-align: right;

  &--cart {
    text-align: left;
    margin-right: -16px;
  }

  &--center {
    text-align: center;
  }

  @media #{$media-min-tablet} {
    display: none;
  }
}

.the-navigation__menu {
  display: flex;
  cursor: pointer;
  @media screen and (min-width: 769px) {
    padding-right: 10px;
    padding-left: 5px;
  }
  &:hover {
    background-color: $color-basic;
    .the-navigation__link {
      color: $color-light;
    }
  }

  &::before {
    content: "";
    background: url("../assets/svg/menu.svg") no-repeat;
    background-size: 16px;
    background-position: center;
    left: 0;
    top: 0;
    height: 32px;
    width: 32px;
    display: inline-block;
  }
  &:hover::before {
    background-image: url("../assets/svg/menu_hover.svg");
  }

  &--open {
    &::before {
      background-image: url("../assets/svg/close.svg");
    }
    &:hover::before {
      background-image: url("../assets/svg/close_hover.svg");
    }
  }
}

.the-navigation__logo {
  // width: 170px;
  // height: 78px;
  align-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  &-img {
    width: 100%;
    height: auto;
  }

  @media #{$media-max-tablet} {
    text-align: center;
    margin: 0;
  }
  @media screen and (max-width: 600px) {
    width: 138px;
    height: 60px;
  }
}

.the-navigation__hover {
  &:hover {
    background-color: $color-basic;
    .the-navigation__link,
    .the-navigation__count,
    &.the-navigation__link {
      color: $color-light;
    }
  }
}

.the-navigation__basket {
  position: relative;
  display: flex;
  cursor: pointer;
  // width: 102px;
  @media screen and (min-width: 769px) {
    padding-left: 10px;
    padding-right: 14px;
  }
  &::after {
    content: "";
    position: relative;
    background: url("../assets/svg/lipstick.svg") no-repeat center/ 80%;
    left: 0;
    top: 0;
    height: 30px;
    width: 30px;
    display: inline-block;
  }
  &:hover::after {
    background-image: url("../assets/svg/lipstick-white.svg");
  }
  &--count {
    font-size: 10px;
    border-radius: 50%;
    background-color: #202020;
    color: white;
    height: 17px;
    width: 17px;
    line-height: 17px;
    text-align: center;
    position: absolute;
    top: 2px;
    right: -3px;
    z-index: 1;
  }
  &:hover .the-navigation__basket--count {
    color: #202020;
    background-color: white;
  }
}

.the-navigation__products {
  display: flex;
  justify-content: center;
  padding: 8px 0;
}

.the-navigation__other {
  text-align: center;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 0;

  @media screen and (max-height: 480px) {
    flex-direction: column;
    margin-bottom: 0;
  }
}

.the-navigation__li {
  font-size: 45px;
  font-weight: 600;
  line-height: 64px;

  @media screen and (max-height: 480px) {
    font-size: 32px;
    line-height: 40px;
  }
}

.the-navigation__information {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 60px 65px 80px;
  width: 100%;
  position: absolute;
  bottom: 0;
  line-height: 24px;
  box-sizing: border-box;

  @media #{$media-max-tablet} {
    justify-content: center;
  }

  @media screen and (max-height: 475px) {
    position: relative;
  }

  @media screen and (min-width: 1441px) {
    width: 1440px;
    margin: 0 auto;
  }

  @media screen and (max-height: 480px) {
    padding: 64px 85px 32px 91px;
  }
}

.the-navigation__information-social {
  display: flex;
}

.the-navigation__count {
  position: relative;
  right: -35px;
  color: $color-basic;
  font-size: 12px;
  width: 8px;
}
</style>
