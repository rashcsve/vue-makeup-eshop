<template>
  <div class="the-order-navigation__container" ref="container" id="container">
    <div
      ref="navigation"
      :class="{
        'the-order-navigation': true,
        'the-order-navigation--fixed': isFixed,
        'the-order-navigation--static': isStatic
      }"
      data-role="order-handler"
      @click="scrollToOrder"
    >
      <img
        src="../assets/svg/giraffe-white.svg"
        alt="giraffe"
        class="the-order-navigation__icon"
      />
      <transition>
        <div
          v-show="this.productsCount > 0"
          class="the-order-navigation__count"
        >
          {{ productsCount }}
        </div>
      </transition>
      <div v-if="productsCount != 0">
        <span class="order__verb">To order</span>
        <strong>
          {{ productsCount }}
          {{ productsCount > 1 ? 'items' : 'item' }}
        </strong>
        <span>for</span>
        <strong>
          <!-- <animated-integer :value="productsTotal" /> -->
          {{ productsCount + currency }}
        </strong>
      </div>
      <div v-else>
        <span>Your cart is empty</span>
      </div>

      <div v-if="productsCount != 0">
        <img
          src="../assets/svg/dropdown_light.svg"
          alt="dropdown"
          class="the-order-navigation__dropdown"
        />
      </div>
      <div v-else></div>
    </div>
  </div>
</template>

<script>
import AnimatedInteger from './AnimatedInteger';
import ScrollTo from 'vue-scrollto';

export default {
  components: {
    AnimatedInteger
  },
  data: function() {
    return {
      store: this.$store,
      // currency: this.$root.$options.config.currency,
      currency: '$',
      isFixed: false,
      isStatic: false,
      timer: null,
      showcount: false
    };
  },

  mounted() {
    let component = this;

    window.addEventListener('scroll', this.handleChange);
    window.addEventListener('resize', this.handleChange);

    this.handleChange();
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleChange);
    window.removeEventListener('resize', this.handleChange);
  },

  computed: {
    productsCount() {
      return this.store.getters.productsCount;
    },

    productsTotal() {
      return this.store.getters.productsTotal;
    }
  },

  watch: {
    productsCount(newCount, oldCount) {
      this.checkFixedAttribute();
    }
  },

  methods: {
    handleChange() {
      this.checkFixedAttribute();
      // if (this.timer !== null) clearTimeout(this.timer)
      // this.timer = setTimeout(this.checkFixedAttribute, 0)
    },
    checkFixedAttribute() {
      var navigationHeight = this.$refs.navigation.getBoundingClientRect()
        .height;
      var currentViewportBottomLine = window.scrollY + window.innerHeight;
      var containerFromTop =
        this.$refs.container.getBoundingClientRect().top +
        window.scrollY +
        navigationHeight;

      if (containerFromTop - currentViewportBottomLine < 0) {
        this.isStatic = true;
        if (this.isFixed !== false && this.productsCount !== 0) {
          this.isFixed = false;
        }
      } else {
        this.isStatic = false;
        if (this.isFixed !== true && this.productsCount !== 0) {
          this.isFixed = true;
        }
      }
    },

    scrollToOrder() {
      ScrollTo.scrollTo('#order');
    }
  }
};
</script>

<style lang="scss" scoped>
.the-order-navigation {
  width: 544px;
  height: 80px;
  padding: 0 48px;
  margin: auto;
  // background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $color-basic;
  color: $color-light;
  transform: translateY(100%);
  transition: transform 0s ease-in;

  &__count {
    font-size: 10px;
    border-radius: 50%;
    color: #202020;
    background-color: white;
    height: 16px;
    width: 16px;
    line-height: 16px;
    text-align: center;
    position: absolute;
    top: 20px;
    left: 70px;
    z-index: 1;
    @media #{$media-phone-L} {
      top: 27px;
      left: 55px;
    }
  }
  &--static {
    transition-duration: 0s;
    transform: translateY(0%);
  }
  &--fixed {
    transition-duration: 0.3s;
    transform: translateY(0%);
    position: fixed;
    bottom: 0;
    margin: auto;
    z-index: 1000;
    cursor: pointer;

    // .create-light-box-shadow();
    // &:hover {
    //   color: $color-basic;
    //   background-color: $color-light;
    //   .the-order-navigation__-count {
    //     background-color: #202020;
    //     color: white;
    //   }
    // }
  }

  &--non-fixed {
    position: relative;
    bottom: 0;
    margin: auto;
  }

  @media #{$media-min-tablet} {
    width: 390px;
    margin: 0;
  }

  @media #{$media-phone-L} {
    width: 390px;
    padding: 0 28px 0 32px;
  }

  @media #{$media-phone-S} {
    width: 390px;
    padding: 0 16px;
  }
}

.the-order-navigation__container {
  display: flex;
  justify-content: center;
  background: inherit;
}

.the-order-navigation__icon {
  width: 32px;
}

.the-order-navigation__dropdown {
  width: 16px;
}
</style>
