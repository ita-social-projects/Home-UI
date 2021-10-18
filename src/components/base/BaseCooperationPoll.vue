<template>
  <article class="poll">
    <div class="header">Опрос Опросович</div>
    <div class="poll-content">
      <div class="poll-field">
        Статус:
        <div class="poll-state completed">статус</div>
      </div>

      <div class="poll-field">
        Дата початку:
        <div>14,10,2021</div>
      </div>

      <div class="poll-field">
        Дата завершення:
        <div>29,10,2021</div>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseCooperationPoll',
});
</script>

<style scoped lang="scss">
.poll {
  //width: 90%;
  //margin: 2em 0;
  user-select: none;
  background-color: #ffffff;
  border-radius: 1em;
  filter: drop-shadow(2px 1px 1px #00000040);
  cursor: pointer;

  .header {
    @include flex-center-all();
    padding: 0.8em;
    font-size: 1.1em;
    font-weight: bold;
    border-radius: 1em 1em 0 0;
    background-color: #aaaaaa20;
  }

  .poll-content {
    padding: 2em;
    border: 1px solid #aaaaaa20;
    border-radius: 0 0 1em 1em;

    .poll-field {
      @include flex-custom(space-between, center);
      padding: 0.4em 0;
    }

    .poll-state {
      padding: 0.4em 1em;
      background-color: rgba(59, 130, 246, 0.25);
      border-radius: 0.8em;

      &.draft {
        background-color: rgba(122, 122, 125, 0.25);
      }

      &.active {
        background-color: rgba(59, 130, 246, 0.25);
      }

      &.completed {
        background-color: rgba(248, 157, 60, 0.25);
      }
    }
  }

  &:hover {
    filter: drop-shadow(4px 6px 4px #00000040);
  }
}
</style>
