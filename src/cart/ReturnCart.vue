<template>
    <div>
      <v-row no-gutters>
        <div style="margin-left: 43%; margin-top: 7%" v-if="loader">
          <v-progress-circular
            :size="120"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
  
        <div
          v-else-if="!(bookData.length || loader)"
          style="margin-left: 40%; margin-top: 7%"
        >
          <img src="pic/nodata.png" alt="" />
          <br />
          <span style="margin-left: 25%">No Data availabe</span>
          <br />
          <div class="mt-5" style="margin-left: -30px">
            <v-btn @click="clickReq" text depressed rounded>
              <v-icon dark color="primary">mdi-checkbox-marked-circle</v-icon>
              <span style="color: #0000cd">Click here for Return books</span>
            </v-btn>
          </div>
        </div>
        <div v-else v-for="(val, index) in bookData" :key="index">
          <v-card
            class="mx-auto mt-6 mr-4 ml-7 mb-2"
            max-width="344"
            min-width="330"
          >
            <v-card-text>
              <div>
                Request On: {{ new Date(val.ct).toLocaleString() }}
              </div>
              <p
                class="text-h4 mt-2"
                style="color:#3e4ed8"
              >
                {{ val.bookName }}
              </p>
  
              <p>
                Written By:
                <span class="text--primary">{{ val.bookAuthor }}</span>
              </p>
              <v-row no-gutters align-md="center" class="ma-0 pa-0">
                <v-col cols="8">Cancle Return Request:</v-col>
                <v-col cols="3">
                  <v-checkbox
                    v-model="Selection"
                    color="info"
                    :value="val._id"
                    multiple
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </div>
      </v-row>
      <my-snackbar :snackbar="snackbar" :text="snackbarText"></my-snackbar>
      <v-footer fixed max-height="50px" v-if="Selection.length">
        <v-row no-gutters class="ml-2">
          <v-col cols="9"></v-col>
          <v-col cols="3" class="pa-0 ma-0" style="margin-left: 75% !important">
            <v-btn
              depressed
              outlined
              dark
              text
              color="primary"
              @click="removeCartClick"
            >
              <v-icon>mdi-cart-remove</v-icon>
              Cancle Return Request
            </v-btn>
            <v-btn depressed outlined dark text color="red" @click="cancle">
              Cancle
            </v-btn>
          </v-col>
        </v-row>
      </v-footer>
    </div>
  </template>
    <script>
    import MySnackbar from "../home/MySnackbar.vue"
    //import VuePerfectScrollbar from 'vue-perfect-scrollbar';
    import {getUserReqRenewalBooks,removeRenewalReqBooks} from '../dataProvider/userServices.js'
      export default {
        components:{
          MySnackbar,
        },
        data () {
          return {
            loader: true,
            revealId: null,
            bookData: [],
            Selection: [],
            tabs: null,
            snackbarText: "",
            snackbar: false,
          }
        },
        mounted(){
           this.loadData();
        },
       methods: {
        loadData(){
            this.loader = true;
           let data = localStorage.getItem("userId");
           getUserReqRenewalBooks(data,"Return").then(res => {
              if(res.data.['user-message'] == "No data available"){
                  this.bookData = [];
              }
              else
                  this.bookData = res.data.["book-info"];
            this.loader = false;
          }).catch(e=>{ 
            this.loader = false;
            console.error(e);
          })
        },
        choseIndex(index){
          this.revealId = index;
        },
        clickReq(){
          this.$router.push("./home");
          localStorage.setItem("router", "./home");
        },
        cancle(){
        this.Selection = [];
        },
        removeCartClick(){
          this.snackbar = true;
          let userId = localStorage.getItem("userId");
          removeRenewalReqBooks(userId,this.Selection,"Return").then(res=>{
             this.snackbarText = res.data.['user-message'];
          }).catch(e=>{
            this.snackbarText = "Opps! somthing went wrong";
            console.error(e);
          }).finally(e=>{
            setTimeout(function () { this.fun() }.bind(this),3000);
            this.Selection=[];
            console.info(e);
          })
        },
        fun(){
          this.loadData()
          this.snackbar=false;
        },
       }
       
      }
    </script>
    <style scoped>
  .v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
  }
  table {
    margin: 2px;
    margin-top: 160px !important;
    color: #e52012;
  }
  .divRow {
    background-color: rgb(145, 174, 205);
  }
  </style>