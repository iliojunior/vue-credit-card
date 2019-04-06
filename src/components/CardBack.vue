<template>
  <div class="jp-card-back">
    <div class="jp-card-bar"></div>
    <div :class="classDisplay"></div>
    <div class="jp-card-shiny"></div>
  </div>
</template>

<script>
export default {
  props: {
    classes: Object
  },
  computed: {
    classDisplay: () => ({
      'jp-card-cvc': true,
      'jp-card-display': true,
      ...this.classes
    })
  }
}
</script>
