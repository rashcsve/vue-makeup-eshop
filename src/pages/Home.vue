<template>
  <div class="home">
    <TheHero />
    <Container>
      <TheHomeProducts />
    </Container>
  </div>
</template>

<script setup>
import TheHomeProducts from "../components/TheHomeProducts.vue";
import TheHero from "../components/TheHero.vue";
import Container from "../components/Container.vue";
</script>
