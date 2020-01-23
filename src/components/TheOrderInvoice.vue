<template>
  <form class="order__invoice">
    <h4 class="title title--medium">Contact information</h4>
    <div class="order__form">
      <form-control
        v-for="(choice, index) in form"
        :key="index"
        :choice="choice"
        @input="handleInput"
        @validated="(error) => {choice.error = error}"
      />
    </div>
    <form-control :key="companyCheckbox.index" :choice="companyCheckbox" @input="handleCheckbox" />
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
    <!-- <Button
      class="the-order__button"
      :disabled="!isFormValid()"
      @click.native="continueToShipping"
      type="button"
      title="Continue to shipping"
      big
      dark
    /> -->
  </form>
</template>

<script>
import FormControl from "./FormControl";
import Button from "./Button";
import SlideUpDown from "vue-slide-up-down";
import validator from 'validator'

import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  components: {
    Button, 
    FormControl,
    SlideUpDown
  },
  props: {
    error: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if(this.getCartInvoice) {
      Object.keys(this.getCartInvoice).forEach(field => {
        Object.keys(this.form).forEach(input => {
          let inputComponent = this.form[input]
          if(inputComponent)
          console.log(inputComponent)
        })
      })
    }
  },
  data() {
    return {
      orderInvoice: {},
      isCompany: false,
      allData: false,
      form: [
        {
          label: "name",
          type: "text",
          name: "name",
          placeholder: "Name",
          error: null,
          validator: (v) => {
            if (validator.isEmpty(v)) {
              throw new Error("Cannot be empty")
            }
            if(!validator.isAlpha(v)) {
              throw new Error("Can contain only letters")
            }
          }
        },
        {
          label: "email",
          type: "text",
          name: "email",
          placeholder: "Email",
          error: null,
          validator: (v) => {
            if (validator.isEmpty(v)) {
              throw new Error("Cannot be empty")
            }
            if(!validator.isEmail(v)) {
              throw new Error("Not email format")
            }
          }
        },
        {
          label: "phone",
          type: "text",
          name: "phone",
          placeholder: "Phone",
          error: null,
          validator: (v) => {
            if (validator.isEmpty(v)) {
              throw new Error("Cannot be empty")
            }
          }
        },
        {
          label: "street",
          type: "text",
          name: "street",
          placeholder: "Street",
          error: null,
          validator: (v) => {
            if (validator.isEmpty(v)) {
              throw new Error("Cannot be empty")
            }
          }
        },
        {
          label: "city",
          type: "text",
          name: "city",
          placeholder: "City",
          error: null,
          validator: (v) => {
            if (validator.isEmpty(v)) {
              throw new Error("Cannot be empty")
            }
          }
        },
        {
          label: "postcode",
          type: "text",
          name: "postcode",
          placeholder: "Postcode",
          error: null,
          validator: (v) => {
            if (validator.isEmpty(v)) {
              throw new Error("Cannot be empty")
            }
          }
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
  computed: {
    hasError() {
      return this.invoiceError;
    },
    ...mapGetters({
      getCartContact: "form/getCartContact"
    })
  },
  methods: {
    ...mapMutations({
      addContact: "form/setContact"
    }),
    handleCheckbox(inputValue) {
      this.isCompany = inputValue;
    },
    isFormValid() { 
      try {
        Object.keys(this.form).forEach(input => {
          const inputComponent = this.form[input]
          if (inputComponent.error) {
            throw new Error(inputComponent.error)
          }
          console.log("error")
          console.log(inputComponent)
        })
      } catch (e) {
        this.errorMessage = e
        return false
      }
      return true
    },
    continueToShipping() {
      if (this.isFormValid()) {
        this.addContact(this.orderInvoice);
      }
    },
    handleInput(inputValue) {
      console.log("ordinvoice")
      console.log(inputValue)
      this.orderInvoice[inputValue.label] = inputValue.value;
      
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
