<template>
  <form>
    <div class="input-section">
      <label class="dialog-item" for="poll_title">Заголовок: </label>
      <InputText
        class="input-poll"
        id="poll_title"
        placeholder="Заголовок"
        v-model.trim="pollData.title"
        :class="{
          'p-invalid': v$.pollData.title.$error,
        }"
        @blur="v$.pollData.title.$touch"
        @input="disabled = false"
      />
      <small v-if="v$.pollData.title.$error" id="poll_title" class="p-error">{{
        v$.pollData.title.$errors[0].$message
      }}</small>
    </div>

    <div class="input-section">
      <label class="dialog-item" for="poll_description">Опис: </label>
      <Textarea
        id="poll_description"
        placeholder="Детальний опис"
        v-model.trim="pollData.description"
        rows="8"
        :class="{
          'p-invalid': v$.pollData.description.$error,
        }"
        @blur="v$.pollData.description.$touch"
        @input="disabled = false"
      />
      <small v-if="v$.pollData.description.$error" id="poll_description" class="p-error">{{
        v$.pollData.description.$errors[0].$message
      }}</small>
    </div>

    <div class="input-section">
      <label class="dialog-item" for="poll_polledHouses">Список будинків: </label>
      <div class="checkbox-section">
        <div v-for="house of houses" :key="house.id" class="p-field-checkbox">
          <Checkbox
            :id="house.id"
            name="category"
            :value="house"
            v-model="pollData.polledHouses"
            @input="disabled = false"
          />
          <label class="house-label" :for="house.id">
            {{ house.address?.houseNumber }}, {{ house.address?.houseBlock }}, {{ house.address?.district }},
            {{ house.address?.street }}
          </label>
        </div>
      </div>
      <small v-if="v$.pollData.polledHouses.$error" id="poll_polledHouses" class="p-error">{{
        v$.pollData.polledHouses.$errors[0].$message
      }}</small>
    </div>

    <div class="input-section">
      <label class="dialog-item" for="caledar-begin">Дата початку:</label>
      <Calendar
        id="caledar-begin"
        v-model="pollData.creationDate"
        :showIcon="true"
        dateFormat="dd.mm.yy"
        @date-select="onCreationDateChange, (isSelected = true)"
      />
      <small v-if="isSelected" id="poll_creationDate" class="p-error">
        Переконайтесь, що дата стоїть не раніше аніж завтра
      </small>
    </div>

    <div class="input-section">
      <label class="dialog-item" for="calendar-finish">Дата закінчення:</label>
      <Calendar
        id="calendar-finish"
        v-model="pollData.completionDate"
        :showIcon="true"
        dateFormat="dd.mm.yy"
        @date-select="disabled = false"
      />
      <small id="apartment_area_help" class="p-warning">виставляється автоматично 15 днів з дати початку</small>
    </div>
  </form>

  <div class="buttons-container">
    <Button
      label="Зберегти зміни"
      icon="pi pi-check"
      @click="editPoll"
      autofocus
      class="p-button-info"
      :disabled="disabled || v$.pollData.$invalid"
    />
    <Button
      label="Скасувати"
      icon="pi pi-times"
      @click="this.$emit('close-edit-poll')"
      class="p-button-outlined p-button-info"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Checkbox from 'primevue/checkbox';
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
import {
  requiredValidator,
  pollTitleLenghtValidator,
  pollDescriptionLenghtValidator,
  cyrillicLangTitleValidator,
} from '@/utils/validators';
import { StoreModuleEnum } from '@/store/types';
import { HousesActionsEnum, HousesGettersEnum } from '@/store/houses/types';
import { CooperationGettersEnum } from '@/store/cooperation/types';
import { PollsActionEnum, PollsGettersEnum, PutPollInterface } from '@/store/polls/types';
import { PollModel } from '@/store/polls/models/poll.model';
import useVuelidate from '@vuelidate/core';

export default defineComponent({
  name: 'EditCooperationPollForm',
  components: {
    Button,
    Calendar,
    Checkbox,
    Textarea,
    InputText,
  },
  data() {
    return {
      pollData: {
        title: '',
        description: '',
        polledHouses: [],
        creationDate: new Date(),
        completionDate: new Date(),
      },
      disabled: true,
      isSelected: false,
      v$: useVuelidate(),
    };
  },
  props: {
    poll: {
      type: PollModel,
      required: true,
    },
    displayEditPollModal: {
      type: Boolean,
      required: true,
    },
    showSuccessOperation: {
      type: Function,
      required: true,
    },
  },
  validations() {
    return {
      pollData: {
        title: { requiredValidator, pollTitleLenghtValidator, cyrillicLangTitleValidator },
        description: { requiredValidator, pollDescriptionLenghtValidator, cyrillicLangTitleValidator },
        polledHouses: { requiredValidator },
      },
    };
  },
  mounted() {
    try {
      this.$store.dispatch(`${StoreModuleEnum.housesStore}/${HousesActionsEnum.SET_HOUSES}`, this.cooperationId);
      this.initData();
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
    async editPoll() {
      const createDate = new Date('05 October 2022 14:48 UTC');
      const compeDate = new Date('18 October 2022 14:48 UTC');

      const payload = {
        header: this.pollData.title,
        description: this.pollData.description,
        creationDate: createDate.toISOString(),
        completionDate: compeDate.toISOString(),
        status: this.$props.poll.status,
        polledHouses: this.pollData.polledHouses,
      } as PutPollInterface;

      const ids = { cooperationId: this.cooperationId, pollId: this.$props.poll.id };

      await this.$store.dispatch(`${StoreModuleEnum.pollsStore}/${PollsActionEnum.UPDATE_POLL}`, {
        payload,
        ids,
      });
      this.$props.showSuccessOperation('редаговано');
      this.$emit('close-edit-poll');
    },
    onCreationDateChange() {
      // const dateTomorrow = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate() + 1);
      // if (this.pollData.creationDate < now) {
      //   this.disabled = true;
      //   return;
      // }
      this.disabled = false;
    },
  },
  computed: {
    ...mapGetters({
      cooperationId: `${StoreModuleEnum.cooperationStore}/${CooperationGettersEnum.getSelectedCooperationId}`,
      selectedPoll: `${StoreModuleEnum.pollsStore}/${PollsGettersEnum.getSelectedPoll}`,
      houses: `${StoreModuleEnum.housesStore}/${HousesGettersEnum.getHousesData}`,
    }),
  },
});
</script>

<style scoped lang="scss">
.buttons-container {
  float: right;
  .p-button-outlined {
    margin-left: 20px;
  }
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
.dialog-item {
  display: inline-block;
  width: 260px;
}

.p-inputtext.p-component {
  width: 400px;
}
</style>
