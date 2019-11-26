<template>
  <div class="product-description">
    <!-- <vue-form-control
      v-for="(choice, index) in currentProduct.choices"
      :key="index"
      :id="currentProduct.id"
      :type="choice.type"
      :name="choice.name"
      :label="choice.label"
      :placeholder="choice.placeholder ? choice.placeholder : null"
      :options="choice.options ? choice.options : null"
      :modifier="choice.modifier ? choice.modifier : null"
      @input="handleFormControl"
    /> -->

    <Button
      @click="addToCart"
      title="Add To Cart"
      :disabled="!allChoicesSelected"
      medium
      dark
    />

    <div class="product-description__perex">
      <div
        ref="textContainer"
        :class="{
          'product-description__text': true,
          'product-description__text--collapsed': textCollapsed
        }"
        v-html="product.description"
      ></div>
      <Button
        v-if="showMoreButton"
        :title="textCollapsed ? 'More' : 'Less'"
        @click.native="handleTextCollapsing()"
        more
        :close="textCollapsed"
      />
      <!-- To Do: Add Button -->
      <!-- <vue-button
        v-if="showMoreButton"
        :title="textCollapsed ? 'Více' : 'Méně'"
        :modifier="'-more' + (textCollapsed ? ' ' : ' -close')"
        @click.native="handleTextCollapsing()"
      /> -->
    </div>
  </div>
</template>

<script>
import Button from '../components/Button';

export default {
  components: {
    Button
  },
  props: {
    product: {
      type: Object,
      default: null
    },
    medium: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      store: this.$store,
      currentProduct: this.product,
      selectedValuesFromChoices: {},
      allChoicesSelected: false,
      textCollapsed: true,
      showMoreButton: false
    };
  },

  created() {
    this.currentProduct.choices.forEach(choice => {
      this.selectedValuesFromChoices[choice.name] =
        choice.type === 'checkbox' ? false : null;
    });
  },

  mounted() {
    if (this.currentProduct.choices.length === 0) {
      this.allChoicesSelected = true;
    }
    this.handleOverflow();
  },

  methods: {
    addToCart() {
      this.currentProduct.selectedValuesFromChoices = this.selectedValuesFromChoices;
      this.store.commit('addProduct', this.currentProduct);
    },
    handleFormControl(selectedValue) {
      this.selectedValuesFromChoices[selectedValue.name] = selectedValue.value;
      if (this.currentProduct.extraPrice !== undefined) {
        this.currentProduct.extraPrice += selectedValue.extraPrice;
      } else {
        this.currentProduct.extraPrice = selectedValue.extraPrice;
      }

      //Check if all choices are selected
      var values = Object.values(this.selectedValuesFromChoices);
      var isAll = values.every(function(value) {
        if (value === null) return false;
        if (typeof value === 'object')
          return value.start !== null && value.end !== null;
        return true;
      });
      if (isAll) {
        this.allChoicesSelected = true;
      }
    },
    handleTextCollapsing: function() {
      this.textCollapsed = !this.textCollapsed;
    },
    handleOverflow: function() {
      //Compute if description text overflows and set if more button shoulde be shown
      var textContainer = this.$refs.textContainer;
      if (textContainer.scrollHeight > textContainer.clientHeight) {
        this.showMoreButton = true;
      }
    }
  }
};
</script>

<style lang="scss">
@import '../assets/styles/_variables';

.product-description__perex {
  width: auto;
  padding: 32px 0 16px 0;
  line-height: 24px;

  @media #{$media-max-tablet} {
    padding-right: 16px;
  }
}

.product-description__perex > .button__wrapper {
  margin: 16px 0;
}

.product-description__text {
  overflow: initial;
  max-height: 100%;
}

.product-description__text--collapsed {
  max-height: 261px;
  overflow: hidden;
}
</style>
