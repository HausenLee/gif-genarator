<template>
  <div class="container images-container" v-html="svgHTML">
  </div>
</template>

<script>
import CTemplate from "../../base/index";
export default {
  name: "ImagesToGif",
  data() {
    return {
      svgHTML: "",
    };
  },
  mounted() {
    this.svgHTML = CTemplate.toSvg();
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