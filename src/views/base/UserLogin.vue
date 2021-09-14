<template>
  <h1>Вхід до Особистого кабінету</h1>
  <div>
    <InputText />
    <InputText />
    <Button label="Увiйти" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
export default defineComponent({
  name: 'userlogin',
  data() {
    return {
      title: 'home',
    };
  },
  components: {
    InputText,
    Button,
  },
});
</script>

<style lang="scss"></style>
