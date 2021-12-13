<template>
  <div class="detailed">
    <div class="detailed_info">
      <div>
        <slot name="detail_1"></slot>
      </div>
      <div>
        <slot name="detail_2"></slot>
      </div>
      <div>
        <slot name="detail_3"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DetailedInfo',
});
</script>

<style lang="scss" scoped>
.detailed_info {
  min-height: 150px;
  height: 100%;
  margin: 10px;
}

.detailed_info div {
  padding: 8px;
  & :nth-child(1) {
    font-weight: bold;
  }
}

.edit_btn {
  margin: 15px;
}
</style>