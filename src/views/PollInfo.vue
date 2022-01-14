<template>
  <div class="wrapper">
    <div class="container">
      <div class="card-poll">
        <div class="header">
          <h1>{{ selectedPoll.header }}</h1>
        </div>
        <div class="poll-content"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { StoreModuleEnum } from '@/store/types';

export default defineComponent({
  name: 'PollInfo',
  computed: {
    ...mapGetters({
      selectedPoll: `${StoreModuleEnum.pollsStore}/getSelectedPoll`,
    }),
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  .card-poll {
    width: 100%;
    padding: 20px;
    height: auto;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
    h1 {
      text-align: center;
    }
  }
}
</style>
