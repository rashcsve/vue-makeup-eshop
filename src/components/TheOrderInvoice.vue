<template>
  <form class="order__invoice">
    <h4 class="title title--medium">Contact information</h4>
    <div class="order__form">
      <FormControl
        v-for="(choice, index) in form"
        :key="index"
        :choice="choice"
        @input="handleInput"
        @validated="
          (error) => {
            choice.error = error;
          }
        "
      />
    </div>
    <FormControl
      :key="companyCheckbox.index"
      :choice="companyCheckbox"
      @input="handleCheckbox"
    />
    <FormControl
      v-for="(choice, index) in companyChoices"
      :key="index"
      :choice="choice"
      @input="handleInput"
    />
  </form>
</template>

<script setup>
import FormControl from "./FormControl.vue";
import validator from "validator";

import { ref, defineEmits } from "vue";

import { useFormStore } from "../store/FormStore";
const formStore = useFormStore();

const emit = defineEmits("error", "nextStep");

const orderInvoice = ref({});
const isCompany = ref(false);
const form = ref([
  {
    label: "name",
    value: "",
    type: "text",
    name: "name",
    placeholder: "Name",
    error: null,
    validator: (v) => {
      if (validator.isEmpty(v)) {
        throw new Error("Cannot be empty");
      }
    },
  },
  {
    label: "email",
    type: "text",
    name: "email",
    placeholder: "Email",
    error: null,
    validator: (v) => {
      if (validator.isEmpty(v)) {
        throw new Error("Cannot be empty");
      }
      if (!validator.isEmail(v)) {
        throw new Error("Not email format");
      }
    },
  },
  {
    label: "phone",
    type: "text",
    name: "phone",
    placeholder: "Phone",
    error: null,
    validator: (v) => {
      if (validator.isEmpty(v)) {
        throw new Error("Cannot be empty");
      }
    },
  },
  {
    label: "street",
    type: "text",
    name: "street",
    placeholder: "Street",
    error: null,
    validator: (v) => {
      if (validator.isEmpty(v)) {
        throw new Error("Cannot be empty");
      }
    },
  },
  {
    label: "city",
    type: "text",
    name: "city",
    placeholder: "City",
    error: null,
    validator: (v) => {
      if (validator.isEmpty(v)) {
        throw new Error("Cannot be empty");
      }
    },
  },
  {
    label: "postcode",
    type: "text",
    name: "postcode",
    placeholder: "Postcode",
    error: null,
    validator: (v) => {
      if (validator.isEmpty(v)) {
        throw new Error("Cannot be empty");
      }
    },
  },
]);

const companyCheckbox = {
  label: "Corporate Information",
  type: "checkbox",
  name: "company",
  id: "company",
  options: null,
};

const companyChoices = [
  {
    label: "companyName",
    type: "text",
    name: "companyName",
    placeholder: "Company Name",
  },
  {
    label: "companyStreet",
    type: "text",
    name: "companyStreet",
    placeholder: "Company Street",
  },
  {
    label: "companyCity",
    type: "text",
    name: "companyCity",
    placeholder: "Company City",
  },
  {
    label: "companyPostcode",
    type: "text",
    name: "companyPostcode",
    placeholder: "Company Postcode",
  },
  {
    label: "identificationNumber",
    type: "text",
    name: "identificationNumber",
    placeholder: "Identification Number",
  },
  {
    label: "taxIdentificationNumber",
    type: "text",
    name: "taxIdentificationNumber",
    placeholder: "Tax Identification Number",
  },
];

function handleCheckbox(inputValue) {
  isCompany.value = inputValue;
}
function isFormValid() {
  // TODO Make computed
  try {
    form.forEach((input) => {
      if (input.error) {
        emit("error", true);
        return false;
      }
    });
  } catch (e) {
    console.log(e);
    return false;
  }
  t;
  return true;
}
function handleInput(inputValue) {
  orderInvoice[inputValue.label] = inputValue.value;
  formStore.setContact(orderInvoice);
  if (isFormValid()) {
    emit("error", false);
    emit("nextStep", true);
  }
}
</script>

<style lang="scss" scoped>
.company-slide-enter-active {
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
}

.company-slide-leave-active {
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
}

.company-slide-enter-to,
.company-slide-leave {
  max-height: 500px;
  overflow: hidden;
}

.company-slide-enter,
.company-slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>
