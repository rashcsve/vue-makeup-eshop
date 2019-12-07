<template>
  <div class="home">
    <the-navigation @show-modal="modalIsOpened" />
    <div :class="{ home__container: true, 'home__container--modal': showModal }">
      <img src="../assets/images/hero.png" alt="Hero Image" class="home__image" />
      <container>
        <the-hero />
        <div v-if="!loading">
          <product
            :items="giraffes"
            :info="giraffeInfo"
            :choices="giraffeChoices"
            :options="giraffes"
          />
          <product
            :items="services"
            :info="serviceInfo"
            :choices="serviceChoices"
            :options="services"
          />
        </div>
        <p v-else>Loading...</p>
        <the-order />
      </container>
      <the-footer />
    </div>
  </div>
</template>

<script>
import TheNavigation from "../components/TheNavigation";
import TheHero from "../components/TheHero";
import Product from "../components/Product";
import TheOrder from "../components/TheOrder";
import Container from "../components/Container";
import TheFooter from "../components/TheFooter";

import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "home",
  components: {
    TheNavigation,
    TheHero,
    TheOrder,
    Product,
    Container,
    TheFooter
  },
  data() {
    return {
      showModal: false,
      loading: false,
      giraffeInfo: {
        images: [
          {
            thumb: "images/giraffes/squared/giraffe-3.jpg",
            src: "images/giraffes/squared/giraffe-3.jpg",
            caption: "Adult Giraffe"
          },
          {
            thumb: "images/giraffes/squared/giraffe-4.jpg",
            src: "images/giraffes/squared/giraffe-4.jpg",
            caption: "Teenage Giraffe"
          },
          {
            thumb: "images/giraffes/squared/giraffe-1.jpg",
            src: "images/giraffes/squared/giraffe-1.jpg",
            caption: "Baby Giraffe!"
          }
        ],
        title: "Giraffes",
        subtitle: "od 1 000",
        description:
          "<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam dictum tincidunt diam. Curabitur vitae diam non enim vestibulum interdum. Quisque porta. Quisque tincidunt scelerisque libero. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Etiam sapien elit, consequat eget, tristique non, venenatis quis, ante. Mauris tincidunt sem sed arcu. Maecenas aliquet accumsan leo. Mauris elementum mauris vitae tortor. Nullam eget nisl. Aenean vel massa quis mauris vehicula lacinia. Maecenas fermentum, sem in pharetra pellentesque, velit turpis volutpat ante, in pharetra metus odio a lectus.</p><p>Maecenas fermentum, sem in pharetra pellentesque, velit turpis volutpat ante, in pharetra metus odio a lectus. Pellentesque sapien. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Maecenas lorem. Quisque porta. Vestibulum erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Quisque tincidunt scelerisque libero. Nulla quis diam. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Integer vulputate sem a nibh rutrum consequat.</p>"
      },
      giraffeChoices: [
        {
          id: "age",
          type: "select",
          required: true,
          name: "age",
          placeholder: "Choose age",
          label: "Choose age"
        }
      ],
      serviceInfo: {
        images: [
          {
            thumb: "images/giraffes/squared/giraffe-2.jpg",
            src: "images/giraffes/squared/giraffe-2.jpg",
            caption: "Meet Giraffe"
          },
          {
            thumb: "images/giraffes/squared/giraffe-5.jpg",
            src: "images/giraffes/squared/giraffe-5.jpg",
            caption: "Feed Giraffe"
          }
        ],
        title: "Services",
        subtitle: "od 100",
        description: "<p>Meow Meow</p>"
      },
      serviceChoices: [
        {
          id: "service",
          type: "select",
          name: "service",
          placeholder: "Choose service",
          label: "Choose service",
          required: true
        },
        {
          type: "date-time-picker",
          name: "time",
          placeholder: "Choose date and time",
          required: true,
          label: "Choose date and time",
          options: [
            {
              id: "date-picker-options",
              value: "",
              locale: "en",
              disabledHours: [
                "21",
                "22",
                "23",
                "00",
                "01",
                "02",
                "03",
                "04",
                "05",
                "06",
                "07"
              ],
              minuteInterval: 5,
              format: "DD.M.YYYY HH:mm",
              formatted: "dddd D.M. - H:mm"
            }
          ]
        },
        {
          id: "photo",
          type: "checkbox",
          required: false,
          name: "photo",
          label: "Take a photo",
          options: [
            {
              extraPrice: 50
            }
          ],
          product: true
        }
      ]
    };
  },
  computed: {
    addModalClass() {
      return this.showModal;
    },
    ...mapState({
      services: state => state.items.services,
      giraffes: state => state.items.giraffes
    })
  },
  methods: {
    ...mapActions({
      fetchGiraffes: "items/fetchGiraffes",
      fetchServices: "items/fetchServices"
    }),
    modalIsOpened(value) {
      this.showModal = value;
    }
  },
  async created() {
    this.loading = true;
    const fetchedGiraffes = await this.fetchGiraffes();
    const fetchedServices = await this.fetchServices();
    if (fetchedGiraffes && fetchedServices) this.loading = false;
  }
};
</script>

<style lang="scss">
.home__container {
  &--modal {
    overflow: hidden;
    filter: blur(20px);
    margin-top: 144px;
  }
}

.home__image {
  background: lighten(black, 40%);
  width: 100%;
  background-size: cover;
  background-position: center;
}
</style>
