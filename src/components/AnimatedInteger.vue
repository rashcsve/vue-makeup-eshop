<template>
  <span v-if="float">${{ value }}</span>
  <span v-else>{{ value }}</span>
</template>

<script setup>
//TODO Fix it
import { defineProps, ref, onMounted, watch } from "vue";

const props = defineProps({
  float: { type: Boolean, default: false },
  value: { type: Number, required: true },
});

const tweeningValue = ref(0);

// onMounted(() => {
//   tween(0, props.value);
// });

watch("props.value", (newVal, oldVal) => {
  console.log(newValue);
  tween(oldVal, newVal);
});

function tween(startValue, endValue) {
  function animate() {
    if (TWEEN.update()) {
      requestAnimationFrame(animate);
    }
    console.log(props.float);
    console.log(tweeningValue);
  }
  new TWEEN.Tween({ tweeningValue: startValue })
    .to({ tweeningValue: endValue }, 500)
    .onUpdate(function () {
      props.float
        ? (tweeningValue.value = tweeningValue.value.toFixed(1))
        : (tweeningValue.value = tweeningValue.value.toFixed(0));
    })
    .start();

  animate();
}
</script>
