<template>
  <div>
    <v-row no-gutters>
      <div v-if="!bookData.length" style="margin-left: 40%; margin-top: 7%">
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
            <p class="text-h4 text--primary">
              {{ val.name }}
            </p>
            <p>
              Written By: <span class="text--primary">{{ val.author }}</span>
            </p>

            <p>
              Approved By:
              <span class="text--primary">{{ val.approvedBy }}</span>
            </p>
          </v-card-text>
          <div class="ml-5 mb-2">
            <v-icon
            v-b-tooltip.hover
              title="Book Renewal" 
            class="mr-5" darck color="primary">
              mdi-repeat-once
            </v-icon>
            <v-icon
            v-b-tooltip.hover
              title="Book Return"
            class="ml-5" darck color="primary">
              mdi-redo-variant
            </v-icon>
            <v-btn
              v-b-tooltip.hover
              title="More Info"
              class="ml-5"
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
                    Math.floor((Date.now() - val.ct) / (24 * 60 * 60 * 1000))
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
  </div>
</template>
<script>
//import VuePerfectScrollbar from "vue-perfect-scrollbar";
//import TopBar from "./TopBar.vue";
import {getUserBookData} from "../dataProvider/userServices.js"
export default {
  components: {
    //VuePerfectScrollbar,
    //TopBar,
  },
  name: "BookProfile",
  data() {
    return {
      revealId: null,
        bookData: [],
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
      let data = localStorage.getItem("userId");
       getUserBookData(data).then( res =>{
        this.bookData = res.data.["book-info"];
        console.log(res.data);
       })
       .catch(e=>{
        console.log(e);
       })
    }
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