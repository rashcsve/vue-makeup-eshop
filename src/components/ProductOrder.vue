<template>
  <div class="product-order">
    <FormControl
      v-for="(choice, index) in choices"
      :key="index"
      :choice="choice"
      :options="checkOptions(choice)"
      @input="handleFormControl"
    />
    <Button
      @click.native="addToCart(cartItem)"
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
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: {
    Button,
    FormControl
  },
  props: {
    choices: {
      type: Array,
      default: null
    },
    options: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      allChoicesSelected: false,
      cartItems: []
    };
  },

  methods: {
    ...mapActions({
      addToCart: "cart/addItemToCart"
    }),

    checkOptions(choice) {
      if (choice.type === "select") {
        return this.options;
      } else {
        return choice.options;
      }
    },

    handleFormControl(selectedValue) {
      const alreadyExistsIndex = this.cartItems.findIndex(
        item => item.formId === selectedValue.formId
      );
      if (alreadyExistsIndex > -1) {
        this.cartItems[alreadyExistsIndex] = selectedValue;
      } else {
        this.cartItems.push(selectedValue);
      }

      // Check if all choices are selected
      let choicesIds = [];
      this.choices.forEach(v => {
        choicesIds.push(v.name);
      });
      let itemsIds = [];
      this.cartItems.forEach(v => {
        itemsIds.push(v.formId);
      });
      JSON.stringify(choicesIds) === JSON.stringify(itemsIds)
        ? (this.allChoicesSelected = true)
        : (this.allChoicesSelected = false);
    }
  }
};
</script>
