<template>
  <h1>Home</h1>
  <div>
    {{text}}
    <InputText v-model="text" />
    <Button 
    label="Check" 
    icon="pi pi-check" 
    iconPos="left" 
    class="p-button-raised p-button-rounded" 
    @click="showMessage(text)" />

    <span class="p-buttonset">
      <Button label="Save" icon="pi pi-check" />
      <Button label="Delete" icon="pi pi-trash" />
      <Button label="Cancel" icon="pi pi-times" />
  </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: 'Some text'
    }
  },
  methods: {
    showMessage(text) {
      console.log(text)
    }
  }
}
</script>


<style lang="scss">
  #app {
    margin-top: 70px;
    text-align: center;
  }
</style>
