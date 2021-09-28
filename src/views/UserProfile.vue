<template>
  <table class="table">
    <thead>
      <tr>
        <th>Iм'я</th>
        <th>Прізвище</th>
        <th>E-mail</th>
        <th>Контакти</th>
      </tr>
      <tr>
        <td>{{ userData.first_name }}</td>
        <td>{{ userData.last_name }}</td>
        <td>{{ userData.email }}</td>
        <td>{{ userData.contacts }}</td>
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
    userData() {
      return this.$store.getters['userStore/userData'];
    },
  },
});
</script>

<style lang="scss" scoped>
.table {
  margin: auto;
  margin-top: 50px;
  border-collapse: collapse;
  & th {
    padding: 28px;
    text-align: left;
    background-color: #04aa6d;
    color: white;
  }
  td,
  th {
    border: 1px solid black;
    padding: 18px;
  }
}
</style>
