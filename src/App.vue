<template>
  <div>
    <v-app>
      <router-view>
        <!-- <router-link to="/home"></router-link> -->
      </router-view>
      <!-- <v-row no-gutters align-content="center">
        <v-col cols="4"> </v-col>
        <v-col cols="4">
          <div v-if="!regFlag && !success">
          <span>New User ?</span>
          <v-btn 
          class="btn pa-0" 
          outlined text depressed 
          color="primary"
          @click="loginClick"
          >
            click here
          </v-btn>
          <span> for registration </span>
          </div>
          <login
          @success="submit"
          v-if="!regFlag && !success" 
          />
          <registration v-if="regFlag" />
        </v-col>
      </v-row> -->
    </v-app>
  </div>
</template>

<script>
//import HelloWorld from "./components/HelloWorld.vue";
//import Login from "./login/Login.vue";
//import registration from "./login/Registration.vue";
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
  methods: {
  
    loginClick(){
      this.regFlag = true;
    },
    submit(val){
      this.success = val;
      if(val){
         this.$router.push('/home')
      }
    },
    logout(){
      this.success = false;
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