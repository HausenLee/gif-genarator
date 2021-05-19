<template>
  <div class="main">
    <components :is="componentName" />
    <div class="svgTest">
        <!-- <video id="testVideo" width="600" height="600" controls >
            <source src="imgs/video2.mp4" type="video/mp4" />
        </video> -->
    </div>
  </div>
</template>

<script>
import ImagesToGif from "../../components/container/ImagesToGif";
import AnimateToGif from "../../components/container/AnimateToGif";
import VideoToGif from "../../components/container/VideoToGif";
import WebcamToGif from "../../components/container/WebcamToGif";

import { mapState } from "vuex";
export default {
  name: "AppMain",
  components: { ImagesToGif, AnimateToGif, VideoToGif, WebcamToGif },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      type: (state) => state.type,
    }),
    componentName() {
      let name = "ImagesToGif";
      switch (this.type) {
        case 1:
            name = "AnimateToGif";
          break;
        case 2:
            name = "VideoToGif";
          break;
        case 3:
            name = "WebcamToGif";
          break;
      }
      return name
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.main {
  flex-grow: 1;
  position: relative;

   .svgTest {
        background-color: #fff;

        position: absolute;
        z-index: 1;
    }
}
</style>