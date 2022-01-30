<template>
  <div v-show="dataReady" class="wrapper">
    <div class="container">
      <div class="card-poll">
        <div class="header">
          <div class="poll-title">{{ pollInfo.header }}</div>
          <div class="poll-state" :class="pollInfo.status">{{ pollReadableStatus }}</div>
        </div>
        <div class="poll-content-data">
          <div class="poll-content_name">
            <strong>Дата початку:</strong>
          </div>
          <div class="poll-description">
            {{ pollInfo.creationDate }}
          </div>
        </div>
        <div class="poll-content-data">
          <div class="poll-content_name">
            <strong>Дата завершення:</strong>
          </div>
          <div class="poll-description">
            {{ pollInfo.completionDate }}
          </div>
        </div>
        <div v-if="pollInfo.status !== 'draft'" class="poll-content-data">
          <div class="poll-content_name">
            <strong>Кількість голосів:</strong>
          </div>
          <div class="poll-description">
            <span class="poll-state yes">За: 10</span>
            <span class="poll-state no">Проти: 7</span>
          </div>
        </div>
        <div class="poll-content-description">
          <div class="poll-content_name">
            <strong>Повний опис опитування:</strong>
          </div>
          <div class="poll-description">
            <p class="poll-description_text">
              <!--              {{ pollInfo.description }}-->
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, aut commodi consequatur corporis
              culpa cupiditate dolores eos incidunt inventore laboriosam maiores molestias odio quae quibusdam rem
              reprehenderit tempore voluptate! Ab.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut deserunt ex inventore optio quia,
              veniam? Atque dignissimos doloribus esse magni minima modi nesciunt quisquam sunt vitae? Magni sunt,
              veritatis!
            </p>
          </div>
        </div>
      </div>
      <div class="footer">
        <Button id="cancel-button" label="Всi опитування" @click="returnAllPollsPage" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { StoreModuleEnum } from '@/store/types';
import Button from 'primevue/button';
import { RoutesEnum } from '@/router/types';
import { PollsActionEnum, PollStatusEnum, PollStatusType } from '@/store/polls/types';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'PollInfo',
  components: { Button },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dataReady: false,
    };
  },
  async mounted() {
    await this.$store.dispatch(`${StoreModuleEnum.pollsStore}/${PollsActionEnum.SET_POll_BY_ID}`, this.id);
    this.dataReady = true;
  },
  methods: {
    returnAllPollsPage() {
      this.$router.push(RoutesEnum.Polls);
    },
  },

  computed: {
    ...mapGetters({
      pollInfo: `${StoreModuleEnum.pollsStore}/getSelectedPoll`,
    }),
    pollReadableStatus(): string {
      const status: PollStatusType = this.pollInfo.status;
      return `${PollStatusEnum[status]}`;
    },
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  border-radius: 4px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
  .card-poll {
    width: 90%;
    padding: 20px;
    height: auto;
    margin: 0 auto;
    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 35px;
      border-bottom: 1px solid #e5e5e5;
      .poll-title {
        font-size: 35px;
        font-weight: bold;
        margin-right: 15px;
      }
    }
    .poll-state {
      padding: 0.4em 1em;
      border-radius: 0.8em;
      font-size: 15px;
      &.draft {
        background-color: rgba(122, 122, 125, 0.25);
      }

      &.active {
        background-color: rgba(59, 246, 78, 0.25);
      }

      &.completed {
        background-color: rgba(248, 157, 60, 0.25);
      }
      &.yes {
        background-color: rgba(16, 197, 25, 0.85);
        color: #fff;
        margin-right: 20px;
      }

      &.no {
        background-color: rgb(187, 13, 13);
        color: #fff;
      }
    }

    .poll-content-description,
    .poll-content-data {
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      padding: 15px;
      border-bottom: 1px solid #e5e5e5;
      .poll-content_name {
        margin-right: 20px;
        min-width: 250px;
      }
      .poll-description_text {
        margin: 0;
      }
    }

    .poll-content-data {
      justify-content: start;
      .poll-content_name {
        margin-top: 0;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
