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
import { UserInterface } from '@/store/authorization/types';

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
    const user: string | null = localStorage.getItem('user');
    if (user !== null && !this.userData) {
      const userData: UserInterface = JSON.parse(user);
      this.$store.dispatch('authorizationStore/GET_DATA', userData.id);
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
