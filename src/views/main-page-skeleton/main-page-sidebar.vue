<template>
  <div class="main-page-sidebar">
    <div class="userName">User Name</div>
    <Avatar icon="pi pi-user" class="userAvatar" />
    <div class="messengerLogo">
      <Image :src="imageMessengerLogo" alt="messenger" class="messengerLogoImg" />
    </div>
    <div class="messengerLabel">Messenger</div>
    <Button label="Create Cooperative" class="p-button-lg" />
  </div>
</template>

<script>
import messengerLogoImg from 'd:/VUE-PROJECTS/HOME-PROJECT/Home-UI/src/assets/messenger.png'
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'
import Image from 'primevue/image'

export default {
  data() {
    return {
      imageMessengerLogo: messengerLogoImg,
    }
  },
  components: {
    Button,
    Avatar,
    Image,
  },
}
</script>

<style lang="scss" scoped>
.main-page-sidebar {
  position: absolute;
  width: 388px;
  height: 1001px;
  left: -1px;
  top: 79px;

  background: #f1f5f9;
}

.p-button-lg {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 43px;

  position: absolute;
  height: 48px;
  left: 57px;
  // right: 1592px;
  top: 918px;
  background: linear-gradient(180deg, #6989fe 0%, #3c64f4 100%);
  border-radius: 8px;
  color: white;
}
.p-button-lg:hover {
  background: #5076fd;
}

.userAvatar {
  position: absolute;
  width: 55px;
  height: 55px;
  left: 33px;
  top: 37px;

  background: #e3e3e3;
  border: 1px solid rgba(90, 100, 116, 0.25);
  box-sizing: border-box;
  border-radius: 35px;
}

.userName {
  position: absolute;
  width: 130px;
  height: 24px;
  left: 113px;
  top: 52px;

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

.messengerLogo {
  position: absolute;
  left: 51px;
  right: 317px;
  top: 156px;
}

.messengerLabel {
  position: absolute;
  width: 84px;
  height: 24px;
  left: 99px;
  top: 153px;

  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: grey;
}
</style>
