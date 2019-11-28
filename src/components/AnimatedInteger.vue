<template>
  <div>
    <span>{{ tweeningValue }}</span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data: function() {
    return {
      tweeningValue: 0
    };
  },
  watch: {
    value(newValue, oldValue) {
      this.tween(oldValue, newValue);
    }
  },
  mounted() {
    this.tween(0.0, this.value);
  },
  methods: {
    tween(startValue, endValue) {
      var vm = this;
      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate);
        }
      }

      new TWEEN.Tween({ tweeningValue: startValue })
        .to({ tweeningValue: endValue }, 500)
        .on("update", function(object) {
          vm.tweeningValue = object.tweeningValue.toFixed(2);
        })
        .start();

      animate();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>