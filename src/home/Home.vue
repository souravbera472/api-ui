<template>
  <div>
    <top-bar :title="'Your Books'"/>
    <book-profile style="margin-top: 50px !important"/>
  </div>
</template>
<script>
import BookProfile from "./BookProfile.vue";
import TopBar from "./TopBar.vue"
export default {
  name: "Home",
  components: {
    BookProfile,
    TopBar,
  },
  data() {
    return {
      bookCount: 0,
    };
  },
  mounted(){
  },
  methods:{
    
  }
};
</script>
<style scoped>
.main {
  height: 90% !important;
}
</style>