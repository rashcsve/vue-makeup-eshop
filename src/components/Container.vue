<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 0 112px;
  @media #{$media-max-tablet} {
    padding: 0 64px;
  }
  @media #{$media-phone-L} {
    padding: 0 16px;
  }
}
</style>