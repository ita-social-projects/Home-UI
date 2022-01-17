<template>
  <article @click="openPageWithPollInfo(poll.id)" class="poll">
    <div class="header">
      {{ poll.header }}

      <div class="settings-btn">
        <Button
          icon="pi pi-cog"
          class="p-button p-button-info p-button-text"
          type="button"
          @click="toggle($event)"
          aria-haspopup="true"
          aria-controls="overlay_menu"
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
        <div>{{ poll.creationDate }}</div>
      </div>

      <div class="poll-field">
        <span>Дата завершення:</span>
        <div>{{ poll.completionDate }}</div>
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
    <form>
      <p>
        <label class="dialog-item" for="pollName">Назва опитування : </label>
        <InputText
          id="pollName"
          placeholder="Назва опитування"
          v-model.trim="selectedPoll.header"
          @input="disabled = false"
        />
      </p>
      <p>
        <label class="dialog-item" for="">Дата завершення : </label>
        <InputText
          id="completionDate"
          placeholder="Дата завершення"
          v-model="selectedPoll.completionDate"
          @input="disabled = false"
        />
      </p>
    </form>
    <div class="buttons-container">
      <Button label="Зберегти зміни" icon="pi pi-check" @click="editPoll" autofocus class="p-button-info" />
      <Button
        label="Скасувати"
        icon="pi pi-times"
        @click="displayEditPollModal = false"
        class="p-button-outlined p-button-info"
      />
    </div>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { PollModel } from '@/store/polls/models/poll.model';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import Column from 'primevue/column';
import { StoreModuleEnum } from '@/store/types';
import { PollsActionEnum, PollsGettersEnum } from '@/store/polls/types';
import { CooperationGettersEnum } from '@/store/cooperation/types';
import ConfirmPopup from 'primevue/confirmpopup';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';

export default defineComponent({
  name: 'BaseCooperationPoll',
  components: {
    Button,
    Menu,
    Column,
    ConfirmPopup,
    Dialog,
    InputText,
  },
  props: {
    poll: {
      type: PollModel,
      required: true,
    },
  },
  data() {
    return {
      pollData: {
        name: '',
        completionDate: '',
      },
      pollActions: () => {
        return [
          {
            label: 'Видалити опитування',
            icon: 'pi pi-times',
            type: 'Submit',
            command: () => {
              this.confirmDeletePoll(event);
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
      display: false,
    };
  },
  methods: {
    openPageWithPollInfo(id: any) {
      this.$router.push({
        name: 'poll-info',
        params: { id: id },
      });
    },
    toggle(event: any): void {
      event.stopPropagation();
      (this.$refs.menu as any).toggle(event);
    },
    confirmDeletePoll(event: Event) {
      // check rules out
      if (this.$props.poll.status === 'active') {
        this.showFailDelete();
        return;
      }
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
          };
          await this.$store.dispatch(`${StoreModuleEnum.pollsStore}/${PollsActionEnum.DELETE_POLL}`, payload);
          this.showSuccessDelete();
        },
        reject: () => {
          console.log('rejected delete', this.$props.poll.id);
        },
      });
    },
    openEditPollModal() {
      this.displayEditPollModal = true;
    },
    async editPoll() {
      const payload = {
        cooperationId: this.cooperationId,
        pollId: this.$props.poll.id,
        header: this.$props.poll.header,
        completionDate: this.$props.poll.completionDate,
        status: this.$props.poll.status,
      };
      await this.$store.dispatch(`${StoreModuleEnum.pollsStore}/${PollsActionEnum.UPDATE_POLL}`, payload);
    },
    showSuccessDelete() {
      this.$toast.add({
        severity: 'success',
        summary: 'Успішно',
        detail: `Опитування успішно видалено!`,
        life: 3000,
      });
    },
    showFailDelete() {
      this.$toast.add({
        severity: 'warn',
        summary: 'Запит відхилений',
        detail: `На жаль, активне опитування не може бути видалено!`,
        life: 3000,
      });
    },
  },
  computed: {
    pollReadableStatus(): string {
      const statusMap = {
        draft: 'Чернетка',
        active: 'Активне',
        completed: 'Завершене',
        suspended: 'sus pen ded',
        noStatus: '',
      };
      return statusMap[this.poll.status];
    },
    ...mapGetters({
      cooperationId: `${StoreModuleEnum.cooperationStore}/${CooperationGettersEnum.getSelectedCooperationId}`,
      selectedPoll: `${StoreModuleEnum.pollsStore}/${PollsGettersEnum.getPollByID}`,
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
.buttons-container {
  float: right;
  .p-button-outlined {
    margin-left: 20px;
  }
}
.dialog-item {
  display: inline-block;
  width: 260px;
}
</style>
