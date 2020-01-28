<template>
  <section class="sidebar__wrapper">
    <section class="sidebar__backdrop" @click="closeSidebar" />
    <aside class="sidebar">
      <nav class="sidebar__nav" @click="closeSidebar">
        <div class="sidebar__icon"></div>
        <h3 class="title title--h3 sidebar__title">Shopping Cart</h3>
        <div v-if="hasItems" class="sidebar__perex">{{ getItemsCount }} {{ getItemsCount > 1 ? "items" : "item" }}</div>
      </nav>
      <!-- To Do: Add Divider -->
      <section class="sidebar__items">
        <the-order-cart v-if="hasItems"/>
        <p v-else class="sidebar__perex">Your bag is empty.</p>
      <!-- To Do: Add Divider -->
      </section>
      <footer class="sidebar__footer">
        <div class="sidebar__subtotal">
          <h3 class="title title--h3 sidebar__title">Subtotal:</h3>
          <p class="sidebar__perex">${{ getCartTotal }}</p>
        </div>
        <Button title="View Bag" :router-link="hasItems ? '/order' : '#'"  :disabled="!hasItems" wide dark @click.native="closeSidebar" />
      </footer>
    </aside>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import Button from "../components/Button";
import TheOrderCart from "../components/TheOrderCart";

  export default {
    components: {
      Button,
      TheOrderCart
    },
    computed: {
      ...mapGetters({
        hasItems: "cart/hasItems",
        getItemsCount: "cart/getCartItemsCount",
        getItems: "cart/getCartItems",
        getCartTotal: "cart/getCartTotal"
      })
    },
    methods: {
      closeSidebar() {
        this.$emit('sidebar-status', false)
      }
    }
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