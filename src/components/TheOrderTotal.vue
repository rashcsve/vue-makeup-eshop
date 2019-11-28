<template>
  <div class="order__total" v-if="hasProducts">
    <div class="order__taxes">
      <div class="order__tax">
        <label class="order__tax-title">Cena bez DPH</label>
        <label class="order__tax-price">
          <!-- <vue-animated-integer :value="productsTotalWithoutTax" /> Kč -->
          {{ productsTotalWithoutTax }} $
        </label>
      </div>
      <div
        class="order__tax"
        v-for="(taxPrice, taxRate) in productsTotalTax"
        :key="taxRate"
      >
        <label class="order__tax-title">DPH {{ taxRate }}%</label>
        <label class="order__tax-price">
          <!-- <vue-animated-integer :value="taxPrice" /> Kč -->
          {{ taxPrice }} $
        </label>
      </div>
      <div class="order__tax -total">
        <label class="order__tax-title">Celkem</label>
        <label class="order__tax-price">
          <!-- <vue-animated-integer :value="productsTotal" /> Kč -->
          {{ productsTotal }} $
        </label>
      </div>
    </div>
    <div class="order__trade-terms">
      <form-control
        label="Souhlasím s Obchodními podmínkami"
        name="trade-terms"
        type="checkbox"
        v-model="isTradeTermsAgreed"
      />
    </div>
    <div class="order__finish-order">
      <button
        :disabled="
          isTradeTermsAgreed ? isTradeTermsAgreed.value === false : true
        "
        @click="submitOrder"
        type="button"
        class="button -big -dark"
      >
        <span class="button__title">
          Objednat a zaplatit
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import Button from './Button';
import FormControl from './FormControl';

export default {
  components: {
    FormControl,
    Button
  },
  data() {
    return {
      store: this.$store,
      isTradeTermsAgreed: null
    };
  },

  created() {
    this.update();
  },

  watch: {
    isTradeTermsAgreed(newValue, oldValue) {
      this.update(newValue, oldValue);
    }
  },

  computed: {
    productsTotal() {
      return this.store.getters.productsTotal;
    },

    productsTotalTax() {
      return this.store.getters.productsTotalTax;
    },

    productsTotalWithoutTax() {
      return this.store.getters.productsTotalWithoutTax;
    },

    hasProducts() {
      return this.store.getters.products.length !== 0;
    }
  },

  methods: {
    submitOrder() {
      this.store.dispatch('submitOrder');
      window.Modal.open('order-completed-modal');
    },

    update(n, o) {
      this.store.commit('setOrderTotal', {
        tradeTermsAgreed: this.isTradeTermsAgreed
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.order__total {
  margin-bottom: 80px;
}

.order__trade-terms {
  display: flex;
  align-items: baseline;

  &.-icon {
    font-size: xx-small;
  }
}

.order__tax {
  display: flex;
  flex-wrap: wrap;
  padding: 8px 0;

  &:last-child {
    padding-bottom: 0;
  }

  &::before {
    content: '';
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
