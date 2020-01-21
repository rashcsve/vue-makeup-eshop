<template>
  <div class="order__invoice">
    <h4 class="title title--medium">Delivery information</h4>
    <div class="order__form">
      <form-control
        v-for="(choice, index) in choices"
        :key="index"
        :choice="choice"
        :error="error"
        @input="handleInput"
      />
      <form-control :key="companyCheckbox.index" :choice="companyCheckbox" @input="handleInput" />
      <slide-up-down
        :active="isCompany"
        :duration="300"
        :class="{'order__business':true, 'order__business--active': isCompany}"
      >
        <form-control
          v-for="(choice, index) in companyChoices"
          :key="index"
          :choice="choice"
          @input="handleInput"
        />
      </slide-up-down>
    </div>
  </div>
</template>

<script>
import FormControl from "./FormControl";
import SlideUpDown from "vue-slide-up-down";

import { mapActions } from "vuex";

export default {
  components: {
    FormControl,
    SlideUpDown
  },
  props: {
    error: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    error() {
      this.invoiceError = this.error
      console.log("watching in invoice")
      console.log(this.error)
    }
  },
  data() {
    return {
      orderInvoice: {},
      isCompany: false,
      requiredFields: [],
      choices: [
        {
          label: "name",
          type: "text",
          name: "name",
          placeholder: "Name",
          required: true
        },
        {
          label: "street",
          type: "text",
          name: "street",
          placeholder: "Street",
          required: true
        },
        {
          label: "city",
          type: "text",
          name: "city",
          placeholder: "City",
          required: true
        },
        {
          label: "postcode",
          type: "text",
          name: "postcode",
          placeholder: "Postcode",
          required: true
        },
        {
          label: "phone",
          type: "text",
          name: "phone",
          placeholder: "Phone",
          required: true
        },
        {
          label: "email",
          type: "text",
          name: "email",
          placeholder: "Email",
          required: true
        }
      ],
      companyCheckbox: {
        label: "Corporate Information",
        type: "checkbox",
        name: "company",
        id: "company",
        options: null
      },
      companyChoices: [
        {
          label: "companyName",
          type: "text",
          name: "companyName",
          placeholder: "Company Name"
        },
        {
          label: "companyStreet",
          type: "text",
          name: "companyStreet",
          placeholder: "Company Street"
        },
        {
          label: "companyCity",
          type: "text",
          name: "companyCity",
          placeholder: "Company City"
        },
        {
          label: "companyPostcode",
          type: "text",
          name: "companyPostcode",
          placeholder: "Company Postcode"
        },
        {
          label: "identificationNumber",
          type: "text",
          name: "identificationNumber",
          placeholder: "Identification Number"
        },
        {
          label: "taxIdentificationNumber",
          type: "text",
          name: "taxIdentificationNumber",
          placeholder: "Tax Identification Number"
        }
      ]
    };
  },
  mounted() {
    this.choices.forEach(ch =>
      ch.required ? this.requiredFields.push(ch.name) : ""
    );
  },
  computed: {
    hasError() {
      return this.invoiceError;
    }
  },
  methods: {
    ...mapActions({
      addInvoiceToCart: "cart/addInvoiceToCart"
    }),
    handleInput(inputValue) {
      if (inputValue.type === "checkbox") {
        this.isCompany = inputValue.value;
      } else {
        this.orderInvoice[inputValue.label] = inputValue.value;
        if (
          this.requiredFields.includes(inputValue.formId) &&
          inputValue.required &&
          !inputValue.value
        ) {
          console.log("neni");
          this.invoiceError = true;
        }
        // console.log(JSON.stringify(this.orderInvoice))
        // console.log(JSON.stringify(this.requiredFields))
        // if(this.requiredFields.includes(inputValue.formId))
        if (inputValue.value) this.addInvoiceToCart(this.orderInvoice);
      }
    }
  }
};
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
