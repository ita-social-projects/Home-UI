<template>
  <div class="main-page-wrap">
    <baseHeader />
    <sideBar />
  </div>
</template>

<script lang="ts">
import sideBar from '@/components/base/SideBar.vue';
import baseHeader from '@/components/base/BaseHeader.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainPage',
  data() {
    return {
      title: 'MainPage',
    };
  },
  components: {
    sideBar,
    baseHeader,
  },
});
</script>

<style lang="scss" scoped>
  .main-page-wrap {
    position: relative;
    display: block;

    background: #ffffff;
  }
</style>
