<template>
  <div class="the-order__container" id="order">
    <div class="the-order__main">
      <h3 class="title title--h1">Your Order</h3>
      <form class="the-order__other" v-if="hasItems">
        <the-order-transport />
        <the-order-invoice />
        <div class="the-order__finish-order">
          <!-- TO DO - Add transition -->
          <div v-if="hasError" class="error">
            <p>{{ error }}</p>
          </div>
        </div>
    </form>
    </div>
    <div class="the-order__right">
      <the-order-cart />
      <the-order-total />
      <div class="the-order__trade-terms">
        <form-control :choice="agreementCheckbox" @input="handleCheckbox" />
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
</template>

<script>
import TheOrderNavigation from "../components/TheOrderNavigation";
import TheOrderTransport from "../components/TheOrderTransport";
import TheOrderInvoice from "../components/TheOrderInvoice";
import TheOrderTotal from "../components/TheOrderTotal";
import TheOrderCart from "../components/TheOrderCart";
import FormControl from "../components/FormControl";
import Button from "../components/Button";

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
      allData: false,
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
      getCartTransport: "form/getCartTransport",
      getCartInvoice: "form/getCartContact"
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
        ? this.$store.dispatch("submitOrder")
        : console.log("sosi");
    },
    handleCheckbox(checkboxValue) {
      this.isTradeTermsAgreed = checkboxValue.value;
    },
    checkForm() {
      console.log("zalupa")
      if (
        this.isEmptyObject(this.getCartTransport) ||
        this.isEmptyObject(this.getCartInvoice)
      ) {
        this.error = "These fields are required!";
        return false
      } 
      return true
      console.log(this.error)
    },
    isEmptyObject(obj) {
      console.log(obj)
      console.log(obj.constructor === Object)
      console.log(Object.entries(obj).length === 0)
      return Object.entries(obj).length === 0 && obj.constructor === Object;
    }
  }
};
</script>

<style lang="scss" scoped>
.the-order__container {
  display: flex;
  // flex-direction: column;
  justify-content: center;
  text-align: center;
  background-color: white;
  margin: auto;
  // width: 100%;

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
  display: flex;
  flex-direction: column;
  max-width: 544px;
  width: 100%;

  @media #{$media-min-tablet} {
    min-width: 100%;
  }
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
