<template>
  <div class="sidebar">
    <section class="info">
      <div>
        <p class="name-hint">Ви зайшли як</p>
        <h3 class="user-fullname">{{ userData?.firstName }} {{ userData?.lastName }}</h3>
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
      <BaseSidebarNavButton :link="invitationsPath" btn-text="Запрошення" icon="pi-globe" />
      <BaseSidebarNavButton
        :link="pollsPath"
        btn-text="Опитування"
        icon="pi-users"
        :badge-counter="polls"
        badge-type="secondary"
      />
    </nav>
  </div>

  <transition name="slide-fade-opacity" mode="out-in">
    <div v-show="mobileSidebar" ref="mobile-menu-wrapper" class="mobile-menu-wrapper">
      <transition name="slide-fade-translateX" mode="out-in">
        <div v-show="mobileSidebar" class="mobile-menu">
          <div class="back">
            <div class="header">
              <div class="logo" @click="redirectToMain"></div>
              <span @click="closeMobSidebar" class="pi pi-times close_mobsidebar_btn"></span>
            </div>
            <BaseSidebarNavButton link="notifications" btn-text="Обрати ОСББ" icon="pi-home" />
            <BaseSidebarNavButton link="notifications" btn-text="Марія" icon="pi-user" />

            <hr />

            <BaseSidebarNavButton
              link="notifications"
              btn-text="Повідомлення"
              icon="pi-comments"
              :badge-counter="notifications"
            />
            <BaseSidebarNavButton :link="cooperationInfoPath" btn-text="Управління ОСББ" icon="pi-inbox" />
            <BaseSidebarNavButton :link="invitationsPath" btn-text="Запрошення" icon="pi-globe" />
            <BaseSidebarNavButton
              :link="pollsPath"
              btn-text="Опитування"
              icon="pi-users"
              :badge-counter="polls"
              badge-type="secondary"
            />
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import BaseSidebarNavButton from '@/components/base/BaseSidebarNavButton.vue';
import { RoutesEnum } from '@/router/types';
import { UserInterface, AuthGettersEnum } from '@/user/store/authorization/types';
import { StoreModuleEnum } from '@/store/types';

export default defineComponent({
  name: 'Sidebar',

  setup() {
    const mobileSidebar = inject('mobileSidebar');
    return {
      mobileSidebar,
    };
  },
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

  methods: {
    closeMobSidebar() {
      this.mobileSidebar = false;
    },
  },

  mounted() {
    document.addEventListener('click', (item) => {
      if (item.target === this.$refs['mobile-menu-wrapper']) {
        this.closeMobSidebar();
      }
    });
  },

  computed: {
    cooperationInfoPath(): string {
      return RoutesEnum.Cooperation;
    },
    pollsPath(): string {
      return RoutesEnum.Polls;
    },
    invitationsPath(): string {
      return RoutesEnum.InvitationSection;
    },
    userData(): UserInterface | null {
      return this.$store.getters[`${StoreModuleEnum.authorizationStore}/${AuthGettersEnum.userData}`];
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
    // height: 1.5em;
    text-align: right;
    margin: 1em 0 2em 0;
    // overflow: hidden;
    // text-overflow: ellipsis;
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

.mobile-menu-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 98;
}

.mobile-menu {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 290px;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99;
}

.back {
  max-width: 290px;
  height: 100%;
  background-color: #f3f3f3;
  overflow: auto;
}

.mobile-menu .header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
  margin-bottom: 2rem;
}

.logo {
  height: 100%;
  width: 135px;
  background-image: url('../assets/logo.svg');
  background-repeat: no-repeat;
  background-position: 0 center;
  cursor: pointer;
  margin: 1rem;
  align-self: flex-start;
}

.close_mobsidebar_btn {
  align-self: center;
  font-weight: 700;
  font-size: 1.5rem;
}

// -----ANIMATION-OPASITY-FOR-MOBILE-SIDEBAR-----
.slide-fade-opacity-enter-active,
.slide-fade-opacity-leave-active {
  transition: 400ms ease all;
}
.slide-fade-opacity-enter-from,
.slide-fade-opacity-leave-to {
  opacity: 0;
}
// --------------------------------------

// -----ANIMATION2-FOR-MOBILE-SIDEBAR-----
.slide-fade-translateX-enter-active,
.slide-fade-translateX-leave-active {
  transition: 400ms ease all;
}
.slide-fade-translateX-enter-from,
.slide-fade-translateX-leave-to {
  transform: translateX(-290px);
}
// --------------------------------------

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
</style>
