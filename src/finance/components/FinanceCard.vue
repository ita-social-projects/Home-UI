<template>
  <div>
    <Card style="width: 25rem; margin: 2em 0">
      <template #title class="title"> {{ card.title }} </template>
      <template #content>
        <div v-for="item in card.items" :key="item.label">
          <router-link :to="item.to" v-slot="navigate">
            <span :class="item.icon" style="font-size: 1.25rem"></span>
            <Button :label="item.label" class="p-button-link" @click="navigate" />
          </router-link>
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import Card from 'primevue/card';
import Button from 'primevue/button';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    Card,
    Button,
  },
  name: 'FinanceCard',
  props: {
    card: {
      required: true,
      type: Object,
    },
  },
});
</script>

<style lang="scss" scoped>
p {
  line-height: 1.5;
  margin: 0;
}
</style>
