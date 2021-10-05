<template>
  <div class="nav-btn">
    <span class="pi" :class="icon" />
    <div>
      {{ btnText }}
      <div v-show="isBadgeActive" class="badge">{{ badgeCounter }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseSidebarNavButton',
  props: {
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
  },
  computed: {
    isBadgeActive(): boolean {
      return this.badgeCounter !== 0;
    },
  },
});
</script>

<style lang="scss" scoped>
.nav-btn {
  @include flex-custom(space-between, center);
  height: 6em;
  padding: 2em;
  cursor: pointer;
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

.badge {
  @include flex-center-all();
  width: 2em;
  height: 2em;
  margin: 0 0 0 1em;
  font-weight: 800;
  color: #fff;
  border-radius: 50%;
  background-color: $main-btn-background-color;
}
</style>
