<template>
  <router-link :to="link" class="nav-btn-link" active-class="link-active">
    <div class="nav-btn">
      <span class="pi" :class="icon" />
      <div>
        {{ btnText }}
        <div v-if="isBadgeActive" class="badge" :class="badgeType">{{ badgeCounter }}</div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { StoreModuleEnum } from "@/store/types";
import { PollsActionEnum } from "@/store/polls/types";

export default defineComponent({
  name: 'BaseSidebarNavButton',
  props: {
    link: {
      type: String,
      required: true,
    },
    btnText: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: 'pi-bookmark',
      required: true,
    },
    badgeCounter: {
      type: Number,
      default: 0,
    },
    badgeType: {
      type: String,
      default: 'primary',
    },
  },
  computed: {
    isBadgeActive(): boolean {
      return this.badgeCounter !== 0;
    },
  },
});
</script>

<style lang="scss" scoped>
.nav-btn-link {
  text-decoration: none;
  color: $main-text-color;

  .nav-btn {
    @include flex-custom(space-between, center);
    height: 6em;
    padding: 2em;
    cursor: pointer;
    font-size: 1.06em;
    font-weight: 600;
    user-select: none;

    &:hover {
      background-color: #ededed;
    }

    &:active {
      background-color: #dedede;
    }

    > div {
      @include flex-custom(space-between, center);
      flex: 2;
    }

    > span {
      padding: 0 1em;
      font-size: 1.6em;
    }
  }

  &.link-active {
    color: $hover-btn-background-color;

    .nav-btn {
      background-color: #ebebeb;
    }
  }
}

.badge {
  @include flex-center-all();
  width: 2em;
  height: 2em;
  margin: 0 0 0 1em;
  font-weight: 800;
  border-radius: 50%;

  &.primary {
    color: #fff;
    background-color: $main-btn-background-color;
  }

  &.secondary {
    color: #696969;
    background-color: rgba(100, 109, 117, 0.36);
  }
}
</style>
