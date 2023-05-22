<template>
  <div>
    <Card style="width: 20rem; margin: 2em 0">
      <template #title class="card-title">
        {{ card.title }}
        <p class="card-description">{{ card.description }}</p>
      </template>
      <template #content>
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
.card-item {
  padding: 1.25rem;
}

.card-item a {
  text-decoration: none;
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
  padding: 1.1rem 0.6rem;
  margin: 0;
  background: #fafafa;
  align-self: flex-start;
}

::v-deep(.p-button-label) {
  font-weight: 700;
  font-family: 'Open Sans', 'Montserrat', 'Helvetica', sans-serif;
  color: #3f3f46;
}

::v-deep(.p-card .p-card-content) {
  padding: 0;
}

::v-deep(.p-card .p-card-title) {
  padding: 1rem 0.5rem;
  background: #fafafa;
  display: flex;
  justify-content: center;
  font-size: 20px;
  margin: 0rem;
  flex-direction: column;
  align-items: center;
}

::v-deep(.p-card .p-card-body) {
  min-height: 19rem;
  padding: 0;
}

::v-deep(.p-button-label:hover) {
  text-shadow: 1px 1px 1px rgba(150, 150, 150, 0.5);
}

::v-deep(.p-button.p-button-link:enabled:focus) {
  background: transparent;
  box-shadow: 0 0 0 0.2rem #fafafa;
  border-color: transparent;
}
</style>
