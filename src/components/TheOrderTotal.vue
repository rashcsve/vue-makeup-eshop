<template>
  <div class="order__total">
    <div class="order__taxes">
      <div class="order__tax">
        <label class="order__tax-title">To be paid without VAT</label>
        <label class="order__tax-price">
          <animated-integer :value="getCartTotalWithoutTax" />$
        </label>
      </div>
      <div class="order__tax" v-for="(taxPrice, taxRate) in getCartTaxes" :key="taxRate">
        <label class="order__tax-title">VAT {{ taxRate }}%</label>
        <label class="order__tax-price">
          <animated-integer :value="taxPrice" />$
        </label>
      </div>
      <div class="order__tax -total">
        <label class="order__tax-title">Subtotal</label>
        <label class="order__tax-price">
          <animated-integer :value="getCartTotal" />$
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import FormControl from "./FormControl";
import AnimatedInteger from "./AnimatedInteger";

import { mapGetters } from "vuex";

export default {
  components: { AnimatedInteger, FormControl },
  computed: {
    ...mapGetters({
      getCartTotal: "cart/getCartTotal",
      getCartTaxes: "cart/getCartTaxes",
      getCartTotalWithoutTax: "cart/getCartTotalWithoutTax"
    })
  }
};
</script>

<style lang="scss" scoped>
.order__tax {
  display: flex;
  flex-wrap: wrap;
  padding: 8px 0;

  &:last-child {
    padding-bottom: 0;
  }

  &::before {
    content: "";
    height: auto;
    border-bottom: 1px dashed $color-basic;
    flex-grow: 1;
    order: 2;
    margin: 0 8px 4px 8px;
  }

  &.-total {
    font-size: 32px;
    font-weight: 600;
    @media #{$media-min-tablet} {
      &::before {
        display: none;
      }
    }
  }

  @media #{$media-min-tablet} {
    justify-content: space-between;
    &::before {
      flex: 0 0 100%;
      order: 3;
      margin: 8px 0;
    }
  }
}

.order__taxes {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 0 16px;
}

.order__tax-price {
  order: 3;
  @media #{$media-min-tablet} {
    order: 2;
  }
}

.order__tax-title {
  order: 1;
}
.trade-terms-slide-enter-active {
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
}

.trade-terms-slide-leave-active {
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
}

.trade-terms-slide-enter-to,
.trade-terms-slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.trade-terms-slide-enter,
.trade-terms-slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>
