<template>
  <div class="main-page">
    <Sidebar />
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import Sidebar from '@/components/base/Sidebar.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainPage',
  data() {
    return {
      title: 'MainPage',
    };
  },
  components: {
    Sidebar,
  },
});
</script>

<style lang="scss" scoped>
.main-page {
  display: grid;
  grid-template-columns: 1fr 4fr;
  height: 100%;
}
</style>
