<template>
  <div class="loading">
    <hollow-dots-spinner
      :animation-duration="1000"
      :dot-size="15"
      :dots-num="3"
      color="#202020"
    />
  </div>
</template>

<script setup>
import { HollowDotsSpinner } from "epic-spinners";
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  margin: 32px 0;
}
</style>
