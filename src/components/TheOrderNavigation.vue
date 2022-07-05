<template>
  <div class="the-order-navigation__container" ref="container" id="container">
    <div
      ref="navigation"
      :class="{
        'the-order-navigation': true,
        'the-order-navigation--fixed': isFixed,
        'the-order-navigation--static': isStatic,
      }"
    >
      <img
        src="../assets/svg/lipstick-white.svg"
        alt="lipstick"
        class="the-order-navigation__icon"
      />
      <transition>
        <div v-show="hasItems" class="the-order-navigation__count">
          {{ getItemsCount }}
        </div>
      </transition>
      <span v-if="hasItems">
        {{ label }}
        <b>{{ getItemsCount }} {{ getItemsCount > 1 ? "items" : "item" }}</b>
        {{ textFor }}
        <b>
          <!-- <animated-integer :value="productsTotal" /> -->
          ${{ getCartTotal }}
        </b>
      </span>
      <div v-else>
        <span>Your cart is empty</span>
      </div>
      <div
        :class="{
          'the-order-navigation__icon-right': true,
          'the-order-navigation__icon-right--open': hasItems,
        }"
      >
        <img
          src="../assets/svg/dropdown_light.svg"
          alt="dropdown"
          class="the-order-navigation__dropdown"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import AnimatedInteger from "./AnimatedInteger.vue";

import { useCartStore } from "../store/CartStore";
const cartStore = useCartStore();

const isFixed = ref(false);
const isStatic = ref(false);
const timer = ref(null);
const showcount = ref(false);
const label = "To order ";
const textFor = " for ";

// Computed
const hasItems = cartStore.hasItems;
const getItemsCount = cartStore.getCartItemsCount;
const getCartTotal = cartStore.getCartTotal;
</script>

<style lang="scss" scoped>
.the-order-navigation {
  width: 544px;
  height: 80px;
  padding: 0 48px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $color-basic;
  color: $color-light;
  transform: translateY(100%);
  transition: transform 0s ease-in;

  &__count {
    font-size: 10px;
    border-radius: 50%;
    color: #202020;
    background-color: white;
    height: 16px;
    width: 16px;
    line-height: 16px;
    text-align: center;
    position: absolute;
    top: 20px;
    left: 70px;
    z-index: 1;
    @media #{$media-phone-L} {
      top: 27px;
      left: 55px;
    }
  }
  &--static {
    transition-duration: 0s;
    transform: translateY(0%);
  }
  &--fixed {
    transition-duration: 0.3s;
    transform: translateY(0%);
    position: fixed;
    bottom: 0;
    margin: auto;
    z-index: 1000;
    cursor: pointer;
    @include create-light-box-shadow;
  }

  &--non-fixed {
    position: relative;
    bottom: 0;
    margin: auto;
  }

  @media #{$media-min-tablet} {
    width: 390px;
    margin: 0;
  }

  @media #{$media-phone-L} {
    width: 390px;
    padding: 0 28px 0 32px;
  }

  @media #{$media-phone-S} {
    width: 390px;
    padding: 0 16px;
  }
}

.the-order-navigation__container {
  display: flex;
  justify-content: center;
  background: inherit;
}

.the-order-navigation__icon {
  width: 32px;
}

.the-order-navigation__icon-right {
  visibility: hidden;

  &--open {
    visibility: visible;
  }
}

.the-order-navigation__info {
  display: flex;
}

.the-order-navigation__dropdown {
  width: 16px;
}
</style>
