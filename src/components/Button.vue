<template>
  <div
    :class="{
      button__wrapper: true,
      'button__wrapper--center': alignment === 'center',
      'button__wrapper--right': alignment === 'right'
    }"
  >
    <a
      v-if="link"
      :href="link"
      :class="{ button: true, 'button--transparent': transparent }"
      v-bind="dataAttributes"
    >
      <span class="button__title">{{ title }}</span>
    </a>

    <button
      v-if="!link"
      type="button"
      :class="{
        button: true,
        'button--more': more,
        'button--close': close,
        'button--medium': medium,
        'button--dark': dark
      }"
      v-bind="dataAttributes"
    >
      <span class="button__title">{{ title }}</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    transparent: Boolean,
    more: Boolean,
    close: Boolean,
    dark: Boolean,
    medium: Boolean,
    link: String,
    alignment: String,
    dataAttributes: Array
  }
};
</script>

<style lang="scss">
@import '../assets/styles/_variables';

.button__wrapper {
  text-align: left;
  position: relative;

  &--center {
    text-align: center;
    display: flex;
    justify-content: center;
  }

  &--right {
    text-align: right;
  }
}

.button {
  width: 240px;
  height: 48px;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 2px;
  line-height: 20px;
  cursor: pointer;
  text-decoration: none;
  appearance: none;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid transparent;
  outline: none;
  padding: 10px;

  &:hover {
    transition: 0.8s;
  }

  &--dark {
    color: $color-light;
    background: $color-basic;
    &:hover {
      border-color: $color-basic;
      color: $color-basic;
      background: $color-light;
    }
  }

  &--want {
    width: 144px;
    height: 48px;
    color: $color-basic;
    background: $color-light;

    &:hover {
      color: $color-light;
      background: $color-basic;
      border-color: $color-light;
    }
  }

  &--light {
    color: $color-basic;
    background: $color-light;
    border-color: $color-basic;
    &:hover {
      color: $color-light;
      background-color: $color-basic;
    }
  }

  &--transparent {
    height: 48px;
    width: 212px;
    background: none;
    color: $color-light;
    border-color: $color-light;
    line-height: 16px;

    &:hover {
      color: $color-basic;
      background: $color-light;
    }

    @media only screen and (max-width: 600px) {
      width: 165px;
      font-size: 14px;
      border-color: $color-light;
    }
  }

  &--transparent-dark {
    background: inherit;
    color: $color-basic;
    border-color: $color-basic;

    &:hover {
      color: $color-light;
      background: $color-basic;
    }
  }

  &--more {
    background: transparent url('../assets/svg/dropdown.svg') no-repeat right;
    background-position-x: 87%;
    color: $color-basic;
    width: 96px;
    height: 32px;
    font-size: 12px;
    line-height: 12px;
    padding: 0 16px;
    border-color: $color-basic;
    border-width: 1px;
    justify-content: flex-start;
    &:hover {
      background: url('../assets/svg/dropdown_light.svg') no-repeat right
        $color-basic;
      background-position-x: 87%;
      color: $color-light;
      border-color: $color-light;
    }
    &--close {
      background-image: url('../assets/svg/close.svg');
      background-size: 15%;
    }
    &--close:hover {
      background-image: url('../assets/svg/close_light.svg');
    }
  }

  // &--lupa {
  //   background: url("/svg/zoom.svg") no-repeat right white;
  //   background-position: 93% 47.5%;
  //   background-size: 10px;
  //   width: 176px;
  //   font-size: 12px;
  //   text-align: left;
  //   padding: 0 14px;
  //   @media @media-min-tablet {
  //     display: none;
  //   }
  // }
  // &.-more.-lupa:hover {
  //   background-image: url("/svg/zoom-white.svg");
  //   background-position: 93% 47.5%;
  //   background-size: 10px;
  // }

  &--no-position {
    top: 0;
    left: 0;
  }

  &--big {
    width: 288px;
    @media only screen and (max-width: 600px) {
      width: 100%;
    }
  }

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
}

.button:disabled,
.button.-disabled {
  cursor: not-allowed;
  opacity: 0.2;
  &--dark {
    color: $color-light;
    &:hover {
      background-color: $color-basic;
    }
  }
  &--transparent-dark {
    &:hover {
      color: $color-basic;
      background-color: transparent;
    }
  }
  &--light {
    &:hover {
      color: $color-basic;
      background-color: $color-light;
    }
  }
  &--want {
    &:hover {
      color: $color-basic;
      background-color: $color-light;
    }
  }
}
</style>
