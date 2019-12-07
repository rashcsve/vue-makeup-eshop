<template>
  <div class="product-order">
    <form-control
      v-for="(choice, index) in choices"
      :key="index"
      :choice="choice"
      :options="checkOptions(choice)"
      @input="handleFormControl"
    />
    <Button
      @click.native="addToCart(itemForStore)"
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
      allChoicesSelected: true,
      cartItem: [],
      itemForStore: {}
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
      if (selectedValue.type === "date-time-picker") {
        this.itemForStore.dateTimeValue = selectedValue.value;
      } else if (selectedValue.type === "checkbox") {
        this.itemForStore.additionalValue = selectedValue.value;
        if (selectedValue.extraPrice) {
          if (this.itemForStore.price === undefined)
            this.itemForStore.price = 0;
          // Add price only if the value is true
          if (selectedValue.value) {
            this.itemForStore.price += selectedValue.extraPrice;
          } else {
            this.itemForStore.price -= selectedValue.extraPrice;
          }
        }
        this.itemForStore.additionalLabel = selectedValue.label;
      } else if (selectedValue.type === "select") {
        this.itemForStore.id = selectedValue.id;
        this.itemForStore.price = selectedValue.price;
        if (selectedValue.extraPrice) {
          if (selectedValue.value) {
            this.itemForStore.price += selectedValue.extraPrice;
          }
        }
        this.itemForStore.id = selectedValue.id;
        this.itemForStore.taxRate = selectedValue.taxRate;
        this.itemForStore.image = selectedValue.image;
        this.itemForStore.label = selectedValue.label;
      }

      const alreadyExistsIndex = this.cartItem.findIndex(
        item => item.formId === selectedValue.formId
      );
      // if exists in array
      if (alreadyExistsIndex > -1) {
        this.cartItem[alreadyExistsIndex] = selectedValue;
      } else {
        this.cartItem.push(selectedValue);
      }

      // TO DO - Add validation
      // Check if all choices are selected
      // let choicesIds = [];
      // this.choices.forEach(v => {
      //   choicesIds.push(v.name);
      // });
      // let itemsIds = [];
      // this.cartItem.forEach(v => {
      //   itemsIds.push(v.formId);
      // });
      // JSON.stringify(choicesIds) === JSON.stringify(itemsIds)
      //   ? (this.allChoicesSelected = true)
      //   : (this.allChoicesSelected = false);
      // console.log("cartItem");
      // console.log(this.cartItem);
    }
  }
};
</script>
