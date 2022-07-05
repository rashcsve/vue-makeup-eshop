<template>
  <section class="sidebar__wrapper">
    <section class="sidebar__backdrop" @click="closeSidebar" />
    <aside class="sidebar">
      <nav class="sidebar__nav" @click="closeSidebar">
        <div class="sidebar__icon"></div>
        <h3 class="title title--h3 sidebar__title">Shopping Cart</h3>
        <div v-if="hasItems" class="sidebar__perex">
          {{ getItemsCount }} {{ getItemsCount > 1 ? "items" : "item" }}
        </div>
      </nav>
      <section class="sidebar__items">
        <TheOrderCart v-if="hasItems" />
        <p v-else class="sidebar__perex">Your bag is empty.</p>
      </section>
      <footer class="sidebar__footer">
        <div class="sidebar__subtotal">
          <h3 class="title title--h3 sidebar__title">Subtotal:</h3>
          <AnimatedInteger
            :value="+getCartTotal"
            float
            class="sidebar__perex"
          />
        </div>
        <Button
          title="View Bag"
          :router-link="hasItems ? '/order' : '#'"
          :disabled="!hasItems"
          wide
          dark
          @closeSidebar="closeSidebar"
        />
      </footer>
    </aside>
  </section>
</template>

<script setup>
import { defineEmits } from "vue";
import { useCartStore } from "../store/CartStore";

import Button from "../components/Button.vue";
import TheOrderCart from "../components/TheOrderCart.vue";
import AnimatedInteger from "./AnimatedInteger.vue";

const emit = defineEmits(["sidebarStatus"]);

const cartStore = useCartStore();

// Computed
const hasItems = cartStore.hasItems;
const getItemsCount = cartStore.getCartItemsCount;
const getItems = cartStore.getCartItems;
const getCartTotal = cartStore.getCartTotal;

// Methods
function closeSidebar() {
  emit("sidebarStatus", false);
}
</script>

<style lang="scss" scoped>
.sidebar__backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  cursor: pointer;
}
.sidebar {
  overflow-y: auto;
  background-color: $color-light;
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  z-index: 999;
  padding: 60px 32px 32px;
  width: 500px;
  display: flex;
  flex-direction: column;

  @media #{$media-min-tablet} {
    width: 100%;
    padding: 60px 16px 32px;
  }
}
.sidebar__title {
  margin: 0;
  font-weight: 600;
  flex: 1;
}
.sidebar__nav {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 16px;
}
.sidebar__icon {
  background: url("../assets/svg/close_basket.svg") no-repeat right;
  left: 0;
  top: 0;
  height: 16px;
  width: 16px;
  background-size: contain;
  margin-right: 20px;
}
.sidebar__subtotal {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px 0;
}
.sidebar__perex {
  color: $color-basic;
}
.sidebar__items {
  flex: 1;
  overflow: scroll;
  margin-top: 16px;
}
</style>
