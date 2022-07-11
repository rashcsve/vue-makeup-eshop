<template>
  <div
    class="button__wrapper"
    :class="{
      'button__wrapper--center': alignment === 'center',
    }"
  >
    <a
      v-if="link"
      :href="link"
      class="button"
      :class="{ 'button--transparent': transparent }"
    >
      <span class="button__title">{{ title }}</span>
    </a>

    <router-link
      v-if="routerLink"
      @click="btnClick"
      :to="routerLink"
      class="button"
      :class="{
        'button--dark': dark,
        'button--wide': wide,
        'button--disabled': disabled,
      }"
    >
      <span class="button__title">{{ title }}</span>
    </router-link>

    <button
      v-if="!link && !routerLink"
      type="button"
      @click="btnClick"
      class="button"
      :class="{
        'button--more': more,
        'button--more-close': close,
        'button--medium': medium,
        'button--dark': dark,
        'button--big': big,
        'button--disabled': disabled,
      }"
    >
      <span class="button__title">{{ title }}</span>
    </button>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const emit = defineEmits(["addToCart", "closeSidebar", "submitOrder"]);
const props = defineProps({
  title: String,
  transparent: Boolean,
  more: Boolean,
  close: Boolean,
  dark: Boolean,
  disabled: Boolean,
  medium: Boolean,
  big: Boolean,
  wide: Boolean,
  link: String,
  alignment: String,
  routerLink: String,
});

function btnClick() {
  emit("addToCart");
  emit("closeSidebar");
  emit("submitOrder");
}
</script>

<style lang="scss">
.button__wrapper {
  text-align: left;

  &--center {
    text-align: center;
    display: flex;
    justify-content: center;
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

  &--wide {
    width: 100%;
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

  &--more {
    background: transparent url("../assets/svg/dropdown.svg") no-repeat right;
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
      background: url("../assets/svg/dropdown_light.svg") no-repeat right
        $color-basic;
      background-position-x: 87%;
      color: $color-light;
      border-color: $color-light;
    }
    &-close {
      background: url("../assets/svg/close.svg") no-repeat right;
      background-position-x: 87%;
      background-size: 16px;
    }
    &-close:hover {
      background: url("../assets/svg/close_light.svg") no-repeat right
        $color-basic;
      background-size: 16px;
      background-position-x: 87%;
    }
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
.button--disabled {
  cursor: not-allowed;
  pointer-events: none;
  opacity: 0.2;
  &--dark {
    color: $color-light;
    &:hover {
      background-color: $color-basic;
    }
  }
  &--light {
    &:hover {
      color: $color-basic;
      background-color: $color-light;
    }
  }
}
</style>
