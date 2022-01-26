<template>
  <div>
    <button @click="asd">assign</button>
    <button @click="fortest">button</button>
  </div>
  <div class="breadcrumb">
    <Breadcrumb :home="home" :model="items">
      <template #item="{ item }">
        <router-link :to="item.to" custom v-slot="{ navigate, isActive, isExactActive }">
          <a @click="navigate" :class="{ 'active-link': isActive, 'active-link-exact': isExactActive }">{{
            item.label
          }}</a>
        </router-link>
      </template>
    </Breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RoutesEnum } from '@/router/types';
import Breadcrumb from 'primevue/breadcrumb';

export default defineComponent({
  components: {
    Breadcrumb,
  },
  props: {
    houseId: {
      type: Number,
      required: true,
    },
    houseIdFromApartInfo: {
      type: Number,
      required: true,
    },
    apartmentIdFromApartInfo: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      home: { label: 'ОСББ', to: RoutesEnum.Cooperation },
      items: [
        { label: 'Квартири', to: `/main/cooperation/${this.$props.houseIdFromApartInfo}` },
        {
          label: 'Інформація про квартиру',
          to: `/main/cooperation/${this.$props.houseIdFromApartInfo}/${this.$props.apartmentIdFromApartInfo}`,
        },
      ],
      testHouseId: {},
      testApartmentId: 0,
    };
  },
  methods: {
    fortest() {
      console.log('props', this.$props);
      console.log('props house', this.$props.houseIdFromApartInfo);
      console.log('props apart', this.$props.apartmentIdFromApartInfo);
      console.log('assigned', this.testHouseId, this.testApartmentId);
      // console.log('hz house', this.returnHouseId);
      // console.log('hz apart', this.returnApartmentId);
    },
    asd() {
      this.testHouseId = this.$props.houseIdFromApartInfo;
      this.testApartmentId = this.$props.apartmentIdFromApartInfo;
    },
  },
  // computed: {
  //   returnHouseId() {
  //     // Object.assign(this.testHouseId, this.$props.houseIdFromApartInfo);
  //     // this.testHouseId = 10;
  //     console.log('comp works');
  //     return this.testHouseId;
  //   },
  //   returnApartmentId() {
  //     Object.assign(this.testApartmentId, this.$props.apartmentIdFromApartInfo);
  //     return this.testApartmentId;
  //   },
  // },
});
</script>

<style lang="scss" scoped></style>
