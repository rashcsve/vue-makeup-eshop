<template>
  <div class="form-control__wrapper">
    <div
      :class="{
        'form-control__container': true,
        'form-control__container--type-checkbox': choice.type === 'checkbox',
        'form-control__container--type-radio': choice.type === 'radio',
        'form-control__container--type-text': choice.type === 'text',
        'form-control__container--type-select': choice.type === 'select',
      }"
    >
      <div v-if="choice.type === 'text' || choice.type === 'password'">
        <input
          :name="choice.name"
          :type="choice.type"
          @input="update"
          v-model="currentFormControlValue"
          :class="{
            'form-control': true,
            'form-control--filled': currentFormControlValue,
            'form-control--error': hasError,
          }"
        />
        <span
          :class="{
            'form-control__placeholder': true,
            'form-control__placeholder--error': hasError,
          }"
        >
          {{ choice.placeholder }}
        </span>
        <span
          :class="{
            'form-control__focus-border': true,
            'form-control__focus-border--error': hasError,
          }"
        ></span>
      </div>

      <div v-if="choice.type === 'radio'">
        <div
          v-for="option in options"
          :key="option"
          class="form-control form-control__radio"
        >
          <input
            :id="option"
            :value="option"
            :name="choice.name"
            :type="choice.type"
            v-model="currentFormControlValue"
            @change="update"
            :class="{
              'form-control': true,
              'form-control__radio-input': true,
              'form-control--filled': currentFormControlValue,
              'form-control--error': hasError,
            }"
          />
          <label class="form-control__radio-label" :for="option">{{
            option
          }}</label>
        </div>
      </div>

      <div
        v-if="choice.type === 'checkbox'"
        :class="{
          checkbox__container: true,
          'checkbox__container--product': choice.product,
        }"
      >
        <label
          :class="{
            checkbox__label: true,
            'checkbox__label--product': choice.product,
          }"
        >
          <input
            :type="choice.type"
            :name="choice.name"
            @change="update"
            v-model="currentFormControlValue"
            class="checkbox__input"
          />
          <span
            :class="{
              checkbox__phrase: true,
              'checkbox__phrase--product': choice.product,
            }"
          >
            {{ choice.label }}
          </span>
        </label>
      </div>

      <div
        v-if="choice.type === 'select'"
        :class="{ 'form-control__select--error': hasError }"
      >
        <Multiselect
          ref="control"
          :options="rawOptions"
          :placeholder="choice.placeholder"
          v-model="currentFormControlValue"
          @change="update"
          label="colour_name"
        >
          <template v-slot:option="{ option }">
            <div class="vue-select__options" v-if="choice.name === 'product'">
              <span
                class="vue-select__color"
                :style="{ backgroundColor: option.hex_value }"
              />
              <span>{{ option.colour_name }}</span>
            </div>
            <div v-else>
              <span>{{ option.label }}</span>
            </div>
          </template>
          <template v-slot:singlelabel="{ value }">
            <div
              class="vue-select__options-container"
              v-if="choice.name === 'product'"
            >
              <span
                class="vue-select__color"
                :style="{ backgroundColor: value.hex_value }"
              />
              <span>{{ value.colour_name }}</span>
            </div>
            <div v-else>
              <span>{{ value.label }}</span>
            </div>
          </template>
        </Multiselect>
      </div>
    </div>
    <div class="form-control__error" v-if="hasError">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { toRaw, defineEmits, defineProps, ref, computed, onMounted } from "vue";
import Multiselect from "@vueform/multiselect";

const emit = defineEmits(["handle", "validated"]);
const props = defineProps({
  choice: {
    type: Object,
    default: () => {
      return {
        type: "text",
        placeholder: "text",
        label: "",
        name: "",
        validator: null,
      };
    },
  },
  options: {
    type: Array,
  },
});

const currentFormControlValue = ref(null);
const errorMessage = ref(null);
const isUpdated = ref(false);
const objectToEmit = ref({});

// Computed
const rawOptions = computed(() => toRaw(props.options));
const hasError = computed(() =>
  isUpdated.value ? (errorMessage.value ? true : false) : false
);

// Created
onMounted(() => {
  if (currentFormControlValue.value) {
    validate();
  }
});

