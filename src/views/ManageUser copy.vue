<template>
  <div class="wrapper">
    <Card style="width: 25em">
      <template #header>
        <img
          src="https://www.primefaces.org/wp-content/uploads/2020/02/primefacesorg-primevue-2020.png"
          style="height: 15rem"
        />
      </template>
      <template #title> Advanced Card </template>
      <template #subtitle> Card subtitle </template>
      <template #content>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam
          deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate
          neque quas!
        </p>
      </template>
      <template #footer>
        <Button icon="pi pi-check" label="Save" />
        <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: 0.5em" />
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';

export default defineComponent({
  name: 'ManageUser',
  components: { Card, Button },
  data() {
    return {
      userName: {},
    };
  },
  mounted() {
    // this.$store.getters['authorizationStore/userData'].then(()=> {
    //   this.initData();
    // })
    this.initData();
  },
  computed: {
    // console.log();
    // this.$store.getters['authorizationStore/userData'],
  },
  methods: {
    initData() {
      // let someObj = this.$store.getters['authorizationStore/userData'];
      console.log(this.$store.getters['authorizationStore/userData'], 'ssssssss');
      this.$data.userName = this.$store.getters['authorizationStore/userData'];
      console.log(this.$data.userName, 'wwwwwwwww');
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
