<template>
  <div class="generateModal">
    <el-button @click="generate">生成Gif</el-button>
    <el-dialog
      title="生成GIF"
      :visible.sync="visible"
      :append-to-body="true"
      width="1100px"
      @close="cancel"
    >
      <div ref="testSvg" class="testSvg" v-loading="loading"></div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="download" :disabled="btnDisabled">{{
          btnText
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CTemplate from "../base/index";
import { mapState } from "vuex";
export default {
  data() {
    return {
      visible: false,
      loading: true,
      btnText: "下载",
      btnDisabled: false,
    };
  },
  computed: {
    ...mapState({
      options: (state) => state.generatorOptions,
    }),
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    generate() {
      this.showModal();
      CTemplate.fps = this.options.fps;
      CTemplate.gifWidth = this.options.width;
      CTemplate.gifHeight = this.options.height;

      CTemplate.generateGif().then((rt) => {
        this.loading = false;
      });
    },
    download() {
      this.btnText = "下载中...";
      this.btnDisabled = true;
      CTemplate.download().then((rt) => {
        this.btnText = "下载";
        this.btnDisabled = false;
      });
    },
    cancel() {
      this.visible = false;
      this.loading = true;
      this.$refs.testSvg.innerHTML = '';
      console.log(this.$refs)
      console.log(this.$refs.testSvg)
    },
  },
};
</script>

<style lang="scss">
.testSvg {
  height: 540px;
  overflow: auto;
  img {
    width: 320px;
    float: left;
    border: 1px solid #ccc;
    margin: 0 5px 5px 0;
  }
}
</style>
