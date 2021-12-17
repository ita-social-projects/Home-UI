<template>
  <div class="sidebar">
    <section class="info">
      <div>
        <p class="name-hint">Ви зайшли як</p>
        <h3 class="user-fullname">{{ userData?.first_name }} {{ userData?.last_name }}</h3>
      </div>
    </section>

    <nav class="sidebar-navigation">
      <BaseSidebarNavButton
        link="notifications"
        btn-text="Повідомлення"
        icon="pi-comments"
        :badge-counter="notifications"
      />
      <BaseSidebarNavButton :link="cooperationInfoPath" btn-text="Управління ОСББ" icon="pi-inbox" />
      <BaseSidebarNavButton :link="cooperationInfoPath + 'select'" btn-text="Вибір ОСББ" icon="pi-bookmark" />
      <BaseSidebarNavButton link="invitation" btn-text="Запрошення" icon="pi-globe" />
      <BaseSidebarNavButton
        :link="pollsPath"
        btn-text="Опитування"
        icon="pi-users"
        :badge-counter="polls"
        badge-type="secondary"
      />
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseSidebarNavButton from '@/components/base/BaseSidebarNavButton.vue';
import { RoutesEnum } from '@/router/types';
import { UserInterface } from '@/store/authorization/types';

export default defineComponent({
  name: 'Sidebar',
  data() {
    return {
      userName: '',
      notifications: 2,
      polls: 1,
    };
  },
  components: {
    BaseSidebarNavButton,
  },
  computed: {
    cooperationInfoPath(): string {
      return RoutesEnum.Cooperation;
    },
    pollsPath(): string {
      return RoutesEnum.Polls;
    },
    userData(): UserInterface | null {
      return this.$store.getters['authorizationStore/userData'];
    },
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  display: grid;
  grid-template-rows: 1fr 6fr 1fr;
  background: #fafafa;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 3px 3px, rgba(0, 0, 0, 0.06) 1px 2px 2px;
  padding: 1em 0;
}

.info {
  @include flex-custom(flex-end, center);
  padding: 0 2.8em;

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
