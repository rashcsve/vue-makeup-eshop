<template>
 <container>
  <div class="about">
    <section class="about__text">
      <h2 class="title title--h1">About</h2>
      <p class="about__perex">
        <b>Cruelty-free cosmetics</b> is a category containing all cosmetics that have not been tested on animals. None of the ingredients used in the production of the cosmetic can be tested on animals in order for it to be truly cruelty-free, despite the fact that many companies who brand themselves as such still use raw materials that have been tested on animals.
      </p>
      <p class="about__perex">
        The types of tests performed on animals include acute toxicity testing, eye and skin irritation testing, skin sensitivity testing, carcinogenicity testing and re-productivity and developmental toxicity testing. Numerous studies have shown that the effectiveness of these tests is limited, and valid alternatives exist for many of these tests.
      </p>
      <div class="about__perex">
        This logo applies to several areas: cosmetics, medicines and hygiene products and home. It certifies that:
        <ul class="about__list">
          <li class="about__list-item">- all brands in the group are cruelty free</li>
          <li class="about__list-item">- the brand in its entirety only offers cruelty free products</li>
          <li class="about__list-item">- the absence of animal testing of finished products</li>
          <li class="about__list-item">- the absence of animal testing of the ingredients</li>
          <li class="about__list-item">- the absence of animal testing in foreign markets</li>
        </ul>
        The label does not certify the absence of material of animal origin but does certify that the mark does not have the right to sell its cosmetics in countries where the law authorizes the tests on the animals.
      </div>
    </section>
    <section class="about__text">
      <div class="about__image-wrapper">
        <img src="../assets/images/faces.jpg" alt="faces" />
      </div>
    </section>
  </div>
 </container>
</template>

<script>
import Container from '../components/Container';

export default {
  components: {
    Container
  }
}
</script>

<style lang="scss" scoped>
.about {
  display: flex;
  justify-content: space-between;
  margin: 32px 0 80px; 
  @media #{$media-min-tablet} {
    flex-direction: column;
  }
}
.about-text {
  display: flex;
  flex-direction: column;
}
.about__image-wrapper {
  width: 400px;
  @media #{$media-min-tablet} {
    width: 100%;
  }
}
.about__perex {
  color: $color-basic;
  text-align: left;
  width: 90%;
  margin: 16px 0; 
}
.about__list {
  margin: 8px 0;
}
.about__list-item {
  padding-left: 8px;
  font-style: italic;
}
</style>