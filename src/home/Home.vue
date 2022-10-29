<template>
  <div>
    <top-bar/>
    <book-profile style="margin-top: 50px !important"/>
  </div>
</template>
<script>
import BookProfile from "./BookProfile.vue";
//import {getUserBookData} from "../dataProvider/userServices.js"
import TopBar from "./TopBar.vue"
export default {
  name: "Home",
  components: {
    BookProfile,
    TopBar,
  },
  data() {
    return {
    };
  },
  // mounted(){
  //   this.getBookData();
  // },
  // methods:{
  //   getBookData(){
  //     let data = localStorage.getItem("userId");
  //      getUserBookData(data).then( res =>{
  //       console.log(res.data);
  //      })
  //      .catch(e=>{
  //       console.log(e);
  //      })
  //   }
  // }
};
</script>
<style scoped>
.main {
  height: 90% !important;
}
</style>