<template>
  <div class="polls">
    <div class="add-poll-btn-wrap">
      <Button
        label="Створити опитування"
        icon="pi pi-plus"
        class="p-button-raised p-button-outlined p-button-secondary"
      />
    </div>
    <h2>Список опитувань ОСББ</h2>
    <div class="poll-list">
      <BaseCooperationPoll
        v-for="poll in cooperationPolls"
        :key="poll.id"
        :poll="poll"
        @click="setSelectedPoll(poll.id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';
import BaseCooperationPoll from '@/components/base/BaseCooperationPoll.vue';
import { PollModel } from '@/store/polls/models/poll.model';

export default defineComponent({
  name: 'CooperationPolls',
  components: {
    Button,
    BaseCooperationPoll,
  },
  mounted() {
    this.$store.dispatch('pollsStore/SET_COOPERATION_POLLS');
  },
  methods: {
    setSelectedPoll(id: number) {
      this.$store.dispatch('pollsStore/SET_SELECTED_POLL', id);
    },
  },
  computed: {
    // cooperationPolls(): Array<PollModel> {
    //   return this.$store.state.pollsStore.cooperationPolls;
    // },
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
