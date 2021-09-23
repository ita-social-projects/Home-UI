<template>
  <div class="sideBar">
    <div class="userEntrance">Ви зайшли як</div>
    <div class="userName">{{userName}}</div>
    <div class="messenger_btn">
      <Button label="повідомлення" class="p-button-text p-button-plain" icon="pi pi-comments" :badge="newMails" badgeClass="p-badge-info"/>
    </div>
    <div class="control_btn">
      <Button label="Управління ОСББ" class="p-button-text p-button-plain" icon="pi pi-home"/>
    </div>
    <div class="choose_btn">
      <Button label="Вибір ОСББ" class="p-button-text p-button-plain" icon="pi pi-file-o"/>
    </div>
    <div class="invitation_btn">
      <Button label="Запрошення" class="p-button-text p-button-plain" icon="pi pi-globe"/>
    </div>
    <div class="vote_btn">
      <Button label="Опитування" class="p-button-text p-button-plain" />
    </div>
    <div class="createCoop_btn">
      <Button label="Створити ОСББ" class="p-button-info" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';

export default defineComponent({
  name: 'sideBar',
  data() {
    return {
      userName: 'Іван Несторович Семків',
      newMails: 2
    };
  },
  components: {
    Button,
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  background: #8d8d8d;
  color: #5a6474;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.userEntrance {
  margin-left: 193px;
  margin-top: 67px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 14px;
  color: #646E7C
}

.userName {
  margin-left: 45px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #5a6474;
}

.messenger_btn {
  position: relative;
  margin-left: 50px;
  margin-top: 50px;
}

.control_btn {
  position: relative;
  margin-left: 50px;
  margin-top: 40px;
}

.choose_btn {
  position: relative;
  margin-left: 50px;
  margin-top: 40px;
}

.invitation_btn {
  position: relative;
  margin-left: 50px;
  margin-top: 40px;
}

.vote_btn {
  position: relative;
  margin-left: 50px;
  margin-top: 40px;
}

.createCoop_btn {
  margin-left: 58px;
  margin-top: 500px;
}

</style>
