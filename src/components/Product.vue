<template>
  <Loading v-if="loading" />
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

<script setup>
import ProductGallery from "../components/ProductGallery.vue";
import FormControl from "../components/FormControl.vue";
import Loading from "../components/Loading.vue";
import Button from "../components/Button.vue";

import MakeupService from "../services/api/MakeupService";

import { ref, onMounted } from "vue";
import { useCartStore } from "../store/CartStore";
import { useRoute } from "vue-router";

const cartStore = useCartStore();
const route = useRoute();

const product = ref({});
const colors = ref([]);
const loading = ref(false);
const isSelected = ref(false);
const choice = {
  label: "Color: ",
  type: "select",
  name: "product",
  required: true,
  placeholder: "Choose color...",
};

const addToCart = (product) => cartStore.addItemToCart(product);

function handleFormControl(selectedValue) {
  if (selectedValue) {
    product.value.value = selectedValue;
    isSelected.value = true;
  }
}

onMounted(async () => {
  try {
    loading.value = true;
    const response = await MakeupService.getProduct(route.params.id);
    product.value = response.data;
    const allColors = response.data.product_colors;
    allColors.forEach((color) => {
      let newColor = { value: color.colour_name, ...color };
      colors.value.push(newColor);
    });
    loading.value = false;
  } catch (e) {
    console.log(e);
    loading.value = false;
  }
});
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
  @media #{$media-max-tablet} {
    max-width: 300px;
    margin: auto;
  }
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
