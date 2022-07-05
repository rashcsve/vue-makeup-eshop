<template>
  <div class="the-order-transport">
    <h4 class="title title--medium">Shipping Method</h4>
    <div class="the-order__form">
      <!-- TO DO: radio button nebo checkbox -->
      <FormControl
        :options="options"
        :choice="choice"
        :error="error"
        @input="handleFormControl"
      />
    </div>
  </div>
</template>

<script setup>
import FormControl from "./FormControl.vue";

import { ref, defineProps } from "vue";
import { storeToRefs } from "pinia";

import { useFormStore } from "../store/FormStore";
const formStore = useFormStore();

const { transport: getCartTransport } = storeToRefs(formStore);

const props = defineProps({
  error: {
    type: Boolean,
    default: false,
  },
});

const transport = ref({});
const options = ["ppl", "dhl"];
const choice = {
  label: "Choose transport type",
  type: "radio",
  name: "transport",
  required: true,
  placeholder: "Choose transport type...",
};

// Methods
function handleFormControl(selectedValue) {
  transport.value.id = choice.name;
  transport.value.value = selectedValue.value;
  formStore.setTransport(transport);
}
</script>
