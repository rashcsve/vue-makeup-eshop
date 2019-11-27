<template>
  <div
    id="contact-info"
    :class="{
      'contact-info__address': true,
      'contact-info__address--header': header
    }"
  >
    <div class="contact-info__name">
      <img
        v-if="contactInfo.logo"
        :src="require(`@/assets/${contactInfo.logo}`)"
        :alt="contactInfo.name"
        class="contact-info__logo"
      /><br />
      {{ contactInfo.name }}<br />
      {{ contactInfo.address.street }}<br />
      {{ contactInfo.address.city }}<br />
      <br />
    </div>
    <div class="contact-info__phone-email">
      <a
        :href="`tel:${contactInfo.phone}`"
        :class="{
          'contact-info__link': true,
          'contact-info__link--header': header
        }"
        >{{ contactInfo.phone }}</a
      >
      <a
        :href="`mailto:${contactInfo.email}`"
        :class="{
          'contact-info__link': true,
          'contact-info__link--header': header
        }"
        >{{ contactInfo.email }}</a
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contactInfo: Object,
    header: Boolean
  }
};
</script>

<style lang="scss" scoped>
.contact-info__address {
  text-align: left;
  width: 240px;

  &--header {
    @media #{$media-max-tablet} {
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
  font-style: normal;
  line-height: 32px;
  font-size: 24px;
}
</style>
