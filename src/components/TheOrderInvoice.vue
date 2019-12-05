<template>
  <div class="order__invoice">
    <h4 class="title title--medium">Delivery information</h4>
    <div class="order__form">
      <form-control label="Name" type="text" name="fullname" placeholder="Name" v-model="fullName" />
      <form-control label="Street" type="text" name="street" placeholder="Street" v-model="street" />
      <form-control label="City" type="text" name="city" placeholder="City" v-model="city" />
      <form-control
        label="Postcode"
        type="text"
        name="postcode"
        placeholder="Postcode"
        v-model="postcode"
      />
      <form-control label="Phone" type="text" name="phone" placeholder="Phone" v-model="phone" />
      <form-control label="E-mail" type="text" name="email" placeholder="E-mail" v-model="email" />
      <form-control
        label="Corporate Information"
        name="company"
        type="checkbox"
        v-model="isCompany"
      />
      <slide-up-down
        :active="isCompany.value"
        :duration="500"
        :class="{'order__business':true, 'order__business--active': isCompany.value === true}"
      >
        <form-control
          label="Company name"
          type="text"
          name="comapny-name"
          placeholder="Company name"
          v-model="companyName"
        />
        <form-control
          label="Street"
          type="text"
          name="company-street"
          placeholder="Street"
          v-model="companyStreet"
        />
        <form-control
          label="City"
          type="text"
          name="company-city"
          placeholder="City"
          v-model="companyCity"
        />
        <form-control
          label="Postcode"
          type="text"
          name="company-postcode"
          placeholder="Postcode"
          v-model="companyPostcode"
        />
        <form-control
          label="Identification number"
          type="text"
          name="in"
          placeholder="Identification number"
          v-model="identificationNumber"
        />
        <form-control
          label="VAT"
          type="text"
          name="tin"
          placeholder="VAT"
          v-model="taxIdentificationNumber"
        />
      </slide-up-down>
    </div>
  </div>
</template>

<script>
import FormControl from "./FormControl";
import SlideUpDown from "vue-slide-up-down";

export default {
  components: {
    FormControl,
    SlideUpDown
  },
  data: function() {
    return {
      fullName: null,
      street: null,
      city: null,
      postcode: null,
      phone: null,
      email: null,
      isCompany: false,
      companyName: null,
      companyStreet: null,
      companyCity: null,
      companyPostcode: null,
      identificationNumber: null,
      taxIdentificationNumber: null
    };
  },

  created() {
    this.functionUpdate();
  },

  watch: {
    fullName: function(n, o) {
      this.functionUpdate(n, o);
    },
    street: function(n, o) {
      this.functionUpdate(n, o);
    },
    city: function(n, o) {
      this.functionUpdate(n, o);
    },
    postcode: function(n, o) {
      this.functionUpdate(n, o);
    },
    phone: function(n, o) {
      this.functionUpdate(n, o);
    },
    email: function(n, o) {
      this.functionUpdate(n, o);
    },
    isCompany: function(n, o) {
      this.functionUpdate(n, o);
    },
    companyName: function(n, o) {
      this.functionUpdate(n, o);
    },
    companyStreet: function(n, o) {
      this.functionUpdate(n, o);
    },
    companyCity: function(n, o) {
      this.functionUpdate(n, o);
    },
    companyPostcode: function(n, o) {
      this.functionUpdate(n, o);
    },
    identificationNumber(n, o) {
      this.functionUpdate(n, o);
    },
    taxIdentificationNumber(n, o) {
      this.functionUpdate(n, o);
    }
  },

  methods: {
    functionUpdate(newValue, oldValue) {
      this.$store.commit("updateInvoice", {
        fullName: this.fullName,
        street: this.street,
        city: this.city,
        postcode: this.postcode,
        phone: this.phone,
        email: this.email,
        isCompany: this.isCompany,
        companyName: this.companyName,
        companyStreet: this.companyStreet,
        companyCity: this.companyCity,
        companyPostcode: this.companyPostcode,
        identificationNumber: this.identificationNumber,
        taxIdentificationNumber: this.taxIdentificationNumber
      });
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
