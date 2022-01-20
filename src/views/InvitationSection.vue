<template>
  <div class="create_btn">
    <Button
      label="Створити запрошення"
      icon="pi pi-pencil"
      class="p-button-outlined p-button-info"
      @click="this.displayCreateInvitModal = true"
    />
    <Dialog
      header="Створити запрошення"
      v-model:visible="displayModal"
      :style="{ width: '600px' }"
      :modal="true"
      :closable="false"
      :dismissableMask="true"
    >
      <CreateInvitationForm
        @close-invitation-modal="this.displayCreateInvitModal = false"
        @create-invitation="correctStatus"
      ></CreateInvitationForm>
    </Dialog>
  </div>

  <div class="container">
    <h1 class="page-title">{{ title }}</h1>
    <div class="container-invitations">
      <DataTable :value="invitationsList" responsiveLayout="scroll">
        <template #header>
          <span class="p-input-icon-right search-field">
            <i class="pi pi-search" />
            <InputText placeholder="Введіть електронну адресу" />
          </span>
        </template>
        <Column field="email" style="min-width: 20rem" header="Email" :sortable="true" />
        <Column field="address" style="min-width: 25rem" header="Адреса" :sortable="true">
          <template #body="slotProps">
            {{ slotProps.data.apartment.address.street }}, {{ slotProps.data.apartment.address.houseBlock }},
            {{ slotProps.data.apartment.address.houseNumber }}
          </template>
        </Column>
        <Column field="status" style="min-width: 15rem" header="Статус" :sortable="true" />
        <Column style="min-width: 10rem" header="Опції">
          <template #body="slotProps">
            <Button
              icon="pi pi-cog"
              class="p-button p-button-info p-button-text"
              type="button"
              @click="toggle($event, slotProps.data)"
              aria-haspopup="true"
              aria-controls="overlay_menu"
            />
            <Menu :model="invitationActions()" id="overlay_menu" ref="menu" :popup="true" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Menu from 'primevue/menu';
import Dialog from 'primevue/dialog';
import CreateInvitationForm from '@/components/CreateInvitationForm.vue';
import InputText from 'primevue/inputtext';
import { StoreModuleEnum } from '@/store/types';
import {
  InvitationsGettersEnum,
  InvitationsActionsEnum,
  InvitationStatusType,
  InvitationStatusEnum,
} from '@/store/invitations/types';
import { mapGetters } from 'vuex';
import { InvitationModel } from '@/store/invitations/models/invitations.model';

export default defineComponent({
  name: 'InvitationSection',
  components: {
    Button,
    DataTable,
    Column,
    Menu,
    CreateInvitationForm,
    InputText,
    Dialog,
  },
  data() {
    return {
      title: 'Список запрошень',
      invitationActions: () => {
        return [
          {
            label: 'Видалити запрошення',
            icon: 'pi pi-times',
            command: () => {
              this.deleteInvitation();
            },
          },
          {
            label: 'Використати як шаблон',
            icon: 'pi pi-user-edit',
          },
        ];
      },
      displayCreateInvitModal: false,
      invitations: [] as Array<InvitationModel>,
      invitationInfo: {},
    };
  },
  async mounted() {
    await this.$store.dispatch(
      `${StoreModuleEnum.invitationsStore}/${InvitationsActionsEnum.SET_APARTMENT_INVITATIONS}`
    );
  },
  methods: {
    toggle(event: Event, data: InvitationModel): void {
      this.invitationInfo = data;
      (this.$refs.menu as any).toggle(event);
    },

    deleteInvitation() {
      this.$store.dispatch(
        `${StoreModuleEnum.invitationsStore}/${InvitationsActionsEnum.DEL_INVITATION}`,
        this.invitationInfo
      );
    },

    correctStatus() {
      this.invitations = this.invitationsList.map((invitation: any) => {
        let invitationItem = Object.assign({}, invitation);
        const status: InvitationStatusType = invitationItem.status;
        invitationItem.status = `${InvitationStatusEnum[status]}`;
        return invitationItem;
      });
    },
  },
  computed: {
    ...mapGetters({
      invitationsList: `${StoreModuleEnum.invitationsStore}/${InvitationsGettersEnum.getInvitations}`,
    }),
    displayModal(): boolean {
      return this.displayCreateInvitModal;
    },
  },
});
</script>

<style lang="scss" scoped>
.page-title {
  text-align: center;
}
.container {
  margin-top: 70px;
  .container-invitations {
    padding: 10px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) -1px 4px 5px 1px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    background-color: #fafafa;
    margin: 10px;
  }
}
.create_btn {
  display: flex;
  margin: 15px;
  justify-content: flex-end;
}
.search-field {
  display: block;
  text-align: right;
}
</style>
