<template>
  <div class="page-wrap">
    <div class="logo"></div>
    <main>
      <div class="message">
        <h1>{{ errorNumber }}</h1>
        <h3>{{ errorMessage }}</h3>
        <h4>{{ decision }}</h4>
      </div>
      <slot></slot>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ErrorPage',
  props: {
    errorNumber: String,
    errorMessage: String,
    decision: String,
  },
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
