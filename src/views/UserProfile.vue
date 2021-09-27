<template>
  <table class="table">
    <thead>
      <tr>
        <th>Iм'я</th>
        <th>Прізвище</th>
        <th>E-mail</th>
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
