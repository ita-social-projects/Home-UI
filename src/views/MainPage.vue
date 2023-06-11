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
import { StoreModuleEnum } from '@/store/types';
import { AuthActionEnum, AuthGettersEnum } from '@/user/store/authorization/types';
import { UserModel } from '@/user/models/user.model';

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
      const userData: UserModel = JSON.parse(user);
      this.$store.dispatch(`${StoreModuleEnum.authorizationStore}/${AuthActionEnum.GET_DATA}`, userData.id);
    }
  },
  computed: {
    userData() {
      return this.$store.getters[`${StoreModuleEnum.authorizationStore}/${AuthGettersEnum.userData}`];
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

.content {
  padding: 2em;
  height: 100%;
  overflow: auto;
}

@media (max-width: 768px) {
  .main-page {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 570px) {
  .content {
    padding: 10px;
  }
}
</style>
