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
      <div class="input-section">
        <label class="dialog-item" for="poll_title">Заголовок: </label>
        <InputText class="input-poll" id="poll_title" placeholder="Заголовок" v-model.trim="pollData.title" />
      </div>
      <div class="input-section">
        <label class="dialog-item" for="poll_description">Опис: </label>
        <Textarea id="poll_description" placeholder="Детальний опис" v-model.trim="pollData.description" rows="8" />
      </div>
      <div class="input-section">
        <label class="dialog-item" for="poll_polledHouses">Список будинків: </label>
        <div class="checkbox-section">
          <div v-for="house of houses" :key="house.id" class="p-field-checkbox">
            <Checkbox :id="house.id" name="category" :value="house" v-model="pollData.polledHouses" />
            <label class="house-label" :for="house.id">
              {{ house.address?.houseNumber }}, {{ house.address?.houseBlock }}, {{ house.address?.district }},
              {{ house.address?.street }}
            </label>
          </div>
        </div>
      </div>
      <div class="input-section">
        <label class="dialog-item" for="caledar-begin">Дата початку:</label>
        <Calendar id="caledar-begin" v-model="pollData.creationDate" :showIcon="true" dateFormat="dd.mm.yy" />
      </div>
      <div class="input-section">
        <label class="dialog-item" for="calendar-finish">Дата закінчення:</label>
        <Calendar id="calendar-finish" v-model="pollData.completionDate" :showIcon="true" dateFormat="dd.mm.yy" />
      </div>
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
import { callWithAsyncErrorHandling, defineComponent } from 'vue';
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
import {
  requiredValidator,
  pollTitleLenghtValidator,
  pollDescriptionLenghtValidator,
  pollQuestionLenghtValidator,
  cyrillicLangTitleValidator,
} from '@/utils/validators';
import { HousesActionsEnum, HousesGettersEnum } from '@/store/houses/types';
import { HouseModel } from '@/shared/models/house.model';
import Calendar from 'primevue/calendar';
import Checkbox from 'primevue/checkbox';
import Textarea from 'primevue/textarea';

export default defineComponent({
  name: 'BaseCooperationPoll',
  components: {
    Button,
    Menu,
    Column,
    ConfirmPopup,
    Dialog,
    InputText,
    Calendar,
    Checkbox,
    Textarea,
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
        title: '',
        description: '',
        polledHouses: [],
        creationDate: '',
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
  validations() {
    return {
      pollData: {
        title: { requiredValidator, pollTitleLenghtValidator, cyrillicLangTitleValidator },
        description: { requiredValidator, pollDescriptionLenghtValidator, cyrillicLangTitleValidator },
        question: { requiredValidator, pollQuestionLenghtValidator, cyrillicLangTitleValidator },
        polledHouses: { requiredValidator },
        creationDate: { requiredValidator },
        completionDate: { requiredValidator },
      },
    };
  },
  mounted() {
    try {
      this.$store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.SET_HOUSES}`, this.cooperationId);
    } catch {
      console.log('error was caught during mounting BaseCooperationPoll');
    }
  },
  methods: {
    async initData() {
      await this.$store.dispatch(
        `${StoreModuleEnum.pollsStore}/${PollsActionEnum.SET_SELECTED_POLL}`,
        this.$props.poll.id
      );

      this.pollData.title = this.selectedPoll.header;
      // this.pollData.description = this.selectedPoll?.description;
      this.pollData.description = 'Lorem lorem loerm lorem lioren hzagsh sjjxjxjx iiaxuxbc suhs';
      this.pollData.polledHouses = this.selectedPoll?.polledHouses;
      this.pollData.creationDate = this.selectedPoll?.creationDate;
      this.pollData.completionDate = this.selectedPoll?.completionDate;
    },
    openPageWithPollInfo(id: any) {
      this.$router.push({
        name: 'poll-info',
        params: { id: id },
      });
    },
    checkStatus(status: string): boolean {
      if (status === 'active') {
        this.showFailOperation('видалено або редаговано');
        return true;
      }
      return false;
    },
    toggle(event: any): void {
      event.stopPropagation();
      (this.$refs.menu as any).toggle(event);
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
          };

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
      this.initData();
    },
    async editPoll() {
      const createDate = new Date('05 October 2022 14:48 UTC');
      const compeDate = new Date('12 October 2022 14:48 UTC');

      const payload = {
        header: this.pollData.title,
        description: this.pollData.description,
        creationDate: createDate.toISOString(),
        completionDate: compeDate.toISOString(),
        status: this.$props.poll.status,
        polledHouses: this.pollData.polledHouses,
      };
      const ids = { cooperationId: this.cooperationId, pollId: this.$props.poll.id };

      await this.$store.dispatch(`${StoreModuleEnum.pollsStore}/${PollsActionEnum.UPDATE_POLL}`, {
        payload,
        ids,
      });
      this.showSuccessOperation('редаговано');
      this.displayEditPollModal = false;
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
      const statusMap = {
        draft: 'Чернетка',
        active: 'Активне',
        completed: 'Завершене',
        suspended: 'sus pen ded',
        noStatus: '',
      };
      return statusMap[this.poll.status];
    },
    houses(): Array<HouseModel> {
      return this.$store.getters[`${StoreModuleEnum.housesStore}/${HousesGettersEnum.getHousesData}`];
    },
    ...mapGetters({
      cooperationId: `${StoreModuleEnum.cooperationStore}/${CooperationGettersEnum.getSelectedCooperationId}`,
      selectedPoll: `${StoreModuleEnum.pollsStore}/${PollsGettersEnum.getSelectedPoll}`,
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

.p-inputtext.p-component {
  width: 400px;
}
.input-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
.checkbox-section {
  border: 1px solid #d4d4d8;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  padding: 15px;
  width: 400px;
  height: 140px;
  overflow: auto;
}
.p-field-checkbox {
  height: 30px;
}
.p-calendar {
  width: 200px;
}
</style>
