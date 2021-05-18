<template>
  <div class="parseGifModal">
    <el-button @click="showModal">解析Gif</el-button>
    <el-dialog title="解析GIF" :visible.sync="visible" :append-to-body="true" width="90%">
      <span>这是一段信息</span>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    download() {},
    cancel() {
      this.visible = false;
    },
  },
};
</script>

<style>
</style>