<template>
  <div class="polls">
    <div class="add-poll-btn-wrap">
      <Button
        label="Створити опитування"
        icon="pi pi-plus"
        class="p-button-raised p-button-outlined p-button-secondary"
        @click="displayCreatePollForm = true"
      />
    </div>
    <h2>Список опитувань ОСББ</h2>
    <div class="poll-list">
      <BaseCooperationPoll v-for="poll in cooperationPolls" :key="poll.id" :poll="poll" />
    </div>
    <Dialog
      v-model:visible="displayCreatePollModal"
      :style="{ width: '580px' }"
      :modal="true"
      :closable="false"
      :dismissableMask="true"
      header="Створити опитування"
    >
      <CreatePollForm
        :cooperationId="cooperationId"
        @cancel-creating-poll="displayCreatePollForm = false"
        @create-poll="displayCreatePollForm = false"
      />
    </Dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';
import BaseCooperationPoll from '@/components/base/BaseCooperationPoll.vue';
import CreatePollForm from '@/components/CreatePollForm.vue';
import { PollModel } from '@/store/polls/models/poll.model';
import { StoreModuleEnum } from '@/store/types';
import { PollsActionEnum, PollsGettersEnum } from '@/store/polls/types';
import Dialog from 'primevue/dialog';
import { CooperationGettersEnum } from '@/cooperation/store/types';

export default defineComponent({
  name: 'CooperationPolls',
  components: {
    Button,
    BaseCooperationPoll,
    Dialog,
    CreatePollForm,
  },
  data() {
    return {
      displayCreatePollForm: false,
    };
  },
  mounted() {
    this.$store.dispatch(`${StoreModuleEnum.pollsStore}/${PollsActionEnum.SET_COOPERATION_POLLS}`, this.cooperationId);
  },
  computed: {
    cooperationId(): number {
      return this.$store.getters[
        `${StoreModuleEnum.cooperationStore}/${CooperationGettersEnum.getSelectedCooperationId}`
      ];
    },
    cooperationPolls(): Array<PollModel> {
      return this.$store.getters[`${StoreModuleEnum.pollsStore}/${PollsGettersEnum.getPolls}`];
    },
    displayCreatePollModal(): boolean {
      return this.displayCreatePollForm;
    },
  },
});
</script>

<style scoped lang="scss">
.polls {
  @include flex-custom(flex-start, flex-start, column);
  height: calc(100vh - 80px - 4em);
  box-sizing: border-box;
}

.add-poll-btn-wrap {
  padding: 2em 0;
}

.poll-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4em 2.5em;
  width: 100%;
  flex: 2;
  padding: 0 1em 1em 0.4em;
  box-sizing: border-box;
  overflow: hidden scroll;
}
</style>
