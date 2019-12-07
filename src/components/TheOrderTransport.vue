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
    </div>
  </div>
</template>

<script>
import FormControl from "./FormControl";

import { mapActions } from "vuex";

export default {
  components: {
    FormControl
  },
  data() {
    return {
      transport: {},
      choice: {
        label: "Choose transport type",
        type: "select",
        name: "transport",
        placeholder: "Choose transport type..."
      }
    };
  },
  methods: {
    ...mapActions({
      addTransportToCart: "cart/addTransportToCart"
    }),
    handleFormControl(selectedValue) {
      this.transport.id = this.choice.name;
      this.transport.value = selectedValue.value;
      this.transport.label = selectedValue.label;
      this.addTransportToCart(this.transport)
    }
  }
};
</script>
