<template>
  <header class="the-hero">
    <div class="the-hero__blur">
      <div class="the-hero__blur-background"></div>
      <div class="the-hero__info">{{ perex }}</div>
      <div class="the-hero__button">
        <Button
          :title="buttonTitle"
          :link="buttonLink"
          :alignment="buttonAlignment"
          transparent
        />
      </div>
    </div>
  </header>
</template>

<script>
import Button from './Button';
export default {
  components: {
    Button
  },
  data() {
    return {
      perex: 'Giraffes are cool!',
      buttonTitle: 'Více o nás',
      buttonLink: '/about',
      buttonAlignment: 'center'
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/_variables.scss';
@import '../assets/styles/_mixins.scss';

.the-hero {
  text-align: center;
}

.the-hero__image {
  background: lighten(black, 40%);
  width: 100%;
  background-size: cover;
  background-position: center;
}

.the-hero__blur {
  margin-top: -140px;
  overflow: hidden;
  position: relative;
  padding: 56px 0 64px;
  background-color: $color-basic;

  @include create-box-shadow-blur();

  @media #{$media-min-tablet} {
    margin: -15% 2.5% 0 2.5%;
    height: auto;
    padding: 32px;
  }
}

.the-hero__blur-background {
  position: absolute;
  left: -5%;
  top: -10%;
  width: 110%;
  height: 120%;
  background-image: url('../assets/images/hero.png');
  background-position: center;
  background-size: cover;
  opacity: 0.25;
  filter: blur(20px);

  &::before {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    content: '';
  }
}

.the-hero__button {
  position: relative;
}

.the-hero__info {
  color: #ffffff;
  font-size: 24px;
  line-height: 32px;
  margin: auto;
  position: relative;
  width: 528px;
  margin-bottom: 24px;

  @media #{$media-min-tablet} {
    font-size: 16px;
    line-height: 24px;
    width: 345px;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 600px) {
    padding: 0;
    width: auto;
    line-height: 20px;
  }
}

.the-hero__button {
  position: relative;
}
</style>
