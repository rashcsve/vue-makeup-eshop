<template>
  <div class="the-order-transport" v-if="hasProducts">
    <h4 class="title title--medium">Transport</h4>
    <div class="the-order__form">
      <form-control
        label="Choose transport type"
        type="select"
        name="transport"
        :options="[
          { label: 'PPL', value: 'ppl' },
          { label: 'DHL', value: 'dhl' }
        ]"
        placeholder="Choose transport type..."
        v-model="transportType"
      />
    </div>
  </div>
</template>

<script>
import FormControl from './FormControl';
export default {
  components: {
    FormControl
  },
  data: function() {
    return {
      store: this.$store,
      transportType: ''
    };
  },

  computed: {
    hasProducts() {
      return this.store.getters.products.length !== 0;
    }
  },

  watch: {
    transportType(newValue, oldValue) {
      this.store.commit('setTransport', {
        transportType: this.transportType
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
