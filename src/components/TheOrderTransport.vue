<template>
  <div class="the-order-transport">
    <h4 class="title title--medium">Shipping Method</h4>
    <div class="the-order__form">
      <!-- TO DO: radio button nebo checkbox -->
      <form-control
        :options="options"
        :choice="choice"
        :error="error"
        @input="handleFormControl"
      />
    </div>
  </div>
</template>

<script>
import FormControl from "./FormControl";

import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    FormControl
  },
  props: {
    error: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      transport: {},
      requiredFields: [],
      options: ['ppl', 'dhl'],
      choice: {
        label: "Choose transport type",
        type: "radio",
        name: "transport",
        required: true,
        placeholder: "Choose transport type..."
      }
    };
  },
  computed: {
    ...mapGetters({
      getCartTransport: "form/getCartTransport"
    })
  },
  methods: {
    ...mapMutations({
      setTransport: "form/setTransport"
    }),
    handleFormControl(selectedValue) {
      this.transport.id = this.choice.name;
      this.transport.value = selectedValue.value;
      this.setTransport(this.transport);
    }
  }
};
</script>
