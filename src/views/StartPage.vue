<template>
  <div class="container">
    <div class="wrapper">
      <div class="welcome_text">
        <div>
          Товариство виконує функції управителя та надання послуг з утримання будинку, споруди або групи будинків і споруд
          та об’єктів благоустрою. Співвласники багатоквартирного будинку перераховують кошти на розрахунковий рахунок
          Товариства з подальшим використанням їх за цільовим призначенням. Товариство запитує, чи є такі кошти об’єктом
          оподаткування ПДВ.
        </div>
        <div>
          Якщо ОСББ створюється на базі будинку комунальної власності, воно може претендувати на одноразове
          співфінансування з міського бюджету на перші необхідні кроки, наприклад, на організацію вузлів обліку
          електропостачання, розробку схем доступів до електромереж, заземлення, ліквідацію аварійних ситуацій тощо.
        </div>
      </div>

      <div class="features">
        <div class="y feature__item">
          <span class="pi pi-book"></span>
          <h3>Управлiння</h3>
        </div>
        <div class="y feature__item">
          <span class="pi pi-sliders-v"></span>
          <h3>Голосування</h3>
        </div>
        <div class="y feature__item">
          <span class="pi pi-info-circle"></span>
          <h3>Нова фіча</h3>
        </div>
        <div class="y feature__item">
          <span class="pi pi-briefcase"></span>
          <h3>Запрошуй</h3>
        </div>
        <div class="y feature__item">
          <span class="pi pi-chart-bar"></span>
          <h3>Гарна штука</h3>
        </div>
        <div class="y feature__item">
          <span class="pi pi-print"></span>
          <h3>Друкуй результати</h3>
        </div>
        <div class="y feature__item">
          <span class="pi pi-book"></span>
          <h3>Управлiння</h3>
        </div>
        <div class="y feature__item">
          <span class="pi pi-info-circle"></span>
          <h3>Нова фіча</h3>
        </div>
      </div>

      <div class="btn">
        <Button label="Створити ОСББ" @click="registrationOSBB" class="p-button-info" />
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RoutesEnum } from '@/router/types';
import Button from 'primevue/button';

export default defineComponent({
  name: 'startPage',
  data() {
    return {};
  },
  components: {
    Button,
  },
  methods: {
    registrationOSBB() {
      this.$router.push(RoutesEnum.RegisterCooperation);
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  overflow: auto;
  overflow-x: hidden;
}
.wrapper {
  width: 70%;
  margin: 0 auto;
  padding: 40px 0;
  color: $thin-text-color;
}
.welcome_text {
  margin-bottom: 10px;
}
.welcome_text div {
  padding-bottom: 20px;
}
.features {
  width: 100%;
  margin: 0 auto;
  padding-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.feature__item {
  display: flex;
  flex-direction: column;
  width: 240px;
  margin: 5px;
  text-align: center;
  padding: 10px;
}
span {
  font-size: 40px;
  display: block;
  padding: 15px;
}

h3 {
  font-size: 20px;
}

.btn {
  @include flex-center-all();
}
</style>
