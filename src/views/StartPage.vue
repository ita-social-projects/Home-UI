<template>
  <baseHeader />
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
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import baseHeader from '@/components/base/BaseHeader.vue';
import Button from 'primevue/button';

export default defineComponent({
  name: 'startPage',
  data() {
    return {};
  },
  components: {
    Button,
    baseHeader,
  },
  methods: {
    registrationOSBB() {
      this.$router.push('/');
    },
  },
});
</script>

<style leng="scss" scoped>
.wrapper {
  width: 70%;
  margin: 0 auto;
  padding-top: 90px;

  color: #5a6474;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.welcome_text {
  margin-bottom: 40px;
}
.welcome_text div {
  padding-bottom: 20px;
}
.features {
  width: 70%;
  margin: 0 auto;
  padding-bottom: 35px;
  display: flex;
  flex-wrap: wrap;
}
.feature__item {
  padding: 25px;
  margin: 20px;
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 180px;
  text-align: center;
  flex-direction: column;
}
span {
  font-size: 55px;
  display: block;
  padding: 25px;
}
.btn {
  display: flex;
  justify-content: center;
}
</style>
