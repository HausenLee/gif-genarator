<template>
    <div class="container images-container">
        <div class="editor" :style="editorStyle">
            <the-ele
                :element="item"
                v-for="(item, index) in elements"
                :key="index"
            ></the-ele>
        </div>
    </div>
</template>

<script>
import CTemplate from "../../base/index";
import TheEle from "../elements/TheEle.vue";
export default {
    name: "VideoToGif",
    components: {
        TheEle,
    },
    data() {
        return {
        svgHTML: "",
        elements: CTemplate.elements,
        width: CTemplate.width,
        height: CTemplate.height,
        };
    },
    computed: {
        editorStyle() {
            return {
                width: `${this.width}px`,
                height: `${this.height}px`,
            }
        }
    },
    mounted() {
    },
};
</script>

<style lang="scss">
.container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    font-size: 0;

    .editor {
        .ele {
        position: absolute;
        }
    }
}

.tmp {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 1px;
    height: 1px;
    overflow: hidden;
}
</style>