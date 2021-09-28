<template>
  <div class="sidebar">
    <section class="info">
      <div>
        <p class="name-hint">Ви зайшли як</p>
        <h3 class="user-fullname">{{ userName }}</h3>
      </div>
      <div class="settings-btn-wrap">
        <button><span class="pi pi-cog"></span></button>
        <!--        <Button class="p-button-text" icon="pi pi-cog" />-->
      </div>
    </section>

    <nav class="sidebar-navigation">
      <!--      <div>-->
      <!--        <span class="pi pi-comments" />-->
      <!--      </div>-->
      <div>
        <Button
          label="повідомлення"
          class="p-button-text p-button-plain"
          icon="pi pi-comments"
          :badge="newMails"
          badgeClass="p-badge-info"
        />
      </div>
      <div>
        <Button label="Управління ОСББ" class="p-button-text p-button-plain" icon="pi pi-home" />
      </div>
      <div>
        <Button label="Вибір ОСББ" class="p-button-text p-button-plain" icon="pi pi-file-o" />
      </div>
      <div>
        <Button label="Запрошення" class="p-button-text p-button-plain" icon="pi pi-globe" />
      </div>
      <div>
        <Button label="Опитування" class="p-button-text p-button-plain" />
      </div>
    </nav>

    <div class="create-btn-wrap">
      <Button label="Створити ОСББ" class="p-button-info" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';

export default defineComponent({
  name: 'Sidebar',
  data() {
    return {
      userName: 'Іван Несторович Семків',
      newMails: '2',
    };
  },
  components: {
    Button,
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  display: grid;
  grid-template-rows: 1fr 6fr 1fr;
  background: #fafafa;
  padding: 1em 0;
}

.info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5em;

  .name-hint {
    display: flex;
    justify-content: flex-end;
    font-weight: 700;
    font-size: 16px;
    line-height: 14px;
    color: #646e7c;
  }

  .user-fullname {
    display: flex;
    justify-content: flex-end;
    height: 1.5em;
    text-align: right;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .settings-btn-wrap {
    display: flex;
    justify-content: center;
    margin: 0 0 0 1em;

    button {
      padding: 0.4em 1em;
      border-radius: 10px;
      border: 2px solid #e1e3e6;
      transition: all 0.2s;

      &:hover {
        background-color: #d2d8ff;
      }
      &:active {
        background-color: #b9c1ff;
      }
    }

    span {
      font-size: 2em;
    }
  }
}

.sidebar-navigation {
  div,
  button {
    width: 100%;
  }
}

.create-btn-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
