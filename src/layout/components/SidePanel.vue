<template>
  <div class="side-panel">
      <div class="item">
          <div class="item-label">创建方式</div>
          <div class="item-value">
              <el-select v-model="generatorType" placeholder="请选择">
                <el-option
                    v-for="item in createTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
          </div>
      </div>

      <div class="item">
          <div class="item-label">宽度</div>
          <div class="item-value">
              <el-input v-model="generatorOptions.width" placeholder="单位px"></el-input>
          </div>
      </div>
      <div class="item">
          <div class="item-label">高度</div>
          <div class="item-value">
              <el-input v-model="generatorOptions.height" placeholder="单位px"></el-input>
          </div>
      </div>
      <div class="item">
          <div class="item-label">FPS</div>
          <div class="item-value">
              <el-input v-model="generatorOptions.fps" placeholder="10~30之间"></el-input>
          </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'SidePanel',
    computed: {
        generatorType: {
          get() {
            return this.$store.state.type;
          },
          set(val) {
            this.$store.state.type = val;
          }
        },
        generatorOptions: {
           get() {
            return this.$store.state.generatorOptions;
          },
          set(val) {
            this.$store.state.generatorOptions = val;
          }
        }
    },
    data() {
      return {
        createTypes: [{
          value: 0,
          label: '图片生成'
        }, {
          value: 1,
          label: '动画生成'
        }, {
          value: 2,
          label: '视频生成'
        }, {
          value: 3,
          label: '摄像头生成'
        }],
      }
    }
}
</script>

<style lang="scss" scoped>
.side-panel {
  width: 240px;
  background-color: #fff;
      box-shadow: 2px 0 3px rgba(0,0,0,.05);
      padding: 20px 14px;
      z-index: 1;
}
</style>