<template>
  <h1>{{ title }}</h1>
  <router-view></router-view>
  <Button label="Logout" @click="logout" class="p-button-danger" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';

export default defineComponent({
  name: 'userLogin',
  data() {
    return {
      title: 'PAGE',
    };
  },
  components: {
    Button,
  },
  methods: {
    logout() {
      this.$router.push('/');
    },
  },
});
</script>
