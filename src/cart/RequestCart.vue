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
        <profile-cart />
      </v-tab-item>
      <v-tab-item> This is renewal page</v-tab-item>
      <v-tab-item> This is return page</v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import TopBar from "../home/TopBar.vue";
import ProfileCart from "./profileCart.vue";
export default {
  components: {
    TopBar,
    ProfileCart,
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
        if (val == 0) this.text = "User Requested Books";
        else if(val==1) this.text = "User Renewal Books Request";
        else this.text = "User Return Books Request";
      },
    },
  },
};
</script>
<style scoped>
</style>