<template>
  <div id="app">
    <layout></layout>
  </div>
</template>

<script>
import Layout from "./layout/index.vue";

export default {
  name: "App",
  components: {
    Layout,
  },
};
</script>

<style lang="scss">
#app {
  
}

.jsgif {
    position: fixed;
    width: 0px;
    height: 0;
    overflow: hidden;
  }
</style>
