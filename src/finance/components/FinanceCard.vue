<template>
  <div class="card">
    <Card style="width: 25rem; margin: 2em 0">
      <template #title class="card-title"> {{ card.title }} </template>
      <template #content>
        <p class="card-description">{{ card.description }}</p>
        <div v-for="item in card.items" :key="item.label" class="card-item">
          <router-link :to="item.to" v-slot="navigate">
            <span :class="item.icon" class="icon-style"></span>
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
.card {
  margin: 0 1.1rem 1.1rem 0;
}

.card-item {
  margin-bottom: 1rem;
}

.icon-style {
  font-size: 1.5rem;
  padding-bottom: 0.7rem;
  margin-right: 2rem;
}

.icon-style::before {
  color: #3f3f46;
}

.card-description {
  font-weight: 400;
  font-size: 11px;
  font-style: italic;
  padding: 1.1rem 0 1.1rem 0.6rem;
  background: #fafafa;
  margin: 0 0 1.5rem 0;
}

::v-deep(.p-button-label) {
  font-weight: 700;
  font-family: 'Open Sans', 'Montserrat', 'Helvetica', sans-serif;
  color: #3f3f46;
}

::v-deep(.p-card .p-card-content) {
  padding: 0 0 1.25rem 0;
}

::v-deep(.p-card .p-card-title) {
  padding: 1rem 0.5rem;
  background: #fafafa;
  display: flex;
  justify-content: center;
  font-size: 20px;
  margin: 0rem;
}
</style>
