<template>
  <div class="the-order-transport">
    <h4 class="title title--medium">Shipping Method</h4>
    <div class="the-order__form">
      <FormControl
        :options="options"
        :choice="choice"
        :error="error"
        @handle="handleFormControl"
      />
    </div>
  </div>
</template>

<script setup>
import FormControl from "./FormControl.vue";

import { defineProps } from "vue";

import { useFormStore } from "../store/FormStore";
const formStore = useFormStore();

const props = defineProps({
  error: {
    type: Boolean,
    default: false,
  },
});

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
  const transport = {
    id: choice.name,
    value: selectedValue.value,
  };
  formStore.setTransport(transport);
}
</script>
