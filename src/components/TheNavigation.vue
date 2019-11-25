<template>
  <nav :class="{'the-navigation': true, 'the-navigation--open': showModal}">
    <!-- Main navigation bar -->
    <div class="the-navigation__main">
      <div
        @click="show()"
        :class="{'the-navigation__menu': true, 'the-navigation__menu--open': showModal}"
      >
        <div v-if="!showModal" class="the-navigation__link the-navigation__link--menu">Menu</div>
        <div v-else class="the-navigation__link the-navigation__link--close" @click="show()">Zavřít</div>
      </div>
      <a class="the-navigation__logo" href="/">
        <img alt="giraffe" src="../assets/images/logo.jpg" class="the-navigation__logo-img" />
      </a>
      <div class="the-navigation__basket">
        <div class="the-navigation__link the-navigation__link--cart">Košík</div>
      </div>
    </div>
    <!-- Open navigation content -->
    <div class="the-navigation__other" v-if="showModal">
      <div class="the-navigation__items">
        <ul class="the-navigation__ul">
          <li class="the-navigation__li">
            <a class="the-navigation__li-link" href="/about">O nás</a>
          </li>
          <li class="the-navigation__li">
            <a class="the-navigation__li-link" href="/">Giraffe</a>
          </li>
          <li class="the-navigation__li">
            <a class="the-navigation__li-link" href="#contact">Kontakt</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    show() {
      this.showModal = !this.showModal;
      this.$emit("show-modal", this.showModal);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/_variables.scss";

.the-navigation {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  // height: @navigation-height;

  // &.-no-cart {
  //   .the-navigation__basket {
  //     visibility: hidden;
  //     pointer-events: none;
  //   }
  // }

  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.3s ease;
    background-color: rgba(255, 255, 255, 0.8);
  }

  // Modal is opened
  &--open {
    position: fixed;
    min-height: 100vh;
    max-height: 100vh;
    overflow: scroll;
    top: 0;
    left: 0;
    &:before {
      opacity: 1;
    }
  }
}

.the-navigation__main {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 96px;
  padding: 35px 65px 35px;

  @media #{$media-max-tablet} {
    padding: 16px 32px;
  }
  @media screen and (min-width: 768px) {
    align-items: flex-end;
    min-height: $navigation-height;
  }

  // TO DO - add a container wrapper
  @media screen and (min-width: 1441px) {
    width: 1440px;
    margin: 0 auto;
  }
}

.the-navigation__li-link {
  color: $color-basic;
  text-decoration: none;

  &:hover {
    color: $color-light;
  }
}

.the-navigation__link {
  color: $color-basic;
  text-decoration: none;
  height: 32px;
  width: 48px;
  font-weight: 300;
  line-height: 19px;
  padding: 8px 0 5px 0;
  text-align: right;

  &--cart {
    text-align: left;
  }

  @media #{$media-min-tablet} {
    display: none;
  }
}

.the-navigation__menu {
  display: flex;
  cursor: pointer;
  @media screen and (min-width: 769px) {
    padding-right: 10px;
    padding-left: 5px;
  }
  &:hover {
    background-color: $color-basic;
    .the-navigation__link {
      color: $color-light;
    }
  }

  &::before {
    content: "";
    background: url("../assets/svg/menu.svg") no-repeat;
    background-size: 16px;
    background-position: center;
    left: 0;
    top: 0;
    height: 32px;
    width: 32px;
    display: inline-block;
  }
  &:hover::before {
    background-image: url("../assets/svg/menu_hover.svg");
  }

  &--open {
    &::before {
      background-image: url("../assets/svg/close.svg");
    }
    &:hover::before {
      background-image: url("../assets/svg/close_hover.svg");
    }
  }
}

.the-navigation__logo {
  width: 170px;
  // height: 78px;
  align-self: flex-start;
  display: flex;
  justify-content: center;
  align-items: center;

  &-img {
    width: 100%;
  }

  @media #{$media-max-tablet} {
    text-align: center;
    margin: 0;
  }
  @media screen and (max-width: 600px) {
    width: 138px;
    height: 60px;
  }
}

.the-navigation__basket {
  position: relative;
  display: flex;
  cursor: pointer;
  @media screen and (min-width: 769px) {
    padding-left: 10px;
    padding-right: 5px;
  }
  &:hover {
    background-color: $color-basic;
    .the-navigation__link {
      color: $color-light;
    }
  }
  &::after {
    content: "";
    position: relative;
    background: url("../assets/svg/zakaznik-new.svg") no-repeat center/ 80%;
    left: 0;
    top: 0;
    height: 32px;
    width: 32px;
    display: inline-block;
  }
  &:hover::after {
    background-image: url("../assets/svg/zakaznik-new-white.svg");
  }
  &--count {
    font-size: 10px;
    border-radius: 50%;
    background-color: #202020;
    color: white;
    height: 17px;
    width: 17px;
    line-height: 17px;
    text-align: center;
    position: absolute;
    top: 2px;
    right: -3px;
    z-index: 1;
  }
  &:hover .the-navigation__basket--count {
    color: #202020;
    background-color: white;
  }
}

.the-navigation__other {
  text-align: center;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 0;

  @media screen and (max-height: 480px) {
    flex-direction: column;
    margin-bottom: 0;
  }
}

.the-navigation__ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.the-navigation__li {
  font-size: 45px;
  font-weight: 600;
  line-height: 64px;

  @media screen and (max-height: 480px) {
    font-size: 32px;
    line-height: 40px;
  }
}
</style>