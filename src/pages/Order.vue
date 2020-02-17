<template>
<container>
  <div class="the-order__container" id="order">
    <div class="the-order__section">
      <form class="the-order__other" v-if="hasItems">
        <the-order-invoice @next-step="continueToShipping" @error="hasEmptyField" />
        <the-order-transport v-if="isShipping" />
        <div class="the-order__finish-order">
          <!-- TO DO - Add transition -->
          <div v-if="hasError" class="error">
            <p>{{ error }}</p>
          </div>
        </div>
    </form>
    </div>
    <section class="the-order__section">
      <h3 class="title title--h3 the-order__title">Shopping Cart</h3>
      <div v-if="hasItems">
        <the-order-cart />
        <the-order-total  />
        <div class="the-order__trade-terms">
          <form-control :choice="agreementCheckbox" @input="handleCheckbox" />
        </div>
        <Button
          class="the-order__button"
          :disabled="!isTradeTermsAgreed || isEmpty"
          router-link="/"
          @click.native="submitOrder"
          type="button"
          title="Pay for it"
          big
          dark
        />
      </div>
      <p v-else class="the-order__perex">Your cart is empty</p>
    </section>
  </div>
  </container>
</template>

<script>
import TheOrderNavigation from "../components/TheOrderNavigation";
import TheOrderTransport from "../components/TheOrderTransport";
import TheOrderInvoice from "../components/TheOrderInvoice";
import TheOrderTotal from "../components/TheOrderTotal";
import TheOrderCart from "../components/TheOrderCart";
import FormControl from "../components/FormControl";
import Container from '../components/Container';
import Button from "../components/Button";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    TheOrderNavigation,
    TheOrderTransport,
    TheOrderInvoice,
    TheOrderTotal,
    TheOrderCart,
    FormControl,
    Container,
    Button
  },
  data() {
    return {
      allData: false,
      isTradeTermsAgreed: null,
      error: "",
      hasError: false,
      isShipping: false,
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
    }),
    isEmpty() {
      return !this.checkForm() || this.hasError
    }
  },
  watch: {
    hasError() {
      console.log(this.hasError);
    }
  },
  methods: {
    continueToShipping(value) {
      this.isShipping = value
    },
    hasEmptyField(value) {
      this.hasError = value;
    },
    submitOrder() {
      console.log("submitting...");
      this.checkForm()
        ? this.$store.dispatch("submitOrder")
        : console.log("error");
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
        return false  
      } 
      return true
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
  justify-content: space-between;
  flex-wrap: wrap;
  text-align: center;
  background-color: white;
  margin: 32px auto 64px;
  max-width: 1050px;
  
  @media #{$media-laptop} {
    max-width: 100%;
  }

  @media #{$media-max-tablet} {
    margin: 32px 0;
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

.the-order__left {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;

  @media #{$media-min-tablet} {
    min-width: 100%;
  }
}

.the-order__other {
  background-color: #f5f5f5;
  padding: 0 32px 32px;

  @media #{$media-min-tablet} {
    padding: 0 16px 0 16px;
  }
}
.the-order__title {
  margin: 32px 0px;
  font-weight: 600;
}

.the-order__verb {
  @media #{$media-min-tablet} {
    display: none;
  }
}

.the-order__section {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;

  @media #{$media-laptop} {
    max-width: 400px;
  }

  @media #{$media-min-tablet} {
    min-width: 100%;
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

.the-order__perex {
  color: $color-basic;
  text-align: left;
}
</style>
