<template>
  <router-view> </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'dad',
  created() {
    this.getUsers()
  },
  data() {
    return {}
  },
  methods: {
    getUsers() {
      // this.$http.get('/users').then(console.log).catch(console.log)
      console.log(this.$store)
    },
  },
})
</script>

<style lang="scss"></style>
