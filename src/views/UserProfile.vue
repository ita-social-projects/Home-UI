<template>
  <table class="table">
    <thead>
      <tr>
        <th>Iм'я</th>
        <th>Прізвище</th>
        <th>E-mail</th>
      </tr>
      <tr>
        <td>{{ userName }}</td>
      </tr>
    </thead>
    <tbody>
      <tr></tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'userProfile',
  computed: {
    userName: {
      get(): string {
        return this.$store.state.userStore.user.first_name;
      },
      set(value): void {
        this.$store.commit('userStore/UserMutation.SET_USER', value);
      },
    },
  },
});
</script>

<style lang="scss" scoped>
.table {
  margin: auto;
  border-collapse: collapse;
  & th {
    padding: 12px;
    text-align: left;
    background-color: #04aa6d;
    color: white;
  }
  td,
  th {
    border: 1px solid black;
    padding: 8px;
  }
}
</style>
