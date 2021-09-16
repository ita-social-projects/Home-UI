<template>
  <header>
    <div>Home</div>
    <div>
      <Button
        type="button"
        label="Messages"
        icon="pi pi-users"
        class="p-button-warning"
        badge="8"
        badgeClass="p-badge-info"
        @click="$router.push({ path: '/cooperation' })"
      />
    </div>
  </header>
</template>

<script lang="ts">
import Button from 'primevue/button';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
  components: {
    Button,
  },
});
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #b0ffe3;
  height: 10vh;
}
</style>
