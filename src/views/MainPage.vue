<template>
  <div class="main-page">
    <Sidebar />
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import Sidebar from '@/components/Sidebar.vue';
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
  mounted() {
    let user: any = localStorage.getItem('user');
    if (user !== null && !this.userData) {
      user = JSON.parse(user);
      this.$store.dispatch('authorizationStore/GET_DATA', user.id);
    }
  },
  computed: {
    userData() {
      return this.$store.getters['authorizationStore/userData'];
    },
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
