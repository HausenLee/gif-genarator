<template>
  <div class="container animate-container">
      <div v-html="svgHTML"></div>
  </div>
</template>

<script>
import CVideoTo from '../../base/vToG'
export default {
  name: "AnimateToGif",
  data() {
    return {
      svgHTML: "",
    };
  },
  mounted() {
    this.svgHTML = CVideoTo.toSvg();
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  font-size: 0;
}
</style>