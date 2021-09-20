<template>
  <div class="main-page-header">
    <div class="logo">
      <Image :src="imageLogoBody" alt="logo" class="logo__body" />
      <Image :src="imageLogoShadow" alt="shadow" class="logo__shadow" />
    </div>
    <div class="HOMEtitle">HOME</div>
    <Button label="Sign Out" class="p-button-lg" />
  </div>
</template>

<script>
import logoImageBody from 'd:/VUE-PROJECTS/HOME-PROJECT/Home-UI/src/assets/LogoBody.png'
import logoImageShadow from 'd:/VUE-PROJECTS/HOME-PROJECT/Home-UI/src/assets/LogoShadow.png'
import Button from 'primevue/button'
import Image from 'primevue/image'

export default {
  data() {
    return {
      imageLogoBody: logoImageBody,
      imageLogoShadow: logoImageShadow,
    }
  },
  components: {
    Button,
    Image,
  },
}
</script>

<style lang="scss" scoped>
.main-page-header {
  position: absolute;
  width: 1922px;
  height: 80px;
  left: -1px;
  top: -1px;
  background: #f2fbff;
  border: 1px solid #e1e3e6;
  box-sizing: border-box;
  border-radius: 6px 6px 0px 0px;
}
.HOMEtitle {
  position: absolute;
  width: 103px;
  height: 24px;
  left: 110px;
  top: 27px;

  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 24px;
  text-align: center;
  color: #3855b3;
}

.p-button-lg {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 20px;

  position: absolute;
  width: 156px;
  height: 48px;
  left: 1663px;
  right: 102px;
  top: 15px;
  background: linear-gradient(180deg, #6989fe 0%, #3c64f4 100%);
  border-radius: 8px;
  color: white;
}
.p-button-lg:hover {
  background: #5076fd;
}

.logo {
  position: absolute;
  width: 88px;
  height: 34px;
  left: 74px;
  top: 22px;

  &__body {
    height: 25px;
    width: 20.9px;
    border-radius: 4px;
  }

  &__shadow {
    left: 13px;
  }
}
</style>
