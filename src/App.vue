<template>
  <div>
    <v-app>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    //HelloWorld,
    //Login,
    //registration,
  },
  data() {
    return {
      regFlag: false,
      success: false,
    };
  },
  mounted(){
     this.checkValue();
    },
  methods: {
  checkValue(){
      if(localStorage.getItem("router")=="/home"){
        this.$router.push("./home");
      }
      else if(localStorage.getItem("router")){
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