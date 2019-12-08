<template>
  <div class="the-order-transport">
    <h4 class="title title--medium">Transport</h4>
    <div class="the-order__form">
      <form-control
        :options="[
          { label: 'PPL', value: 'ppl' },
          { label: 'DHL', value: 'dhl' }
        ]"
        :choice="choice"
        @input="handleFormControl"
      />
      <slide-up-down
        :active="hasError"
        :duration="200"
        :class="{ order__business: true, 'order__business--active': hasError }"
      >
        <p>{{ error }}</p>
      </slide-up-down>
    </div>
  </div>
</template>

<script>
import FormControl from './FormControl';
import SlideUpDown from 'vue-slide-up-down';

import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    FormControl,
    SlideUpDown
  },
  data() {
    return {
      transport: {},
      error: 'This field is required',
      choice: {
        label: 'Choose transport type',
        type: 'select',
        name: 'transport',
        required: true,
        placeholder: 'Choose transport type...'
      }
    };
  },
  computed: {
    ...mapGetters({
      getCartTransport: 'cart/getCartTransport'
    }),
    hasError() {
      return Object.entries(this.getCartTransport).length === 0 && this.getCartTransport.constructor === Object
    }
  },
  methods: {
    ...mapActions({
      addTransportToCart: 'cart/addTransportToCart'
    }),
    handleFormControl(selectedValue) {
      this.transport.id = this.choice.name;
      this.transport.value = selectedValue.value;
      this.transport.label = selectedValue.label;
      // if (this.choice.required && selectedValue.value === '') {
      //   this.hasError = true;
      // }
      this.addTransportToCart(this.transport);
    }
  }
};
</script>
