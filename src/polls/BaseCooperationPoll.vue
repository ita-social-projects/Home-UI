<template>
  <article @click="openPageWithPollInfo(poll.id)" class="poll">
    <div class="header">
      {{ poll.header }}
      <div class="settings-btn">
        <Button
          icon="pi pi-cog"
          class="p-button p-button-info p-button-text"
          type="button"
          aria-haspopup="true"
          aria-controls="overlay_menu"
          @click="toggle($event)"
        />
        <Menu :model="pollActions()" id="overlay_menu" ref="menu" :popup="true" />
      </div>

      <ConfirmPopup></ConfirmPopup>
    </div>

    <div class="poll-content">
      <div class="poll-field">
        <span>Статус опитування:</span>
        <div class="poll-state" :class="poll.status">{{ pollReadableStatus }}</div>
      </div>

      <div class="poll-field">
        <span>Дата початку:</span>
        <div>{{ poll.creationDate.toLocaleString('uk-UA') }}</div>
      </div>

      <div class="poll-field">
        <span>Дата завершення:</span>
        <div>{{ poll.completionDate.toLocaleString('uk-UA') }}</div>
      </div>

      <div class="poll-field">
        <span>Результати опитування:</span>
        <div>
          <i class="pi pi-thumbs-up" style="color: green"></i>&nbsp; {{ poll.results.yes }} &nbsp; &nbsp;<i
            class="pi pi-thumbs-down"
            style="color: red"
          ></i
          >&nbsp; {{ poll.results.no }}
        </div>
      </div>
    </div>
  </article>

  <Dialog
    header="Редагувати опитування"
    v-model:visible="displayEditPollModal"
    :style="{ width: '580px' }"
    :modal="true"
    :closable="false"
    :dismissableMask="true"
  >
    <!-- <EditCooperationPollForm
      :poll="$props.poll"
      :displayEditPollModal="displayEditPollModal"
      @close-edit-poll="displayEditPollModal = false"
      :showSuccessOperation="showSuccessOperation"
    ></EditCooperationPollForm> -->
    <PollForm
      :isEditing="true"
      :poll="$props.poll"
      @close-edit-poll="displayEditPollModal = false"
      :showSuccessOperation="showSuccessOperation"
    ></PollForm>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, VueElement } from 'vue';
import { mapGetters } from 'vuex';
import { PollModelWithResults } from '@/polls/models/poll.model';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import { StoreModuleEnum } from '@/store/types';
import { DeletePollPayloadInterface, PollsActionEnum, PollStatusEnum, PollStatusType } from '@/polls/store/types';
import { CooperationGettersEnum } from '@/cooperation/store/types';
import ConfirmPopup from 'primevue/confirmpopup';
import Dialog from 'primevue/dialog';
import EditCooperationPollForm from '@/polls/EditCooperationPollForm.vue';
import PollForm from '@/polls/PollForm.vue';

export default defineComponent({
  name: 'BaseCooperationPoll',
  components: {
    Button,
    Menu,
    ConfirmPopup,
    Dialog,
    PollForm,
    EditCooperationPollForm,
  },
  props: {
    poll: {
      type: PollModelWithResults,
      required: true,
    },
  },

  data() {
    return {
      pollActions: () => {
        return [
          {
            label: 'Видалити опитування',
            icon: 'pi pi-times',
            type: 'Submit',
            command: () => {
              this.confirmDeletePoll(event as Event);
            },
          },
          {
            label: 'Редагувати опитування',
            icon: 'pi pi-user-edit',
            command: () => {
              this.openEditPollModal();
            },
          },
        ];
      },
      displayEditPollModal: false,
      isEditing: false,
    };
  },
  methods: {
    openPageWithPollInfo(id: any) {
      this.$router.push({
        name: 'poll-info',
        params: { id: id },
      });
    },
    checkStatus(status: string): boolean {
      if (status !== 'draft') {
        this.showFailOperation('видалено або редаговано');
        return true;
      }
      return false;
    },
    toggle(event: Event): void {
      event.stopPropagation();
      (this.$refs.menu as VueElement & { toggle: (event: Event) => void }).toggle(event);
    },
    confirmDeletePoll(event: Event) {
      if (this.checkStatus(this.$props.poll.status)) return;

      this.$confirm.require({
        target: event.currentTarget,
        message: 'Видалити обране опитування?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Так',
        rejectLabel: 'Ні',

        accept: async () => {
          const payload = {
            cooperationId: this.cooperationId,
            pollId: this.$props.poll.id,
          } as DeletePollPayloadInterface;

          await this.$store.dispatch(`${StoreModuleEnum.pollsStore}/${PollsActionEnum.DELETE_POLL}`, payload);
          this.showSuccessOperation('видалено');
        },
        reject: () => {
          console.log('rejected delete', this.$props.poll.id);
        },
      });
    },
    openEditPollModal() {
      if (this.checkStatus(this.$props.poll.status)) return;

      this.displayEditPollModal = true;
    },
    showSuccessOperation(info: string) {
      this.$toast.add({
        severity: 'success',
        summary: 'Успішно',
        detail: `Опитування успішно ${info}!`,
        life: 3000,
      });
    },
    showFailOperation(info: string) {
      this.$toast.add({
        severity: 'warn',
        summary: 'Запит відхилений',
        detail: `На жаль, активне опитування не може бути ${info}!`,
        life: 3000,
      });
    },
  },

  computed: {
    pollReadableStatus(): string {
      const status: PollStatusType = this.poll.status;
      return `${PollStatusEnum[status]}`;
    },
    ...mapGetters({
      cooperationId: `${StoreModuleEnum.cooperationStore}/${CooperationGettersEnum.getSelectedCooperationId}`,
    }),
  },
});
</script>

<style scoped lang="scss">
.poll {
  user-select: none;
  background-color: #ffffff;
  border-radius: 1em;
  position: relative;
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
    .settings-btn {
      position: absolute;
      right: 10px;
      padding-left: 20px;
      top: 5px;
    }
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
