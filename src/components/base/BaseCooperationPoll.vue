<template>
  <article class="poll">
    <div class="header">Опрос Опросович</div>
    <div class="poll-content">
      <div class="poll-field">
        Статус:
        <div>статус</div>
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
  width: 30%;
  margin: 2em 0;
  user-select: none;
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
    border: 2px solid #aaaaaa20;
    border-radius: 0 0 1em 1em;

    .poll-field {
      @include flex-custom(space-between, center);
      padding: 0.4em 0;
    }
  }
}
</style>
