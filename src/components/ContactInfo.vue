<template>
  <div
    id="contact-info"
    class="contact-info__address"
    :class="{
      'contact-info__address--header': header,
    }"
  >
    <div class="contact-info__name">
      <img
        v-if="contactInfo.logo"
        :src="require(`@/assets/${contactInfo.logo}`)"
        :alt="contactInfo.name"
        class="contact-info__logo"
      />
      <p>{{ contactInfo.name }}</p>
      <p>{{ contactInfo.address.street }}</p>
      <p>{{ contactInfo.address.city }}</p>
    </div>
    <div class="contact-info__phone-email">
      <a
        :href="`tel:${contactInfo.phone}`"
        class="contact-info__link"
        :class="{
          'contact-info__link--header': header,
        }"
        >{{ contactInfo.phone }}</a
      >
      <a
        :href="`mailto:${contactInfo.email}`"
        class="contact-info__link"
        :class="{
          'contact-info__link--header': header,
        }"
        >{{ contactInfo.email }}</a
      >
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({ contactInfo: Object, header: Boolean });
</script>

<style lang="scss" scoped>
.contact-info__address {
  text-align: left;
  width: 240px;

  @media #{$media-max-tablet} {
    width: 100%;
    &--header {
      display: none;
    }
  }
}
.contact-info__logo {
  width: 75px;
  margin-bottom: 20px;
}

.contact-info__link {
  text-decoration: underline;
  color: $color-light;

  &--header {
    color: $color-basic;
  }

  &:hover {
    text-decoration: none;
  }
}

.contact-info__phone-email {
  display: flex;
  flex-direction: column;
}

.contact-info__name {
  line-height: 32px;
  font-size: 24px;
  margin-bottom: 16px;
}
</style>
