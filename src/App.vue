<template>
  <Header></Header>
  <!--  <router-view></router-view>-->
  <RegisterCooperation></RegisterCooperation>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/base/Header.vue';
import RegisterCooperation from '@/views/RegisterCooperation.vue';

export default defineComponent({
  name: 'dad',
  components: {
    Header,
    RegisterCooperation,
  },
  created() {
    this.getUsers();
  },
  data() {
    return {};
  },
  methods: {
    getUsers() {
      // this.$http.get('/users').then(console.log).catch(console.log);
      console.log(this.$store);
    },
  },
});
</script>

<style lang="scss"></style>
