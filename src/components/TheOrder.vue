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
      <the-order-transport :error="hasError" />
      <the-order-invoice :error="hasError" />
      <the-order-total />
      <div class="the-order__trade-terms">
        <form-control :choice="agreementCheckbox" @input="handleCheckbox" />
      </div>
      <div class="the-order__finish-order">
        <!-- TO DO - Add transition -->
        <div v-if="hasError" class="error">
          <p>{{ error }}</p>
        </div>
        <Button
          class="the-order__button"
          :disabled="!isTradeTermsAgreed"
          @click.native="submitOrder"
          type="button"
          title="Pay for it"
          big
          dark
        />
      </div>
    </div>
  </div>
</template>

<script>
import TheOrderNavigation from "./TheOrderNavigation";
import TheOrderTransport from "./TheOrderTransport";
import TheOrderInvoice from "./TheOrderInvoice";
import TheOrderTotal from "./TheOrderTotal";
import TheOrderCart from "./TheOrderCart";
import FormControl from "./FormControl";
import Button from "./Button";

import { mapGetters } from "vuex";

export default {
  components: {
    TheOrderNavigation,
    TheOrderTransport,
    TheOrderInvoice,
    TheOrderTotal,
    TheOrderCart,
    FormControl,
    Button
  },
  data() {
    return {
      isTradeTermsAgreed: null,
      error: "",
      hasError: false,
      agreementCheckbox: {
        label: "I agree with the terms and conditions",
        type: "checkbox",
        name: "trade-terms",
        id: "trade-terms",
        options: null
      }
    };
  },
  computed: {
    ...mapGetters({
      hasItems: "cart/hasItems",
      getCartTransport: "cart/getCartTransport",
      getCartInvoice: "cart/getCartInvoice"
    })
  },
  watch: {
    hasError() {
      console.log("watching");
      console.log(this.hasError);
    }
  },
  methods: {
    submitOrder() {
      console.log("submitting...");
      this.checkForm()
        ? this.$store.dispatch("cart/submitOrder")
        : console.log("sosi");
    },
    handleCheckbox(checkboxValue) {
      this.isTradeTermsAgreed = checkboxValue.value;
    },
    checkForm() {
      if (
        this.isEmptyObject(this.getCartTransport) ||
        this.isEmptyObject(this.getCartInvoice)
      ) {
        this.error = "These fields are required!";
        this.hasError = true;
      } else this.hasError = false;
    },
    isEmptyObject(obj) {
      return Object.entries(obj).length === 0 && obj.constructor === Object;
    }
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
  flex-direction: column;
  justify-content: center;
}

.the-order__main {
  width: 100%;
}

.the-order__other {
  background-color: #f5f5f5;
  padding: 0 32px 80px;

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

.the-order__trade-terms {
  display: flex;
  align-items: baseline;
}

.the-order__finish-order {
  display: flex;
  justify-content: center;
}

.the-order__button {
  display: flex;
  justify-content: center;  
}
</style>
