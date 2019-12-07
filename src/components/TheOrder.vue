<template>
  <div class="the-order__container" id="order">
    <div class="the-order__main">
      <div class="the-order__title">
        <h3 class="title title--h1">Your Order</h3>
      </div>
      <the-order-navigation />
    </div>
    <div class="the-order__other" v-if="hasItems">
      <the-order-cart />
      <the-order-transport />
      <the-order-invoice />
      <the-order-total />
    </div>
  </div>
</template>

<script>
import TheOrderNavigation from "./TheOrderNavigation";
import TheOrderTransport from "./TheOrderTransport";
import TheOrderInvoice from "./TheOrderInvoice";
import TheOrderTotal from "./TheOrderTotal";
import TheOrderCart from "./TheOrderCart";

import { mapGetters } from "vuex";

export default {
  components: {
    TheOrderNavigation,
    TheOrderTransport,
    TheOrderInvoice,
    TheOrderTotal,
    TheOrderCart
  },
  computed: {
    ...mapGetters({ hasItems: "cart/hasItems" })
  }
};
</script>

<style lang="scss" scoped>
.the-order__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background-color: white;
  margin: auto;
  max-width: 544px;

  @media #{$media-min-tablet} {
    min-width: 100%;
    margin: 0;
  }
}

.the-order__form {
  padding: 0 16px;
}

.the-order__business {
  &--active {
    padding-bottom: 20px;
  }
}

.the-order__finish-order {
  display: flex;
  justify-content: center;
}

.the-order__main {
  width: 100%;
}

.the-order__other {
  background-color: #f5f5f5;
  padding: 0 32px 0;

  @media #{$media-min-tablet} {
    padding: 0 16px 0 16px;
  }
}
.the-order__title {
  display: flex;
  justify-content: center;
  padding-bottom: 32px;
}

.the-order__verb {
  @media #{$media-min-tablet} {
    display: none;
  }
}
</style>
