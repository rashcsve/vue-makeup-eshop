<template>
  <div class="product">
    <product-gallery
      :images="product.images"
      :master-image="product.images[0].src"
    />
    <div class="product__info">
      <h3 class="title title--h1">{{ product.title }}</h3>
      <div class="product__price">
        {{ product.subtitle }} {{ product.currency }}
      </div>
      <product-order :product="product" />
      <div class="product__perex">
        <div
          ref="textContainer"
          :class="{
            'product__perex-text': true,
            'product__perex-text--collapsed': textCollapsed
          }"
          v-html="product.description"
        ></div>
        <Button
          v-if="showMoreButton"
          :title="textCollapsed ? 'More' : 'Less'"
          @click.native="handleTextCollapsing()"
          more
          :close="!textCollapsed"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductGallery from '../components/ProductGallery';
import ProductOrder from '../components/ProductOrder';
import Button from '../components/Button';

export default {
  components: {
    ProductGallery,
    ProductOrder,
    Button
  },
  props: {
    product: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      textCollapsed: true,
      showMoreButton: false,
      isCollapsed: false
    };
  },
  mounted() {
    this.handleOverflow();
  },
  methods: {
    handleTextCollapsing() {
      this.textCollapsed = !this.textCollapsed;
    },
    handleOverflow() {
      let textContainer = this.$refs.textContainer;
      if (textContainer.scrollHeight > textContainer.clientHeight) {
        this.showMoreButton = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  width: 100%;
  height: 100%;
  margin: 55px 0 100px;

  @media #{$media-max-tablet} {
    flex-direction: column;
    margin: 48px 0 32px;
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
