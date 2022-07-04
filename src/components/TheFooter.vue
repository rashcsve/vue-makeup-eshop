<template>
  <footer
    class="the-footer"
    :style="{
      'background-image': getBackgroundImage,
    }"
  >
    <div class="the-footer__main">
      <Contact :contactInfo="contactInfo" class="the-footer__contact" />
    </div>
    <div class="the-footer__other">
      <div class="the-footer__rules">
        <span>
          Privacy rules
          <br />Terms and conditions
        </span>
      </div>
      <div class="the-footer__social">
        <SocialLink name="instagram-white" link="https://www.instagram.com/" />
        <SocialLink name="facebook-white" link="https://www.facebook.com/" />
      </div>
    </div>
  </footer>
</template>

<script setup>
import Contact from "../components/ContactInfo.vue";
import SocialLink from "../components/SocialLink.vue";

const contactInfo = {
  name: "Cosmetics",
  address: {
    street: "Love",
    city: "Nature",
  },
  phone: "123456789",
  email: "cruelty@free",
  image: "images/footer.jpg",
};
const getBackgroundImage = () => {
  return new URL(`@/assets/${contactInfo.image}`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
.the-footer {
  position: relative;

  display: flex;
  flex-direction: column;
  height: 497px;
  padding: 80px 0 48px 0;

  background-position: center;
  background-size: cover;
  color: $color-light;
  fill: $color-light;

  font-weight: 600;
  line-height: 24px;

  @media only screen and (max-width: 600px) {
    height: 576px;
    padding: 64px 16px 48px;
    margin: 0;
    line-height: 30px;
  }

  &--without-photo {
    &::before {
      background-color: $color-basic;
    }
  }

  &::before {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    content: "";
  }
}

.the-footer__background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.the-footer__icon {
  padding-bottom: 8px;
}

.the-footer__main {
  position: relative;
  padding: 0 112px;
  @media #{$media-max-tablet} {
    padding: 0 64px;
  }
  @media #{$media-phone-L} {
    padding: 0 16px;
  }
}

.the-footer__other {
  position: absolute;
  bottom: 48px;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 112px;

  @media #{$media-max-tablet} {
    padding: 0 64px;
  }

  @media #{$media-phone-L} {
    padding: 0 32px;
  }

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    height: auto;
    align-items: flex-start;
  }
}

.the-footer__rules {
  text-decoration: underline;
  text-align: left;
}

.the-footer__social {
  display: flex;

  @media #{$media-phone-L} {
    padding-top: 16px;
  }
}

.the-footer__contact {
  color: $color-light;
}
</style>
