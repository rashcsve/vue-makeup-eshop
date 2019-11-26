<template>
  <div class="product-gallery">
    <carousel
      ref="carousel"
      class="product-gallery__photo"
      :navigation-enabled="true"
      :paginationEnabled="false"
      :per-page="1"
      :autoplay="true"
      :autoplay-timeout="4000"
      :loop="true"
      :speed="900"
      :spacePadding="0"
      @pageChange="handleChange"
    >
      <slide
        class="product-gallery__master-slide"
        v-for="(image, index) in images"
        :key="index"
      >
        <div class="product-gallery__master-photo">
          <img
            :src="require(`@/assets/${image.src}`)"
            alt="Master Photo Giraffe"
            class="product-gallery__image"
          />
        </div>
      </slide>
    </carousel>

    <carousel
      ref="navigation"
      class="product-gallery__carousel"
      :navigation-enabled="false"
      :per-page-custom="[
        [0, 4.35],
        [568, 8]
      ]"
      :autoplay="false"
      :loop="false"
      :speed="900"
      :space-padding="0"
      :scrollPerPage="false"
      :paginationEnabled="false"
      @pageChange="handleChange"
    >
      <slide
        :class="{
          'product-gallery__slide': true,
          'product-gallery__slide--active': index === active
        }"
        class="product-gallery__slide"
        v-for="(image, index) in images"
        :key="index"
      >
        <img
          :src="require(`@/assets/${image.src}`)"
          @click="changeSlideTo(index)"
          class="product-gallery__slide-img"
          alt="Giraffe Photo"
        />
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
export default {
  components: {
    Carousel,
    Slide
  },
  props: {
    images: Array,
    masterImage: String
  },
  data: function() {
    return {
      active: 0
    };
  },
  methods: {
    changeSlideTo(index) {
      this.$refs.carousel.goToPage(index);
      this.$refs.navigation.goToPage(index);
    },
    handleChange(index) {
      this.$refs.navigation.goToPage(index);
      this.active = index;
    }
  }
};
</script>

<style lang="scss">
@import '../assets/styles/_variables';

.product-gallery {
  width: 60%;
  @media #{$media-max-tablet} {
    width: 100%;
    height: 50%;
  }
}

.product-gallery__master-photo {
  background-color: $color-light;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;
  position: relative;
  border: 1px solid #eee;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.product-gallery__image {
  position: absolute;
  width: auto;
  height: 100%;
  max-width: initial;
}

.product-gallery__icon {
  position: absolute;
  bottom: 24px;
  right: 24px;
  height: 17px;
  width: 17px;
  img {
    width: 100%;
    height: 100%;
  }
}

.product-gallery__carousel {
  max-width: 100%;
  height: auto;
  margin-top: 8px;
  @media screen and (min-width: 1024px) {
    flex-direction: row-reverse;
  }
}

.product-gallery__photo {
  .VueCarousel-navigation-next,
  .VueCarousel-navigation-prev {
    background-size: 10px;
    width: 20px;
  }
  .VueCarousel-navigation-prev {
  }
}

.product-gallery__slide {
  cursor: pointer;
  margin: 8px;
  box-sizing: border-box;
  height: 64px;
  width: 64px;
  min-width: 64px;
  max-width: 64px;
  overflow: hidden;
  border: 2px solid transparent;
  display: flex;
  justify-content: center;

  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }

  &--active,
  &:hover {
    border-color: $color-basic;
    .product-gallery__slide-img {
    }
  }
}

.product-gallery__slide-img {
  max-width: initial;
  height: 100%;
  width: auto;
}

.product-gallery__img {
  width: 20px;
  height: 20px;
}

.product-gallery .VueCarousel-navigation-next,
.product-gallery .VueCarousel-navigation-prev {
  margin: 0 1em;
  transform: translateX(0) translateY(-50%) scale(2) !important;
  &:focus {
    outline: 0 !important;
  }
}

.VueCarousel-navigation-next,
.VueCarousel-navigation-prev {
  margin: 0 1em;
  transform: translateX(0) translateY(-50%) scale(2) !important;
  color: transparent !important;
  background: url('../assets/svg/arrowleft.svg') no-repeat center / 13px;
  &:focus {
    outline: 0 !important;
  }
}
.VueCarousel-navigation-prev {
  background-image: url('../assets/svg/arrowright.svg');
}

.product-gallery .VueCarousel-navigation {
  &--disabled {
    display: none !important;
  }
}

.vue-lb-container {
  background-color: rgba(32, 32, 32, 0.9);
  display: flex;
  flex-direction: column;
}

.vue-lb-info {
  font-size: 12px;
  padding: 16px 0;
  line-height: 16px;
  font-family: 'alliance_no.1';
  height: auto;
  bottom: auto;
  width: 90%;
  right: 0;
  background-color: transparent;
  text-align: left;
  @media #{$media-phone-M} {
    width: 85%;
  }
}

.vue-lb-footer {
  padding: 16px 0;
  max-width: 48px;
  display: inherit;
}

.vue-lb-footer-count {
  font-family: 'alliance_no.1';
  padding-left: 0;
  color: $color-light;
}

.vue-lb-thumbnail-wrapper {
  overflow: scroll;
  position: initial;
  margin-top: 16px;
  height: auto;
  overflow: hidden;

  @media #{$media-min-tablet} {
    display: none;
  }
}

.vue-lb-thumbnail {
  bottom: auto;
}

.vue-lb-content {
  margin-bottom: 0;
}

img.vue-lb-modal-image {
  max-height: 60vh;
}

.vue-lb-button-close {
  position: fixed;
  top: 10px;
  right: 40px;

  &::before {
    content: '';
    background: url('/svg/close_light.svg') no-repeat;
    background-size: 32px;
    background-position: center;
    left: 0;
    top: 0;
    height: 32px;
    width: 32px;
    display: inline-block;

    @media #{$media-min-tablet} {
      display: none;
    }
  }

  svg {
    display: none;
  }
}

.vue-lb-arrow {
  width: auto;
}

.vue-lb-thumbnail-arrow {
  height: auto;
}

.vue-lb-modal-thumbnail,
.vue-lb-modal-thumbnail-active {
  margin: 0 8px;
  border-radius: 1px;
}

.vue-lb-right {
  &::before {
    content: '';
    background: url('/svg/right-chevron_white.svg') no-repeat;
    background-size: 20px;
    background-position: center;
    left: 0;
    top: 0;
    height: 32px;
    width: 32px;
    display: inline-block;
  }

  svg {
    display: none;
  }
}

.vue-lb-left {
  &::before {
    content: '';
    background: url('/svg/left-chevron_white.svg') no-repeat;
    background-size: 20px;
    background-position: center;
    left: 0;
    top: 0;
    height: 32px;
    width: 32px;
    display: inline-block;
  }

  svg {
    display: none;
  }
}

.vue-lb-thumbnail-right {
  &::before {
    content: '';
    background: url('/svg/right-chevron_white.svg') no-repeat;
    background-size: 12px;
    background-position: center;
    left: 0;
    top: 0;
    height: 30px;
    width: 20px;
    display: inline-block;
  }

  svg {
    display: none;
  }
}

.vue-lb-thumbnail-left {
  &::before {
    content: '';
    background: url('/svg/left-chevron_white.svg') no-repeat;
    background-size: 12px;
    background-position: center;
    left: 0;
    top: 0;
    height: 30px;
    width: 20px;
    display: inline-block;
  }

  svg {
    display: none;
  }
}
</style>
