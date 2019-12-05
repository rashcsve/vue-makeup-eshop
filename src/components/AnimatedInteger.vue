<template>
  <span v-html="` ${tweeningValue} `" />
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      tweeningValue: 0
    };
  },
  watch: {
    value(newVal, oldVal) {
      this.tween(oldVal, newVal);
    }
  },
  mounted() {
    this.tween(0, this.value);
  },
  methods: {
    tween(startValue, endValue) {
      let vm = this;
      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate);
        }
      }
      new TWEEN.Tween({ tweeningValue: startValue })
        .to({ tweeningValue: endValue }, 500)
        .onUpdate(function() {
          vm.tweeningValue = this.tweeningValue.toFixed(0);
        })
        .start();

      animate();
    }
  }
};
</script>
