<template>
    <div class="main">
        <ImagesToGif />
        <div class="svgTest">
            <!-- <video id="testVideo" width="600" height="600" controls >
                <source src="imgs/video2.mp4" type="video/mp4" />
            </video> -->
        </div>
    </div>
</template>

<script>
import ImagesToGif from "../../components/container/ImagesToGif";

import { mapState } from "vuex";
export default {
    name: "AppMain",
    components: { ImagesToGif },
    data() {
        return {};
    },
    computed: {
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

