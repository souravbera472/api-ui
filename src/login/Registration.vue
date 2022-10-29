<template>
  <v-row no-gutters align-content="center">
    <v-col cols="4"> </v-col>
    <v-col cols="4">
      <img
        src="logo/myLogo.jpg"
        alt=""
        height="90%"
        width="100%"
        style="opacity: 0.3"
      />
      <div class="logo">
        <span>Old user ? </span>
        <v-btn
          class="btn pa-0"
          outlined
          text
          depressed
          color="primary"
          @click="loginClick"
        >
          click here
        </v-btn>
        <span> for Login </span>
        <br />
        <span style="margin-left: 37%; font-size: x-large; color: blue">
          Sign Up
        </span>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="fName"
            label="Enter Your First Name*"
            required
          ></v-text-field>
          <v-text-field
            v-model="lName"
            label="Enter Your Last Name"
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Enter Your Email*"
            required
          ></v-text-field>
          <v-text-field
            v-model="pass"
            label="Password*"
            type="password"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid || pass == ''"
            text
            style="width: 100%"
            color="primary"
            @click="Validate"
          >
            Sign Up
          </v-btn>
        </v-form>
      </div>
    </v-col>
    <v-snackbar v-model="snackbar" :timeout="timeout" right>
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>
 
<script>
import { registrationData } from "../dataProvider/loginServices.js";
export default {
  data() {
    return {
        snackbar: false,
      text: "Opps something went wrong!",
      valid: false,
      fName: "",
      lName: "",
      pass: "",
      email: "",
      emailRules: [
        (v) => !!v || "User name is your e-mail id",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    loginClick(){
      this.$router.push("/login");
      localStorage.setItem("router","./login");
    },
    validate() {
      this.$refs.form.validate();
    },
    Validate() {
      let data = {};
      data.emailId = this.email;
      data.password = this.pass;
      data.fName = this.fName;
      data.lName = this.lName;
      registrationData(data)
        .then((res) => {
        this.text = res.data.["user-message"];
        this.snackbar = true;
          if(res.data.["developer-message"] == "Data insert successfully"){
            this.$router.push('/login');
            localStorage.setItem("router","./login");
          }
          //this.$refs.form.validate();
        })
        .catch((err) => {
          this.snackbar = true;
          console.error(err);
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
.logo {
  z-index: 999;
  margin-top: -82%;
  margin-left: 10%;
  margin-right: 10%;
}
</style>