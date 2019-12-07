<template>
  <div
    :class="{
      'form-control__container': true,
      'form-control__container--type-checkbox': choice.type === 'checkbox',
      'form-control__container--type-text': choice.type === 'text',
      'form-control__container--type-select': choice.type === 'select',
      'form-control__container--type-select--cart': (choice.type === 'select' && choice.name === 'transport'),
      'form-control__container--type-date-time-picker':
        choice.type === 'date-time-picker'
    }"
  >
    <div v-if="choice.type === 'text' || choice.type === 'password'">
      <input
        :name="choice.name"
        :type="choice.type"
        @change="update"
        v-model="currentFormControlValue"
        :class="{
          'form-control': true,
          'form-control--filled': currentFormControlValue
        }"
      />
      <span class="form-control__placeholder">
        {{ choice.label }}
        <!-- To Do: Add Validation and error prevention -->
        <!-- <span v-show="invalid" class="form-control__placeholder-warn">{{ ' - ' + warning }}</span> -->
      </span>
      <span class="form-control__focus-border"></span>
    </div>

    <div
      v-if="choice.type === 'checkbox'"
      :class="{
        checkbox__container: true,
        'checkbox__container--product': choice.product
      }"
    >
      <label :class="{ checkbox__label: true, 'checkbox__label--product': choice.product }">
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
            'checkbox__phrase--product': choice.product
          }"
        >
          {{ choice.label }}
          <div
            v-if="options[0].extraPrice !== undefined"
            class="checkbox__extra"
          >{{ options[0].extraPrice }}$</div>
        </span>
      </label>
    </div>

    <div v-if="choice.type === 'select'">
      <v-select
        ref="control"
        :options="options"
        label="label"
        :placeholder="choice.placeholder"
        @input="updateSelect"
        :clearable="false"
        v-model="currentFormControlValue"
      >
        <template v-slot:option="option">
          <div class="vue-select__options-container">
            <span>{{ option.label }}</span>
            <span v-if="option.extraPrice" class="vue-select__extra">+ {{ option.extraPrice }} $</span>
          </div>
        </template>
      </v-select>
      <!-- <input type="hidden" v-model="currentFormControlValue" :name="choice.name" /> -->
    </div>

    <div v-if="choice.type === 'date-time-picker'">
      <vue-ctk-date-time-picker
        v-model="currentFormControlValue"
        @input="update"
        color="black"
        :noHeader="true"
        buttonColor="black"
        :label="choice.label"
        :no-shortcuts="true"
        :noButtonNow="true"
        :locale="options.locale ? options.locale : null"
        :format="options.format ? options.format : 'YYYY-MM-DD HH:mm'"
        :formatted="options.formatted ? options.formatted : 'l'"
        :minute-interval="options.minuteInterval ? options.minuteInterval : 1"
        :range="options.range ? options.range : false"
        :min-date="options.minDate ? options.minDate : ''"
        :max-date="options.maxDate ? options.maxDate : ''"
        :only-date="options.onlyDate ? options.onlyDate : false"
        :only-time="options.onlyTime ? options.onlyTime : false"
        :disabled-dates="options.disabledDates ? options.disabledDates : []"
        :disabled-hours="options.disabledHours ? options.disabledHours : []"
      />
    </div>
  </div>
</template>

<script>
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
import vSelect from "vue-select";

export default {
  components: {
    vSelect,
    VueCtkDateTimePicker
  },
  props: {
    choice: {
      type: Object,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentFormControlValue: ""
    };
  },
  methods: {
    update() {
      let objectToEmit = {};
      objectToEmit.value = this.currentFormControlValue;
      objectToEmit.formId = this.choice.name;
      objectToEmit.label = this.choice.label;
      objectToEmit.required = this.choice.required;
      objectToEmit.type = this.choice.type;
      if (this.choice.options && this.choice.options[0].extraPrice) {
        objectToEmit.extraPrice = this.choice.options[0].extraPrice;
      }
      this.$emit("input", objectToEmit);
    },
    updateSelect() {
      this.currentFormControlValue.formId = this.choice.name;
      this.currentFormControlValue.required = this.choice.required;
      this.currentFormControlValue.type = this.choice.type;
      this.$emit("input", this.currentFormControlValue);
    }
  }
};
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";

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
      // transition-duration: 0.3s;
      opacity: 1;
      // background: #f5f5f5;
    }
  }
  &:focus {
    ~ .form-control__focus-border {
      transform: scaleX(1);
      transition-duration: 0.4s;
    }
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

  background: white;
  opacity: 0.5;
  color: $color-basic;
  // transition: opacity 0.3s;
  &--invalid {
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
  background-color: black;
  left: 0;
  transition: transform 0.3s;
}

.form-control__container {
  background-color: #fff;
  margin-bottom: 16px;
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

.vue-select__options-container {
  display: flex;
  justify-content: space-between;
}

.vue-select__extra {
  font-size: 12px;
  color: #a0a0a0;

  &:hover {
    color: $color-light;
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
</style>
