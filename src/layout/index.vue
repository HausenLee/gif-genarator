<template>
    <div class="layout">
        <div class="layout-header">
            <nav-bar></nav-bar>
        </div>

        <div class="layout-content">
            <side-panel></side-panel>
            <app-main></app-main>
        </div>
    </div>
</template>

<script>
import AppMain from "./components/AppMain";
import NavBar from "./components/NavBar";
import SidePanel from "./components/SidePanel";
export default {
    name: "Layout",
    components: { AppMain, NavBar, SidePanel },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
body {
    
  .layout {
      height: 100vh;
    width: 100vw;
    background-color: #f1f1f1;

    &-header {
      display: flex;
      height: 70px;
      width: 100%;
      box-shadow: 0 0 20px rgba(20, 21, 50, 0.1);
      background-color: #fff;
      
        position: absolute;
        z-index: 5;
    }

    &-content {
        display: flex;
        justify-content: space-between;
        height: calc(100% - 70px);
        position: relative;
        top: 70px;
        z-index: 1;
    }
  }
}
</style>