<template>
  <div class="page-wrap">
    <div class="logo"></div>
    <main>
      <div class="message">
        <h1>404</h1>
        <h3>За вашим запитом не знайдено жодної сторінки :(</h3>
        <h4>Будь ласка, скористайтеся посиланнями для навігації</h4>
      </div>
      <nav>
        <router-link to="/">Головна <span class="pi pi-arrow-right" /></router-link>
        <router-link to="/login">Увійти <span class="pi pi-arrow-right" /></router-link>
        <router-link to="/register-cooperation"
          >Зареєструвати об'єднання <span class="pi pi-arrow-right"
        /></router-link>
      </nav>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageNotFound',
});
</script>

<style lang="scss" scoped>
.page-wrap {
  position: relative;
  @include flex-custom(center);
  width: 100%;
  height: 100%;
  padding: 0 3em;

  .logo {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.06;
    background: url('../assets/logo.svg') no-repeat center/90%;
    filter: hue-rotate(90deg) grayscale(60%) blur(4px);
    z-index: -1;
  }
}

.page-wrap main {
  background-color: #00000016;
  padding: 0 3em 3em;
  margin: 2em;
  border-radius: 1em;
  box-shadow: 2px 2px 3px #00000030;

  nav {
    @include flex-custom(center, flex-start, column nowrap);
    padding: 1em 0;

    a {
      @include flex-center-all();
      font-size: 2em;
      font-weight: 300;
      color: $main-btn-background-color;
      text-decoration: none;
      border-bottom: 3px solid transparent;
      transition: color 0.6s;
      user-select: none;
      -webkit-user-drag: none;

      span {
        margin: 0 0 0 1em;
        transition: all 0.6s;
      }

      &:hover {
        color: $hover-btn-background-color;
        border-bottom: 3px solid;
      }

      &:active span {
        transform: translateX(2em);
      }
    }
  }
}

.message {
  @include flex-center-all-column();

  h1 {
    font-size: 18rem;
    margin: 0;
  }

  h3,
  h4 {
    margin: 0.5em;
  }
}
</style>
