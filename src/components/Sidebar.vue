<template>
  <section class="sidebar__wrapper">
    <section class="sidebar__backdrop" @click="closeSidebar" />
    <aside class="sidebar">
      <nav class="sidebar__nav">
        <h5 class="title title--h3">Shopping Cart</h5>
        <div v-show="hasItems" class="the-order-navigation__count">{{ getItemsCount }}</div>
      </nav>
      <!-- To Do: Add Divider -->
      <section class="sidebar__items">
        <div class="sidebar__item" v-for="(item, index) in getItems" :key="index">
          <img :src="item" alt="" />
          <div class="sidebar__item-info">
            <p>{{item.name}}</p>
            <p>{{item.brand}}</p>
            <p>{{item.value}}</p>
            <!-- To Do: increment -->
            <p>{{item.price}}$</p>
            <!-- To Do: delete item -->
          </div>
        </div>
      <!-- To Do: Add Divider -->
      </section>
      <footer class="sidebar__footer">
        <div class="sidebar__subtotal">
          <h3 class="title title--h3">Subtotal:</h3>
          <p>{{getCartTotal}}$</p>
        </div>
        <Button title="View Bag" router-link="/order" dark />
      </footer>
    </aside>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import Button from "../components/Button";

  export default {
    components: {
      Button
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
  background-color: rgba(19, 15, 64, .4);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
}
.sidebar {
  overflow-y: auto;
    background-color: white;
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    z-index: 999;
    padding: 3rem 20px 2rem 20px;
    width: 500px
}
</style>