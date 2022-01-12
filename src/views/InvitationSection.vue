<template>
  <div class="add_btn">
    <CreateInvitation></CreateInvitation>
  </div>
  <div class="container">
    <h1 class="page-title">{{ title }}</h1>
    <div class="container-invitations">
      <DataTable :value="invitations" responsiveLayout="scroll">
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
            {{ slotProps.data.apartment.address.houseNumber }},
          </template>
        </Column>
        <Column field="status" style="min-width: 15rem" header="Статус" :sortable="true" />
        <Column style="min-width: 10rem" header="Опції">
          <template #body="slotProps">
            <Button
              icon="pi pi-cog"
              class="p-button p-button-info p-button-text"
              type="button"
              @click="toggle"
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
import CreateInvitation from '@/components/CreateInvitation.vue';
import InputText from 'primevue/inputtext';
import { StoreModuleEnum } from '@/store/types';
import { InvitationsGettersEnum, InvitationsActionsEnum } from '@/store/invitations/types';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'InvitationSection',
  components: {
    Button,
    DataTable,
    Column,
    Menu,
    CreateInvitation,
    InputText,
  },
  data() {
    return {
      title: 'Список запрошень',
      invitationActions: () => {
        return [
          {
            label: 'Видалити запрошення',
            icon: 'pi pi-times',
          },
          {
            label: 'Використати як шаблон',
            icon: 'pi pi-user-edit',
          },
        ];
      },
    };
  },
  async mounted() {
    await this.$store.dispatch(
      `${StoreModuleEnum.invitationsStore}/${InvitationsActionsEnum.SET_APARTMENT_INVITATIONS}`
    );
  },
  methods: {
    toggle(event: Event) {
      (this.$refs.menu as any).toggle(event);
    },
  },
  computed: {
    ...mapGetters({
      invitations: `${StoreModuleEnum.invitationsStore}/${InvitationsGettersEnum.getInvitations}`,
    }),
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
.add_btn {
  display: flex;
  margin: 15px;
  justify-content: flex-end;
}
.search-field {
  display: block;
  text-align: right;
}
</style>
