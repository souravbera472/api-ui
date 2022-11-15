<template>
  <div>
    <div>
      <div>
        <v-row
          no-gutters
          class="mx-4 mt-4"
          style="
            background-color: #bedaf2;
            position: static;
            border-radius: 1rem;
            height: 70px;
          "
        >
          <span class="text-h4 ml-4 mt-4 mr-10"> Requested Books </span>

          <div class="ml-10 mt-6">
            <v-icon color="#36ce33" size="30" class="mr-2">mdi-circle</v-icon>
            <span style="color: #36ce33">Availabe</span>
            <v-icon color="#e52012" size="30" class="mr-2 ml-4"
              >mdi-circle</v-icon
            >
            <span style="color: #e52012">Not Availabe (Can't be approve)</span>
          </div>

          <v-spacer></v-spacer>
          <div>
            <v-text-field
              placeholder="Search"
              @keydown.enter.prevent="loadData"
              v-model="text"
              v-if="searchText"
            >
            </v-text-field>
          </div>
          <v-icon @click="searchText = !searchText" class="mr-2">
            mdi-magnify
          </v-icon>
        </v-row>
        <VuePerfectScrollbar style="height: 85vh">
          <div v-for="(val, index) in reqData" :key="index">
            <v-card class="mx-4 mt-6" color="#bedaf2">
              <v-card-title> {{ val.label }} </v-card-title>
              <v-card-subtitle> {{ val.userName }} </v-card-subtitle>
              <v-row style="max-width: 98% !important">
                <div v-for="(book, index1) in val['book-info']" :key="index1">
                  <v-card-text>
                    <v-chip
                      large
                      class="ma-2"
                      text-color="black"
                      :color="book.isAvailable ? '#36ce33' : '#e52012'"
                      >Name: {{ book.bookName }}
                      <br />
                      Author: {{ book.bookAuthor }}
                    </v-chip>
                  </v-card-text>
                </div>
                <v-spacer></v-spacer>
                <v-btn
                  class="mt-8"
                  rounded
                  text
                  color="primary"
                  style="background-color: antiquewhite"
                  @click="approveClick(val._id)"
                >
                  approve
                </v-btn>
              </v-row>
            </v-card>
          </div>
        </VuePerfectScrollbar>
      </div>
    </div>
    <my-snackbar :snackbar="snack" :text="snackText">
    </my-snackbar>
  </div>
</template>
<script>
//import TopBar from "../home/TopBar.vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import {getReqBookData,postReqBookData} from "../dataProvider/adminServices.js"
import MySnackbar from '../home/MySnackbar.vue';
export default {
  components: {
    VuePerfectScrollbar,
    //TopBar,
    MySnackbar,
  },
  data() {
    return {
      searchText: false,
      text: "",
      reqData: [],
      snackText: "Opps! something went worng",
      snack: false,
    };
  },
  mounted(){
   this.loadData();
  },
  methods:{
    loadData(){
       let params = {};
        params.filter = this.text || "";
        getReqBookData(params).then(res=>{
           this.reqData = res.data.['req-data'];
           //console.log();
        })
        .catch(e=>{
            console.error(e);
        })
    },
    approveClick(id){
        let data ={};
        let books = [];
        let approveById = localStorage.getItem("userId");
        let approveBy = localStorage.getItem("fName")+" "+localStorage.getItem("lName");
         this.reqData.filter( e =>{
         if(e._id == id){
            books = e['book-info'].filter(val=>{
                return val.isAvailable==true;
            });
         }
      })
      data.approveById = approveById;
      data.approveBy = approveBy;
      data.bookInfo = books;
      postReqBookData(id,data).then(res=>{
       this.snackText = res.data.['user-message'];
       this.snack = true;
       this.loadData();
       setTimeout(function () { this.fun() }.bind(this),3000);
       
      }).catch(e=>{
        console.error(e);
      })
      console.log(data);
    },
    fun(){
        this.snack = false;
    }
  }

};
</script>

<style scoped>
.abc {
  color: #bedaf2;
}
</style>