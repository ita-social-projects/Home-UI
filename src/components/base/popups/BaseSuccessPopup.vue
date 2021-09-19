<template>
  <div class="popup success">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseInfoPopup',
});
</script>

<style lang="scss" scoped>
.success {
  background-color: #d0f8d0;
}
</style>
