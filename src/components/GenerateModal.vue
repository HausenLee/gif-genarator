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
      <div class="shot-body" v-loading="loading">
        <div class="selected-shot">
          <img v-if="selectedShotSrc" :src="selectedShotSrc" />
        </div>
        <div ref="shotList" class="shot-list">
          <img v-for="(img,$index) in pageShots" :key="$index" :src="img" @click="selected($index)" :class="{active: $index == activeIndex}"/>
        </div>
      </div>
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
      pageShots: [],
      btnDisabled: false,
      activeIndex: 0,
      selectedShotSrc: [],
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
        this.pageShots = [];
        this.pageShots.push(...CTemplate.pageShots);
        this.selected(0)
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
      this.$refs.shotList.innerHTML = "";
      
    },
    selected(index) {
      this.selectedShotSrc = this.pageShots[index];
      this.activeIndex = index;
    }
  },
};
</script>

<style lang="scss">
.shot-list {
  overflow: auto;
  display: flex;
  align-items: flex-end;
  img {
    width: 160px;
    float: left;
    border: 1px solid #ccc;
    margin: 0 5px 5px 0;

    &.active {
      border: 1px solid #ff7700;
    }
  }
}

.selected-shot {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  img {
    width: 320px;
  }
}
</style>
