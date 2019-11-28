<template>
  <div class="the-order__container" id="order">
    <div class="the-order__main">
      <div class="the-order__title">
        <h3 class="title title--h1">Your Order</h3>
      </div>
      <the-order-navigation />
    </div>
    <div class="the-order__other">
      <!-- {% include "../order-cart/template.twig" %}
        {% include "../order-transport/template.twig" %}
        {% include "../order-invoice/template.twig" %}
      {% include "../order-total/template.twig" %}-->
    </div>
  </div>
</template>

<script>
import TheOrderNavigation from "./TheOrderNavigation";
export default {
  components: {
    TheOrderNavigation
  }
};
</script>

<style lang="scss" scoped>
.the-order__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background-color: white;
  margin: auto;
  max-width: 544px;

  @media #{$media-min-tablet} {
    min-width: 100%;
    margin: 0;
  }
}

.the-order__form {
  padding: 0 16px;
}

.the-order__business {
  &--active {
    padding-bottom: 20px;
  }
}

.the-order__finish-order {
  display: flex;
  justify-content: center;
}

.the-order__main {
  // background-color: #f5f5f5;
  width: 100%;
}

.the-order__other {
  background-color: white;
  padding: 0 32px 0;

  @media #{$media-min-tablet} {
    padding: 0 16px 0 16px;
  }
}
.the-order__title {
  display: flex;
  justify-content: center;
  padding-bottom: 32px;
}

.the-order__verb {
  @media #{$media-min-tablet} {
    display: none;
  }
}
</style>