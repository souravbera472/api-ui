<template>
  <v-row no-gutters align-content="center">
    <v-col cols="4">
    </v-col>
    <v-col cols="4">
      <img src="logo/myLogo.jpg" alt="" height="90%" width="100%" style="opacity:.3">  
        <div class="logo">
          <div style="margin-bottom: 5%">
        <span>New User ? </span>
        <v-btn
          class="btn pa-0"
          outlined
          text
          depressed
          color="primary"
          @click="regClick"
        >
          click here
        </v-btn>
        <span> for Sign Up </span>
        </div>
        <span style="margin-left: 37%; font-size: x-large; color: blue">
          Login
        </span>
      <v-form @keyup.enter="enterClicked" ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="User Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="pass"
          label="password"
          type="password"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid || pass == ''"
          text
          style="width: 100%; background-color: #7f81a0"
          color="primary"
          @click="Validate"
        >
          Login
        </v-btn>
      </v-form>
      </div>
    </v-col>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      right
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>
<script>
import { checkLogin } from "../dataProvider/loginServices.js";
import { getNotificationCount } from "../dataProvider/userServices.js";
export default {
  data: () => ({
    snackbar: false,
    text: "opps went wrong",
    timeout: 3000,
    regFlag: false,
    success: false,
    valid: false,
    pass: "",
    email: "",
    userId: "",
    emailRules: [
      (v) => !!v || "User name is your e-mail id",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),

  methods: {
    enterClicked(){
      alert("enter click");
    },
    regClick(){
       this.$router.push("/reg");
       localStorage.setItem("router","./reg");
    },
    validate() {
      this.$refs.form.validate();
    },
    Validate() {
      let data = {};
      data.userName = this.email;
      data.password = this.pass;
      checkLogin(data)
        .then((res) => {
          if(res.data.["developer-message"] == "Credential is ok"){
            this.$router.push('/home');
            localStorage.setItem("router","./home");
            var fName = res.data.result.fName.charAt(0).toUpperCase();
            var lName = res.data.result.lName.charAt(0).toUpperCase();
            localStorage.setItem("user",fName+lName);
            localStorage.setItem("userName",res.data.result.userName);
            localStorage.setItem("fName",res.data.result.fName);
            localStorage.setItem("lName",res.data.result.lName);
            localStorage.setItem("role",res.data.result.role);
            localStorage.setItem("userId",res.data.result.id);
            this.getNotificationData(res.data.result.id);
          }
          this.snackbar = true;
          this.text = res.data.["user-message"];
        })
        .catch((err) => {
          this.snackbar = true;
          console.error(err);
        });
    },
    getNotificationData(userId) {
      getNotificationCount(userId)
        .then((res) => {
          this.bookCount = res.data.userBookCount;
          localStorage.setItem("bookCount",this.bookCount);
        })
        .catch((e) => {
          console.error(e);
        });
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
.logo{
  z-index: 999;
  margin-top: -70%;
  margin-left: 10%;
  margin-right: 10%;
}
</style>