<template>
  <header class="the-hero">
    <Container>
      <div class="the-hero__blur">
        <div class="the-hero__blur-background"></div>
        <div class="the-hero__info">
          <p>Cruelty Free Cosmetics is not just a brand.</p>
          <p>It means making a conscious choice on cosmetics.</p>
        </div>
        <div class="the-hero__button">
          <Button
            :title="button.title"
            :link="button.link"
            :alignment="button.alignment"
            transparent
          />
        </div>
      </div>
    </Container>
  </header>
</template>

<script setup>
import Button from "./Button";
import Container from "../components/Container";

const button = {
  title: "Learn more",
  link: "/about",
  alignment: "center",
};
</script>

<style lang="scss" scoped>
.the-hero {
  text-align: center;
  background: url("../assets/images/hero.jpg");
  width: 100%;
  height: 700px;
  background-position: center;
  background-size: cover;
  @media #{$media-min-tablet} {
    margin-top: 96px;
  }
  @media #{$media-phone-L} {
    margin-top: 64px;
  }
}

.the-hero__image {
  background: lighten(black, 40%);
  width: 100%;
  background-size: cover;
  background-position: center;
}

.the-hero__blur {
  top: 100px;
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
  background-image: url("../assets/images/hero.jpg");
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
    content: "";
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
  width: 530px;
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
