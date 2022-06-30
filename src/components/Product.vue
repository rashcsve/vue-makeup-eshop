<template>
  <loading v-if="loading" />
  <div v-else class="product">
    <!-- <product-gallery :images="info.images" :master-image="info.images[0].src" /> -->
    <img :src="product.api_featured_image" class="product__image" />
    <div class="product__info">
      <h3 class="title title--h1">{{ product.name }}</h3>
      <p class="product__perex">{{ product.brand }}</p>
      <div class="product__price">${{ product.price }}</div>
      <form-control
        :choice="choice"
        :options="colors"
        @handle="handleFormControl"
      />
      <Button
        @addToCart="addToCart(product)"
        title="Add To Cart"
        :disabled="!isSelected"
        medium
        dark
      />
      <div class="product__perex">
        <div class="product__perex-text" v-html="product.description"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductGallery from "../components/ProductGallery";
import FormControl from "../components/FormControl";
import Loading from "../components/Loading";
import Button from "../components/Button";

import { mapActions } from "vuex";

import MakeupService from "../services/api/MakeupService";

export default {
  components: {
    ProductGallery,
    FormControl,
    Loading,
    Button,
  },
  data() {
    return {
      product: null,
      colors: [],
      loading: false,
      isSelected: false,
      choice: {
        label: "Color: ",
        type: "select",
        name: "product",
        required: true,
        placeholder: "Choose color...",
      },
    };
  },
  methods: {
    ...mapActions({
      addToCart: "cart/addItemToCart",
    }),
    handleFormControl(selectedValue) {
      if (selectedValue) {
        this.product.value = selectedValue;
        this.isSelected = true;
      }
    },
  },
  async created() {
    try {
      this.loading = true;
      const response = await MakeupService.getProduct(this.$route.params.id);
      this.product = response.data;
      const colors = response.data.product_colors;
      colors.forEach((color) => {
        let newColor = { value: color.colour_name, ...color };
        this.colors.push(newColor);
      });
      this.loading = false;
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 55px 0 100px;

  @media #{$media-max-tablet} {
    flex-direction: column;
    margin: 48px 0 32px;
  }
}
.product__image {
  max-width: 600px;
}
.product__info {
  width: 40%;
  padding: 32px 24px 32px 48px;
  text-align: left;

  @media #{$media-max-tablet} {
    width: auto;
    padding: 32px 16px;
  }
}

.product__price {
  padding: 24px 0;
  font-size: 32px;

  @media #{$media-max-tablet} {
    font-size: 30px;
  }

  &--with-tax {
    padding: 4px 0;
  }

  &--without-tax {
    padding: 4px 0;
    font-size: 12px;
    font-weight: 100;
  }
}

.product-order__perex {
  width: auto;
  padding: 32px 0 16px 0;
  line-height: 24px;

  @media #{$media-max-tablet} {
    padding-right: 16px;
  }
}

.product__perex > .button__wrapper {
  margin: 16px 0;
}

.product__perex-text {
  overflow: initial;
  max-height: 100%;
  margin: 16px 0;

  &--collapsed {
    max-height: 260px;
    overflow: hidden;
  }
}
</style>
