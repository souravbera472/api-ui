<template>
    <div>
      <top-bar :title="text" />
      <div style="margin-top: 50px !important"></div>
      <template>
        <v-tabs v-model="tabs" background-color="primary" slider-color="red">
          <v-tab v-for="n in tabArr" :key="n"> {{ n }} </v-tab>
        </v-tabs>
      </template>
      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <view-cart />
        </v-tab-item>
        <v-tab-item>
          <view-renewal-cart/>
        </v-tab-item>
        <v-tab-item>
          <view-return-cart/>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </template>
  <script>
  import TopBar from "../home/TopBar.vue";
  import ViewCart from "./ViewCart.vue";
  import ViewRenewalCart from './ViewRenewalCart.vue';
  import ViewReturnCart from './ViewReturnCart.vue';
  //import ViewRenewalCartVue from "./ViewRenewalCart.vue";
  export default {
    components: {
      TopBar,
      ViewCart,
      ViewRenewalCart,
      ViewReturnCart,
    },
    data() {
      return {
        text: "",
        tabs: null,
        tabArr: ["Request", "Renewal", "Return"],
      };
    },
    watch: {
      tabs: {
        handler(val) {
          if (val == 0) this.text = "Your Requested Books";
          else if(val==1) this.text = "Your Renewal Books Request";
          else this.text = "Your Return Books Request";
        },
      },
    },
  };
  </script>
  <style scoped>
  </style>