<template>
  <div class="nav-bar">
      <div class="logo"></div>

      <div class="nav-right">
          <GenarateModal></GenarateModal>
      </div>
  </div>
</template>

<script>
import ParseGifModal from '../../components/ParseGifModal';
import GenarateModal from '../../components/GenerateModal';
export default {
    name: 'NavBar',
    components: {GenarateModal},
    methods: {
        generate() {

        },
        download() {

        }
    }
}
</script>

<style lang="scss" scoped>
.nav-bar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
}
</style>