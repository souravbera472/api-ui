<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
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
      :disabled="!valid || (pass=='')"
      text
      color="success"
      @click="Validate"
    >
      Login
    </v-btn>
  </v-form>
</template>
<script>
import {checkLogin} from "../dataProvider/loginServices.js";
  export default {

    data: () => ({
      valid: false,
      pass: '',
      email: '',
      emailRules: [
        v => !!v || 'User name is your e-mail id',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],

    }),

    methods: {
      validate () {
        this.$refs.form.validate();
      },
      Validate(){
        let data = {};
        data.userName = this.email;
        data.password = this.pass;
        checkLogin(data)
        .then((res)=>{
          console.log(res);
          this.$emit("success",true);
        })
        .catch(err=>{
          console.error(err);
        })
        
      }
    },
  }
</script>