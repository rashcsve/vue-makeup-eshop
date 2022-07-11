<template>
  <a :href="link" target="_blank" class="social-link">
    <img :src="getImage()" alt="Social Link Icon" />
  </a>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({ link: String, name: String });

const getImage = () => {
  return new URL(`../assets/svg/${props.name}.svg`, import.meta.url).href;
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
