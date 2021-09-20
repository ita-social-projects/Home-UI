<template>
  <div class="main-page">
    <main-page-header />
    <main-page-side-bar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import mainPageHeader from './main-page-skeleton/main-page-header.vue'
import mainPageSideBar from './main-page-skeleton/main-page-sidebar.vue'

export default defineComponent({
  components: {
    mainPageHeader,
    mainPageSideBar,
  },
})
</script>

<style lang="scss">
.main-page {
  position: relative;
  width: 1920px;
  height: 1080px;

  background: #ffffff;
  box-shadow: 0px 6px 12px rgba(129, 129, 129, 0.25);
  border-radius: 6px;
}
</style>
