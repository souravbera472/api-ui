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
            <span style="color: #0000cd">Click here for request books</span>
          </v-btn>
        </div>
      </div>
      <div v-else v-for="(val, index) in bookData" :key="index">
        <v-card class="mx-auto mt-6 mr-4 ml-7" max-width="344" min-width="330">
          <v-card-text>
            <div>Isse on: {{ new Date(val.ct).toDateString() }}</div>
            <p class="text-h4">
              {{ val.name }}
            </p>
            <span class="mb-1">
              Written By: <span class="text--primary">{{ val.author }}</span>
            </span>
             <br>
            <span>
              Approved By:
              <span class="text--primary mb-0">{{ val.approvedBy }}</span>
            </span>
            <v-row
              no-gutters
              align-md="center"
              class="ma-0 pa-0"
              style="height: 30px"
            >
              <v-col cols="7" class="pa-0 ma-0"
                >Return or Renewal Books:
              </v-col>
              <v-col cols="3" class="pa-0 ma-0" v-b-tooltip.hover title="disabled">
                <v-checkbox
                  v-model="Selection"
                  color="info"
                  :value="val._id"
                  multiple
                  
                  v-b-tooltip.hover title="Select"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-card-text>
          <div class="ml-0 mb-2">
            <v-btn
              v-b-tooltip.hover
              title="More Info"
              text
              color="primary"
              @click="choseIndex(index)"
            >
              more info
            </v-btn>
            <br />
            <br />
          </div>

          <v-expand-transition>
            <v-card
              v-if="revealId === index"
              class="transition-fast-in-fast-out v-card--reveal"
              style="height: 100%"
            >
              <v-card-text class="pb-0">
                <p>Every day cost ₹ 1 per book after 30 days</p>
                <p class="text-h5 text--primary">Number of Days:</p>
                <p class="text-h6 text--primary">
                  {{
                    Math.floor((Date.now() - val.lu) / (24 * 60 * 60 * 1000))
                  }}
                  <span class="text--primary"> Days</span>
                </p>
                <p class="text-h6 text--primary">Cost: ₹ 0</p>
              </v-card-text>
              <v-card-actions class="pt-0">
                <v-btn text color="primary" @click="revealId = null">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-expand-transition>
        </v-card>
      </div>
    </v-row>
    <MySnackbar :snackbar="snackbar" :text="snackbarText"></MySnackbar>
    <v-footer fixed max-height="50px" v-if="Selection.length">
      <v-row no-gutters class="ml-2">
        <v-col cols="6"></v-col>
        <v-col cols="6" class="pa-0 ma-0" style="margin-left: 70% !important">
          <v-btn
            depressed
            outlined
            dark
            text
            color="primary"
            @click="removeOrReturnClick('renewal')"
          >
            <v-icon>mdi-repeat-once</v-icon>
            Renewal Books
          </v-btn>
          <v-btn
            depressed
            outlined
            dark
            text
            color="primary"
            @click="removeOrReturnClick('return')"
          >
            <v-icon>mdi-redo-variant</v-icon>
            Return Books
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
//import VuePerfectScrollbar from "vue-perfect-scrollbar";
//import TopBar from "./TopBar.vue";
import MySnackbar from "./MySnackbar.vue";
import {getUserBookData,postUserReqRenewalBooks} from "../dataProvider/userServices.js"
export default {
  components: {
    MySnackbar,
    //VuePerfectScrollbar,
    //TopBar,
  },
  name: "BookProfile",
  data() {
    return {
      loader: true,
      revealId: null,
        bookData: [],
        Selection: [],
        snackbarText: "",
        snackbar: false,
    };
  },
  mounted(){
    this.getBookData();
  },
  methods:{
    clickReq(){
      this.$router.push("./books");
      localStorage.setItem("router", "./books");
    },
    choseIndex(index){
      this.revealId = index;
    },
    getBookData(){
      this.loader = true;
      let data = localStorage.getItem("userId");
       getUserBookData(data).then( res =>{
        if(res.data.["user-message"]=="No data available"){
          this.bookData = [];
        }
        else
           this.bookData = res.data.["book-info"];
        this.loader = false;
        
       })
       .catch(e=>{
        this.loader = false;
        console.log(e);
       })
       .finally(e=>{
        this.loader = false;
        console.log(e);
       })
    },
    removeOrReturnClick(type){
      this.snackbar = true;
          let userId = localStorage.getItem("userId");
          postUserReqRenewalBooks(userId,type,this.Selection).then(res=>{
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
          //this.loadData()
          this.snackbar=false;
        },
  }
};
</script>
<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
.scroll {
  height: 100vh - 50px;
}
.tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>