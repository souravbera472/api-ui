<template>
  <div>
    <v-app>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
//import TopBar from './home/TopBar.vue';
export default {
  name: "App",
  components: {
    //TopBar
    //HelloWorld,
    //Login,
    //registration,
  },
  data() {
    return {
     loginFlag: false,
    };
  },
  mounted(){
     this.checkValue();
    },
  methods: {
  checkValue(){
      if(localStorage.getItem("router")){
         this.$router.push(localStorage.getItem("router"));
      }
      else{
       this.$router.push("./login"); 
      }
    },
  },
};
</script>
<style scoped>
.btn {
  text-transform: unset !important;
  border: 0px;
  text-decoration: underline;
  box-shadow: none;
}
</style>