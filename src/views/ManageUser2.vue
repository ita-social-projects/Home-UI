<template>
  <div class="wrapper">
    <Card style="width: 25em">
      <template #header>
        <H1>SDAD</H1>
      </template>
      <template #title> П.І.Б </template>
      <template #subtitle> Card subtitle </template>
      <template #content>
        <p>
          {{ name }}
        </p>
        <p>//////////////////</p>
        <p>!!!!!! {{ allObjState }}</p>
        <input-text v-model="name" disabled />
        <input-text v-model="middleName" disabled />
        <input-text v-model="lastName" disabled />
      </template>
      <template #footer>
        <Button @click="initData" icon="pi pi-check" label="Save" />
        <Button
          @click="editData"
          icon="pi pi-times"
          label="Cancel"
          class="p-button-secondary"
          style="margin-left: 0.5em"
        />
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapState } from 'vuex';

import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { state } from '@/store/authorization';
import { authorizationStore } from '@/store/authorization';
import { AuthorizationStateInterface } from '@/store/authorization/types';
import { RootStateInterface } from '@/store/types';

export default defineComponent({
  name: 'ManageUser',
  components: { Card, Button, InputText },
  data() {
    return {
      nome: '',
    };
  },
  mounted() {
    // this.userName = this.userState['user'];
    // console.log(this.userName);
    // this.$store.getters['authorizationStore/userData'].then(()=> {
    //   this.initData();
    // })
    // this.initData();
    // this.$store.dispatch('authorizationStore/GET_DATA');
  },
  computed: {
    ...mapState<RootStateInterface>({
      name: (state: RootStateInterface) => state.authorizationStore.user?.first_name,
      middleName: (state: RootStateInterface) => state.authorizationStore.user?.middle_name,
      lastName: (state: RootStateInterface) => state.authorizationStore.user?.last_name,
    }),
  },

  //     ...mapState({ message: 'authorizationStore' => state }),
  // myValue( ) {
  //   let userInfo = this.$store.state.authorizationStore['user'];
  //   return userInfo;
  // }

  // ...mapGetters({ userData: 'authorizationStore/userData' }),
  // ...mapState({ userState: 'authorizationStore' }),
  // someFoo() {
  //   this.userName = this.$store.state.authorizationStore.user;
  //   return 0;

  // }
  // userInfo() {
  //   let usInf = this['userData'];
  //   return usInf;
  // }

  // console.log();
  // userInfoFromStore() {

  //   return this.$store.getters['authorizationStore/userData'];
  // }
  // this.$store.getters['authorizationStore/userData'],

  // watch: {

  // },
  methods: {
    initData() {
      // this.userName = this.userData['first_name'];
      this.$store.dispatch('authorizationStore/TEST');
      console.log(name, 'sssssssss');

      // this.userName = this.userData.firstName;
      // let someObj = this.$store.getters['authorizationStore/userData'];
      // console.log(this.$store.getters['authorizationStore/userData'] , 'ssssssss');
      // this.$data.userName = this.$store.getters['authorizationStore/userData'];
      // console.log(this.$data.userName, 'wwwwwwwww');
    },
    editData() {
      console.log(name, 'this is ');
    },
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
