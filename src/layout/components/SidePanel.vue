<template>
  <div class="side-panel">
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