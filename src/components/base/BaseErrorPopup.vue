<template>
  <div class="popup error">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseErrorPopup',
});
</script>

<style lang="scss" scoped>
.popup.error {
  top: 5em;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f8d0d0;
}
</style>
