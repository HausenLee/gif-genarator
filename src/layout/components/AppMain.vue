<template>
    <div class="main">
        <div class="container images-container" v-html="svgHTML"></div>
    </div>
</template>

<script>
import CTemplate from '../../base/index'
export default {
    name: 'AppMain',
    data() {
        return {
            svgHTML: '',
        }
    },
    mounted() {
        this.svgHTML = CTemplate.toSvg();
    }
}
</script>

<style lang="scss" scoped>
.main {
    flex-grow: 1;
    position: relative;
    .container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        font-size: 0;
    }

    .testSvg {
        background-color: #fff;

        position: absolute;
        z-index: 1;
    }
}
</style>