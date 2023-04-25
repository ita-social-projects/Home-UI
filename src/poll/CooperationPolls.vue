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
      :style="{ width: '92%', 'max-width': '600px', margin: '0 auto' }"
      :modal="true"
      :closable="false"
      :dismissableMask="true"
      header="Створити опитування"
    >
      <PollForm
        :isEditing="false"
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
import Dialog from 'primevue/dialog';
import BaseCooperationPoll from '@/poll/BaseCooperationPoll.vue';
import { PollModel } from '@/poll/models/poll.model';
import { StoreModuleEnum } from '@/store/types';
import { PollsActionEnum, PollsGettersEnum } from '@/poll/store/types';
import { CooperationGettersEnum } from '@/cooperation/store/types';
import PollForm from '@/poll/PollForm.vue';

export default defineComponent({
  name: 'CooperationPolls',
  components: {
    Button,
    BaseCooperationPoll,
    Dialog,
    PollForm,
  },
  data() {
    return {
      displayCreatePollForm: false,
      isEditing: false,
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
  height: calc(100vh - 80px - 4em);
  box-sizing: border-box;
  padding: 1em;
}

.add-poll-btn-wrap {
  padding: 2em 0;
}

.poll-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 310px));
  gap: 3em 1.5em;
  justify-content: center;
  box-sizing: border-box;
}

@media (min-width: 571px) {
  .polls {
    padding: 0;
  }
}
</style>
