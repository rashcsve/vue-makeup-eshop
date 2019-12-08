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
import Button from '../components/Button';
import FormControl from '../components/FormControl';
import { mapState, mapGetters, mapActions } from 'vuex';

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
      itemForStore: { price: 0 },
      selectedChoices: []
    };
  },

  methods: {
    ...mapActions({
      addToCart: 'cart/addItemToCart'
    }),

    checkOptions(choice) {
      if (choice.type === 'select') {
        return this.options;
      } else {
        return choice.options;
      }
    },

    handleFormControl(selectedValue) {
      if (selectedValue.type === 'date-time-picker') {
        this.itemForStore.dateTimeValue = selectedValue.value;
      } else if (selectedValue.type === 'checkbox') {
        this.itemForStore.additionalValue = selectedValue.value;
        this.itemForStore.additionalLabel = selectedValue.label;
        // // Add price only if the value is true
        if (selectedValue.value) {
          this.itemForStore.price += selectedValue.price;
        } else {
          this.itemForStore.price -= selectedValue.price;
        }
      } else if (selectedValue.type === 'select') {
        this.itemForStore.id = selectedValue.id;
        this.itemForStore.price = selectedValue.price;
        this.itemForStore.taxRate = selectedValue.taxRate;
        this.itemForStore.image = selectedValue.image;
        this.itemForStore.label = selectedValue.label;
        this.itemForStore.itemValue = selectedValue.value;
      }

      const isInSelectedValuesArray = this.selectedChoices.some(
        el => el === selectedValue.formId
      );
      if (!isInSelectedValuesArray && selectedValue.required) {
        this.selectedChoices.push(selectedValue.formId);
      }
      this.isAllSelected(selectedValue);
    },
    isAllSelected(selectedValue) {
      let requiredChoices = [];
      this.choices.forEach(ch =>
        ch.required ? requiredChoices.push(ch.name) : ''
      );
      this.allChoicesSelected =
        JSON.stringify(requiredChoices) ===
        JSON.stringify(this.selectedChoices);
    }
  }
};
</script>
