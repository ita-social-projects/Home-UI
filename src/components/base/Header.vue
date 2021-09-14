<template>
  <header>
    Home
    <Button
      type="button"
      label="Messages"
      icon="pi pi-users"
      class="p-button-warning"
      badge="8"
      badgeClass="p-badge-info"
    />
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

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  background-color: #b0ffe3;
}
</style>
