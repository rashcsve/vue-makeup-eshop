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

import { ref, defineProps, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

const props = defineProps({
  error: {
    type: Boolean,
    default: false,
  },
});

const transport = ref({});
const requiredFields = ref([]);
const options = ["ppl", "dhl"];
const choice = {
  label: "Choose transport type",
  type: "radio",
  name: "transport",
  required: true,
  placeholder: "Choose transport type...",
};

// import { mapGetters, mapMutations } from "vuex";

// Computed
const getCartTransport = computed(() => store.getters["form/getCartTransport"]);

// Methods
function setTransport() {
  store.dispatch("form/setTransport", transport);
}

function handleFormControl(selectedValue) {
  transport.value.id = choice.name;
  transport.value.value = selectedValue.value;
  setTransport();
}
</script>
