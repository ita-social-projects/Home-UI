<template>
  <article @click="openPageWithPollInfo(poll.id)" class="poll">
    <div class="header">{{ poll.header }}</div>
    <div class="poll-content">
      <div class="poll-field">
        <span>Статус опитування:</span>
        <div class="poll-state" :class="poll.status">{{ pollReadableStatus }}</div>
      </div>

      <div class="poll-field">
        <span>Дата початку:</span>
        <div>{{ poll.creationDate }}</div>
      </div>

      <div class="poll-field">
        <span>Дата завершення:</span>
        <div>{{ poll.completionDate }}</div>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PollModel } from '@/store/polls/models/poll.model';
import { PollStatusEnum, PollStatusType } from "@/store/polls/types";

export default defineComponent({
  name: 'BaseCooperationPoll',
  props: {
    poll: {
      type: PollModel,
      required: true,
    },
  },
  methods: {
    openPageWithPollInfo(id: any) {
      this.$router.push({
        name: 'poll-info',
        params: { id },
      });
    },
  },
  computed: {
    pollReadableStatus(): string {
      const status: PollStatusType = this.poll.status;
      return `${PollStatusEnum[status]}`;
    },
  },
});
</script>

<style scoped lang="scss">
.poll {
  user-select: none;
  background-color: #ffffff;
  border-radius: 1em;
  filter: drop-shadow(0 0 1px #00000020) drop-shadow(2px 1px 1px #00000020);
  transition: all 0.2s;
  cursor: pointer;
  box-sizing: border-box;

  .header {
    @include flex-center-all();
    padding: 0.8em;
    font-size: 1.3em;
    height: 3.6em;
    line-height: 1.3em;
    font-weight: bold;
    border-radius: 1rem 1rem 0 0;
    background-color: #aaaaaa20;
    box-sizing: border-box;
  }

  .poll-content {
    padding: 2em;
    border-radius: 0 0 1em 1em;

    .poll-field {
      @include flex-custom(space-between, center);
      padding: 0.4em 0;

      span {
        font-weight: 700;
      }
    }

    .poll-state {
      padding: 0.4em 1em;
      border-radius: 0.8em;

      &.draft {
        background-color: rgba(122, 122, 125, 0.25);
      }

      &.active {
        background-color: rgba(59, 246, 78, 0.25);
      }

      &.completed {
        background-color: rgba(248, 157, 60, 0.25);
      }
    }
  }

  &:hover {
    filter: drop-shadow(0 0 1px #00000010) drop-shadow(4px 4px 4px #00000040);
  }
}
</style>
