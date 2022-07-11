<template>
  <container>
    <div class="the-order__container" id="order">
      <div class="the-order__section">
        <form class="the-order__other" v-if="hasItems">
          <the-order-invoice
            @next-step="continueToShipping"
            @error="hasEmptyField"
          />
          <the-order-transport v-if="isShipping" />
          <div class="the-order__finish-order">
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
          <the-order-total />
          <div class="the-order__trade-terms">
            <form-control
              :choice="agreementCheckbox"
              @handle="handleCheckbox"
            />
          </div>
          <Button
            class="the-order__button"
            :disabled="!isTradeTermsAgreed || isEmpty"
            router-link="/"
            @submitOrder="submitOrder"
            type="button"
            title="Pay for it"
            big
            dark
          />
        </div>
        <p v-else class="the-order__perex">Your cart is empty</p>
      </section>
      {{ isEmpty }}
    </div>
  </container>
</template>

<script setup>
import TheOrderNavigation from "../components/TheOrderNavigation.vue";
import TheOrderTransport from "../components/TheOrderTransport.vue";
import TheOrderInvoice from "../components/TheOrderInvoice.vue";
import TheOrderTotal from "../components/TheOrderTotal.vue";
import TheOrderCart from "../components/TheOrderCart.vue";
import FormControl from "../components/FormControl.vue";
import Container from "../components/Container.vue";
import Button from "../components/Button.vue";

import { ref, computed } from "vue";
import { storeToRefs } from "pinia";

import { useCartStore } from "../store/CartStore";
import { useFormStore } from "../store/FormStore";
import { useStore } from "../store/MainStore";

const cartStore = useCartStore();
const formStore = useFormStore();
const store = useStore();

const isTradeTermsAgreed = ref(null);
const error = ref(null);
const hasError = ref(false);
const isShipping = ref(false);
const agreementCheckbox = {
  label: "I agree with the terms and conditions",
  type: "checkbox",
  name: "trade-terms",
  id: "trade-terms",
  options: null,
};

const { transport, contact } = storeToRefs(formStore);

// Computed
const hasItems = cartStore.hasItems;
const isEmpty = computed(() => isFormEmpty() || hasError.value);

// Methods
function continueToShipping(value) {
  isShipping.value = value;
}
function hasEmptyField(value) {
  console.log(value);
  hasError.value = value;
}
function submitOrder() {
  console.log("submitting...");
  checkForm() ? store.submitOrder() : console.log("error");
}
function handleCheckbox(checkboxValue) {
  isTradeTermsAgreed.value = checkboxValue.value;
  isFormEmpty();
}
function isFormEmpty() {
  if (isEmptyObject(transport) || isEmptyObject(contact)) {
    error.value = "These fields are required!";
    return true;
  }
  return false;
}
function isEmptyObject(obj) {
  return Object.entries(obj).length === 0;
}
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