// Methods
function validate() {
  const value = currentFormControlValue.value;
  errorMessage.value = "";
  if (props.choice.validator) {
    try {
      props.choice.validator(value);
    } catch (e) {
      errorMessage.value = e.message;
    }
  }
  emit("validated", errorMessage.value);
}
function update() {
  // Put to store only necessary data
  if (props.choice.type === "select") {
    objectToEmit.value = currentFormControlValue;
  } else {
    objectToEmit.value.value = currentFormControlValue.value;
    objectToEmit.value.label = props.choice.label;
  }
  isUpdated.value = true;
  validate();
  emit("handle", objectToEmit.value);
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss">
.checkbox__container {
  padding: 32px 0;

  &--product {
    padding: 16px 0;
  }
}

.checkbox__label {
  display: flex;
  align-items: center;

  &--product {
    justify-content: flex-start;
  }
}

.checkbox__input {
  position: absolute; // take it out of document flow
  opacity: 0; // hide it

  & + span {
    position: relative;
    cursor: pointer;
    padding: 0;
  }

  & + span:before {
    content: "";
    margin-right: 16px;
    display: inline-block;
    vertical-align: text-top;
    width: 14px;
    height: 14px;
    background: white;
    border: 1px solid $color-basic;
  }

  &:checked + span:after {
    content: "";
    background: url("../assets/svg/checkbox.svg") no-repeat;
    background-size: 16px;
    height: 16px;
    width: 16px;
    position: absolute;
  }
}

.checkbox__phrase {
  padding-left: 8px;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1.5px;
  font-weight: 600;
  display: flex;
  align-items: center;

  a {
    color: $color-basic;
  }

  &--product {
    text-transform: initial;
    font-size: 16px;
    font-weight: 100;
  }
}

.checkbox__extra {
  padding-left: 8px;
  font-size: 12px;
  text-transform: uppercase;
  color: #a0a0a0;
  height: 16px;
  position: relative;
}

.form-control {
  align-self: center;
  width: 100%;
  padding: 16px;
  border: 0;
  background-color: transparent;
  border: 1px solid $color-basic;
  box-sizing: border-box;
  position: relative;
  z-index: 10;
  border-radius: 0;
  box-shadow: 0;

  &:focus,
  &--filled {
    outline: none;
    ~ .form-control__placeholder {
      font-size: 13px;
      z-index: 11;
      width: auto;
      height: 16px;
      padding: 0 4px;
      top: -7px;
      left: 13px;
      opacity: 1;
      transition: all 0.3s ease-in-out;
    }
  }
  &:focus {
    ~ .form-control__focus-border {
      transform: scaleX(1);
      transition-duration: 0.3s;
    }
  }
  &--error {
    border-color: $color-warn;
  }

  @media only screen and (max-width: 600px) {
    align-self: center;
    width: 100%;
  }
}

.form-control__placeholder {
  position: absolute;
  left: 16px;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0;
  box-sizing: border-box;

  background: $color-light;
  opacity: 0.5;
  color: $color-basic;
  transition: opacity 0.3s;
  &--error {
    color: $color-warn;
  }
}

.form-control__focus-border {
  position: absolute;
  bottom: 0;
  width: 100%;
  transform: scaleX(0);
  transform-origin: left;
  height: 3px;
  background-color: $color-basic;
  left: 0;
  transition: transform 0.3s;
  &--error {
    background-color: $color-warn;
  }
}

.form-control__wrapper {
  margin-bottom: 16px;
}

.form-control__container {
  background-color: #fff;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
}

.form-control__container--type-checkbox {
  margin: 0;
  background-color: inherit;

  &--product {
    padding-bottom: 16px;
  }
}

.form-control__container--type-text {
  .form-control {
    height: 48px;
  }
}

.form-control__container--type-select {
  cursor: pointer;
  width: 240px;
  height: 48px;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }

  &--cart {
    width: 100%;
  }

  .v-select {
    padding: 0;
    &.vs__searchable .vs__actions {
      padding: 0px 6px 3px 3px;
    }

    input {
      margin: 0;
      padding: 0;
      &:focus {
        margin: 0;
        padding: 0;
      }

      &::placeholder {
        color: $color-basic;
      }
    }

    .vs__open-indicator {
      path {
        fill: $color-basic;
      }
    }

    .vs__selected {
      margin: 0;
    }

    .vs__selected-tag {
      margin: 0;
      padding: 0;
    }

    .vs__dropdown-toggle {
      padding: 12px;
      border-radius: 0;
      border-color: black;
      height: 48px;
      cursor: pointer;

      input {
        cursor: pointer;
        font-family: "Avenir", Helvetica, Arial, sans-serif;
      }
    }

    .vs__dropdown-menu {
      background: $color-light;
      border-radius: 0;
      border-color: black;
      margin: 0;
      padding: 0;
      box-shadow: 0 0 30px red;
      box-shadow: 0 4px 4px rgba(32, 32, 32, 0.2),
        0 8px 8px rgba(32, 32, 32, 0.15), 0 16px 16px rgba(32, 32, 32, 0.1);

      .vs__dropdown-option {
        margin: 0;
        height: 48px;
        padding: 16px;
      }

      .vs__no-options {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .vs__dropdown-menu .highlight,
    .vs__dropdown-menu li:hover {
      height: 48px;
      background: $color-basic;
      color: #fff;
    }
    button.clear {
      font-weight: 100;
    }
  }
}

.vue-select__options {
  display: flex;
}

.vue-select__options-container {
  display: flex;
  width: 100%;
  margin-left: 12px;
}

.vue-select__color {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 8px;
}

.vue-select__extra {
  font-size: 12px;
  color: #a0a0a0;

  &:hover {
    color: $color-light;
  }
}

.form-control__select--error {
  .v-select .vs__dropdown-toggle {
    border-color: $color-warn;
  }
}

.form-control__container--type-date-time-picker {
  width: 240px;
  height: 48px;
  & * {
    border-radius: 0 !important;
  }

  .date-time-picker {
    width: 100%;
    margin: 0 auto;
    text-align: left;
    font-size: 14px;
    border-radius: 4px;
    position: relative;
  }

  .datetimepicker {
    &.visible {
      z-index: 999;
    }
  }

  .field {
    position: relative;
  }

  .field.has-value .field-label {
    font-size: 12px;
  }

  .field.has-value:not(.no-label) .field-input {
    padding-top: 0;
    padding-left: 12px;
  }

  .field .field-label {
    display: none;
  }

  .field-input {
    cursor: pointer;
    background-color: #fff;
    transition-duration: 0.3s;
    position: relative;
    width: 100%;
    min-height: 42px;
    padding: 0 12px;
    font-weight: 400;
    outline: none;
    border-radius: 4px;
    font-size: 14px;
    z-index: 0;
    border: 1px solid $color-basic;
    padding: 0 16px;
    height: 48px;
    color: $color-basic;
    font-size: 16px;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    &::placeholder {
      color: $color-basic;
    }
  }

  .custom-button-effect,
  .datepicker-day-effect {
    transition: none !important;
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
}

.date-time-picker {
  .field {
    &::after {
      content: "";
      background: url("../assets/svg/datePicker.svg") no-repeat;
      width: 38px;
      height: 32px;
      position: absolute;
      background-size: 70%;
      background-position: center;
      top: 8px;
      right: 6px;
    }
  }
  span {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  }
}

.datepicker-buttons-container {
  height: 64px;
  padding: 0 16px 16px !important;
  border-top: none !important;
}

.datepicker-button {
  width: 100%;
  height: auto !important;
  border: none !important;
  background-color: $color-basic !important;

  svg {
    display: none;
  }
}

.datepicker-button-effect {
  height: 48px !important;
  transform: none !important;
  transition: none !important;
  border: 2px solid transparent;

  &:hover {
    border-color: $color-basic;
    background-color: $color-light !important;

    &::after {
      content: "CHOOSE";
      color: $color-basic;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 2px;
      line-height: 20px;
    }
  }

  &::after {
    content: "CHOOSE";
    color: $color-light;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 2px;
    line-height: 20px;
  }
}

.datepicker {
  position: absolute;
  z-index: 5;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid $color-basic !important;
  font-family: "Avenir", Helvetica, Arial, sans-serif;

  .pickers-container {
    background: $color-light;
  }
}

.datepicker-container {
  width: 260px;
  padding: 0 5px;
  position: relative;

  .calendar {
    position: relative;
  }
}
.form-control__error {
  color: $color-warn;
  display: flex;
}
.form-control__container--type-radio {
  background-color: inherit;
}
.form-control__radio {
  // display: flex;
  // position: relative;
  // background-color: $color-light;
  height: 48px;
  margin-bottom: 16px;
  padding: 0;
}
.form-control__radio-input {
  width: 100%;
  display: none;

  &:checked ~ .form-control__radio-label {
    background-color: $color-background;
  }
}
.form-control__radio-text {
  display: flex;
  width: 100%;
}
.form-control__radio-label {
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  line-height: 16px;
  position: absolute;
  left: 0;
  padding: 0 16px;
  height: 100%;
  display: flex;
  align-items: center;
  width: 100%;
  display: flex;
  position: relative;
  background-color: $color-light;
}
:root {
  --ms-option-bg-selected: #dcdcdc;
  --ms-option-color-selected: black;
  --ms-option-bg-pointed: #f5f5f5;
  --ms-option-bg-selected-pointed: #dcdcdc;
  --ms-option-color-selected-pointed: black;
  --ms-ring-width: 0px;
}
</style>
