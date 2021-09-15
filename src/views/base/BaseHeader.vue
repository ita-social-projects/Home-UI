<template>
  <div class="header">
    <h2>Home</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'header',
  data() {
    return {};
  },
});
</script>

<style lang="scss">
.header {
  background: #dbf1ed;
  border: 1px solid #e1e3e6;
  box-sizing: border-box;
  h2 {
    margin: 15px 127px 15px;
    color: #3855b3;
    font-family: 'DM Sans';
    font-weight: bold;
    font-size: 36px;
  }
}
</style>
