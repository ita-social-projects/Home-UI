<template>
  <div class="sidebar">
    <section class="info">
      <div>
        <p class="name-hint">Ви зайшли як</p>
        <h3 class="user-fullname">{{ userData.first_name }} {{ userData.last_name }}</h3>
      </div>
      <div class="settings-btn-wrap">
        <button><span class="pi pi-cog"></span></button>
      </div>
    </section>

    <nav class="sidebar-navigation">
      <BaseSidebarNavButton btn-text="Повідомлення" icon="pi-comments" :badge-counter="notifications" />
      <BaseSidebarNavButton btn-text="Управління ОСББ" icon="pi-inbox" @click="openCooperation" />
      <BaseSidebarNavButton btn-text="Вибір ОСББ" icon="pi-bookmark" />
      <BaseSidebarNavButton btn-text="Запрошення" icon="pi-globe" />
      <BaseSidebarNavButton btn-text="Опитування" icon="pi-users" />
    </nav>

    <div class="create-btn-wrap">
      <Button label="Створити ОСББ" class="p-button-info" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';
import BaseSidebarNavButton from '@/components/base/BaseSidebarNavButton.vue';
import { Routes } from '@/router/types';

export default defineComponent({
  name: 'Sidebar',
  data() {
    return {
      userName: '',
      notifications: 2,
    };
  },
  components: {
    Button,
    BaseSidebarNavButton,
  },
  methods: {
    openCooperation() {
      this.$router.push(Routes.Cooperation);
    },
  },
  computed: {
    userData() {
      return this.$store.getters['userStore/userData'];
    },
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  display: grid;
  grid-template-rows: 1fr 6fr 1fr;
  background: #fafafa;
  padding: 1em 0;
}

.info {
  @include flex-custom(space-between, center);
  padding: 0 1.5em;

  .name-hint {
    @include flex-custom(flex-end);
    font-weight: 700;
    margin: 0.4em 0;
    color: #646e7c;
  }

  .user-fullname {
    @include flex-custom(flex-end);
    height: 1.5em;
    text-align: right;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .settings-btn-wrap {
    @include flex-custom(center);
    margin: 0 0 0 1em;

    button {
      padding: 0.4em 1em;
      border-radius: 10px;
      border: 2px solid $thin-border-color;
      transition: all 0.2s;

      &:hover {
        background-color: #d2d8ff;
      }
      &:active {
        background-color: #b9c1ff;
      }
    }

    span {
      font-size: 2em;
    }
  }
}

.sidebar-navigation {
  div,
  button {
    width: 100%;
  }
}

.create-btn-wrap {
  @include flex-center-all();
}
</style>
