<template>
  <div class="home">
    <the-hero />
    <container>
      <the-home-products />
    </container>
  </div>
</template>

<script>
import TheHomeProducts from '../components/TheHomeProducts';
import TheHero from '../components/TheHero';
import Container from '../components/Container';

export default {
  name: 'home',
  components: {
    TheHomeProducts,
    TheHero,
    Container
  }
};
</script>
