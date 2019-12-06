<template>
  <div class="product-order">
    <FormControl
      v-for="(choice, index) in currentProduct.choices"
      :key="index"
      :id="currentProduct.id"
      :type="choice.type"
      :name="choice.name"
      :label="choice.label"
      :placeholder="choice.placeholder ? choice.placeholder : null"
      :product="product.product"
      :options="choice.options ? choice.options : null"
      @input="handleFormControl"
    />
    <Button
      @click.native="addToCart"
      title="Add To Cart"
      :disabled="!allChoicesSelected"
      medium
      dark
    />
  </div>
</template>

<script>
import Button from "../components/Button";
import FormControl from "../components/FormControl";

export default {
  components: {
    Button,
    FormControl
  },
  props: {
    product: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      currentProduct: this.product,
      selectedValuesFromChoices: {},
      allChoicesSelected: false
    };
  },

  created() {
    this.currentProduct.choices.forEach(choice => {
      this.selectedValuesFromChoices[choice.name] =
        choice.type === "checkbox" ? false : null;
    });
  },

  mounted() {
    if (this.currentProduct.choices.length === 0) {
      this.allChoicesSelected = true;
    }
  },

  methods: {
    addToCart() {
      console.log("Adding...");
      this.currentProduct.selectedValuesFromChoices = this.selectedValuesFromChoices;

      // To Do: how to use those ...mapActions things???
      this.$store.commit("addProduct", this.currentProduct);
    },
    handleFormControl(selectedValue) {
      this.selectedValuesFromChoices[selectedValue.name] = selectedValue.value;
      this.currentProduct.extraPrice = selectedValue.extraPrice;

      // Check if all choices are selected
      const values = Object.values(this.selectedValuesFromChoices);
      let isAll = values.every(value => {
        if (value === null) return false;
        if (typeof value === "object")
          // To Do: Validation for disabed dates ?
          return value.start !== null && value.end !== null;
        return true;
      });
      if (isAll) {
        this.allChoicesSelected = true;
      }
    }
  }
};
</script>
