<template>
    <div class="ele" v-html="html" :style="eleStyle"></div>
</template>

<script>
export default {
    props: {
        element: {}
    },
    data() {
        return {
            html: '',
        }
    },
    computed: {
        eleStyle() {
            return {
                width: `${this.element.width}px`,
                height: `${this.element.height}px`,
                top: `${this.element.top}px`,
                left: `${this.element.left}px`,
            }
        },
        dirty() {
            return this.element.dirty;
        }
    },
    watch: {
        dirty(val) {
            console.log('this.dirty',val);
            this.html = this.element.toSvg();
        }
    },
    mounted() {
        this.html = this.element.toSvg();
    }
}
</script>

<style>

</style>