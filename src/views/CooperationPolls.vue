<template>
  <div class="polls">
    <div class="add-poll-btn-wrap">
      <Button
        label="Створити опитування"
        icon="pi pi-plus"
        class="p-button-raised p-button-outlined p-button-secondary"
      />
    </div>
    <div class="poll-list-wrap">
      <h2>Список опитувань ОСББ</h2>
      <div class="poll-list">
        <BaseCooperationPoll></BaseCooperationPoll>
        <BaseCooperationPoll></BaseCooperationPoll>
        <BaseCooperationPoll></BaseCooperationPoll>
        <BaseCooperationPoll></BaseCooperationPoll>
        <BaseCooperationPoll></BaseCooperationPoll>
        <BaseCooperationPoll></BaseCooperationPoll>
        <BaseCooperationPoll></BaseCooperationPoll>
        <BaseCooperationPoll></BaseCooperationPoll>
        <BaseCooperationPoll></BaseCooperationPoll>
        <BaseCooperationPoll></BaseCooperationPoll>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';
import BaseCooperationPoll from '@/components/base/BaseCooperationPoll.vue';

export default defineComponent({
  name: 'CooperationPolls',
  components: {
    Button,
    BaseCooperationPoll,
  },
});
</script>

<style scoped lang="scss">
.polls {
  //@include flex-custom(flex-start, flex-start, column);
  display: grid;
  grid-template-rows: 1fr min-content;
  height: 100vh;
}

.add-poll-btn-wrap {
  padding: 2em 0;
}

.poll-list-wrap {
  //height: 50%;
  //flex: 0 1 auto;

  .poll-list {
    @include flex-custom(space-between, center, row wrap);
    //height: 50vh;
    overflow: hidden scroll;
  }
  //margin: 0 0 2em 0;
}
</style>
