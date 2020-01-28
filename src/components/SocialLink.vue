<template>
  <a :href="link" target="_blank" class="social-link">
    <img :src="require('../assets/svg/'+name+'.svg')" alt="Social Link Icon" />
  </a>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
.social-link {
  margin-right: 32px;
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;

  &:last-child {
    margin-right: 0;
  }
}
</style>