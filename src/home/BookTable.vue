<template>
  <div>
    <top-bar :title="'All Books'" />
    <VuePerfectScrollbar
      class="scroll-area"
      style="margin-top: 50px !important"
    >
      <v-data-table
        :headers="headers"
        :items="cols"
        search="search"
        id="mytable"
        show-select
        v-model="selected"
        height="72vh"
        loading="loader"
        fixed-header
        :options.sync="options"
        :server-items-length="colLength"
        item-key="_id"
        class="elevation-1"
        @toggle-select-all="selectAllToggle"
      >
        <template v-slot:top>
          <v-toolbar flat dense>
            <v-toolbar-title>All Books</v-toolbar-title>
            <v-spacer></v-spacer>
            <div class="textFiled mt-1">
              <v-text-field
                placeholder="Search"
                @keydown.enter.prevent="loadData"
                v-model="text"
                v-if="searchText"
              >
              </v-text-field>
            </div>
            <v-icon @click="searchText = !searchText"> mdi-magnify </v-icon>
            <v-icon
              class="ml-2"
              style="color: rgb(0, 128, 55)"
              @click="loadData"
            >
              mdi-refresh
            </v-icon>
          </v-toolbar>
        </template>
        <template v-slot:item.data-table-select="{ item, isSelected, select }">
          <v-simple-checkbox
            :value="isSelected"
            :readonly="item.disabled"
            :disabled="item.disabled"
            @input="select($event)"
          ></v-simple-checkbox>
        </template>
        <template v-slot:item._id="{ item }">
          <div style="max-width: 200px !important">
            <span
              :style="
                item.stock
                  ? 'color:#ff0000'
                  : item.cart
                  ? 'color:#3a9ed7'
                  : item.profile
                  ? 'color:#2808de'
                  : 'color:#09e639'
              "
            >
              {{
                item.stock
                  ? "Out of Stock"
                  : item.cart
                  ? "In Your Cart"
                  : item.profile
                  ? "In Your Profile"
                  : "Available"
              }}
            </span>
          </div>
        </template>
      </v-data-table>
    </VuePerfectScrollbar>
    <my-snackbar :snackbar="snackbar" :text="snackbarText"></my-snackbar>
    <v-footer fixed max-height="50px" v-if="selected.length">
      <v-row no-gutters>
        <v-col cols="9" class="pa-0 ma-0">You selecte : {{ message }}</v-col>
        <v-col cols="3" class="pa-0 ma-0">
          <div style="margin-left: 30% !important">
            <v-btn
              depressed
              outlined
              dark
              text
              color="primary"
              @click="addToCartClick"
            >
              <v-icon>mdi-cart</v-icon>
              Add to cart
            </v-btn>
            <v-btn depressed outlined dark text color="red" @click="cancle">
              Cancle
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>
<script>
import TopBar from "./TopBar.vue";
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import {getAllBook} from '../dataProvider/loginServices.js';
import {postUserReqBookData,getUserReqBookData,getUserBookData} from '../dataProvider/userServices.js'
import MySnackbar from './MySnackbar.vue';
  export default {
    components:{
      VuePerfectScrollbar,
      TopBar,
      MySnackbar,
    },
    data () {
      return {
        disabledCount: 0,
        text:"",
        searchText: false,
        options: {},
        selected: [],
        colLength: 0,
        cols: [],
        bookReqData: [],
        bookData: [],
        loader: false,
        search: '',
        message: '',
        bookIds: [],
        snackbar: false,
        snackbarText: "",
        headers: [
        {
            text: 'Check Availability',
            align: 'start',
            sortable: false,
            value: '_id',
          },
          {
            text: '#ID',
            align: 'start',
            sortable: false,
            value: 'bookId',
          },
          {
            text: 'Book Name',
            align: 'start',
            sortable: true,
            value: 'bookName',
          },
          {
            text: 'Author',
            align: 'start',
            sortable: true,
            value: 'bookAuthor',
          },
          
          {
            text: 'Quantity',
            align: 'start',
            sortable: true,
            value: 'quantity',
          },
          
        ],
      }
    },
   watch:{
    options:{
      handler(val){
         setTimeout(function () { this.loadData(val) }.bind(this),500);
         //this.loadData(val);
      },
      deep:true,
    },
    selected:{
      handler(newV){
        this.message = '';
        this.bookIds = [];
          newV.forEach(val=>{
           this.bookIds.push(val.bookId)
           this.message+=val.bookName+", ";
          })
          this.message = this.message.slice(0, -2);
      }
    }
   },
   mounted(){
    this.reqBook();
    this.getBookData();
   },
   methods: {
    loadDataV2(){
      this.reqBook();
      this.getBookData();
      setTimeout(function () { this.loadData() }.bind(this),300);
    },
    getBookData(){
      let data = localStorage.getItem("userId");
       getUserBookData(data).then( res =>{
        if(res.data.["user-message"]=="No data available"){
          this.bookData = [];
        }
        else
           this.bookData = res.data.["book-info"];
       })
       .catch(e=>{
        console.log(e);
       })
      },
    async reqBook(){
        let data = localStorage.getItem("userId");
     await getUserReqBookData(data).then(res => {
        this.bookReqData = res.data.["book-info"];
      }).catch(e=>{
        console.error(e);
      })
    },
    async loadData(val){
    this.loader = true;
    this.disabledCount = 0;
    let params = {};
    params.limit = val.itemsPerPage || 10,
    params.offset = (val.page-1)*val.itemsPerPage || 0,
    params.filter = this.text || "",
    params.sortBy = val.sortBy?val.sortBy[0]?val.sortBy[0]:"bookName":"bookName",
    params.sortOrder = val.sortDesc?val.sortDesc[0] ?"desc":"asc":"asc",
      await getAllBook(params).then(res => {
        this.cols = res.data.['all-book'],
        this.cols.forEach(val=>{
          if(val.quantity<=0){
            val.disabled = true;
            this.disabledCount += 1;
            val.stock = true;
          }
          let check = this.bookReqData.find(itm=>{
            return itm._id == val._id
          })
          if(check){
            val.disabled = true;
            this.disabledCount += 1;
            val.cart = true;
          }
          let check1 = this.bookData.find(itm=>{
            return itm.id == val.bookId
          })
          if(check1){
            val.disabled = true;
            this.disabledCount += 1;
            val.profile = true;
          }
        })
        this.colLength = res.data._meta['total'],
        this.loader = false;
        //console.log(res);
      }).catch(e=>{
        this.loader = false,
        console.error(e);
      })
    },
    addToCartClick(){
      let userId = localStorage.getItem("userId");
      postUserReqBookData(userId,this.bookIds).then(res=>{
        this.snackbar = true;
        this.snackbarText = res.data.["user-message"];
        //console.log(res);
      }).catch(e=>{
        this.snackbar = true;
        this.snackbarText = "Opps! somthing went wrong";
        console.error(e);
      }).finally(e=>{
        setTimeout(function () { this.fun() }.bind(this),3000);
        this.selected=[];
        console.info(e);
      })
    },
    fun(){
      this.snackbar=false;
      location.reload();
    },
    cancle(){
      this.selected = [];
    },
    selectAllToggle(props) {
       if(this.selected.length != this.cols.length - this.disabledCount) {
         this.selected = [];
         const self = this;
         props.items.forEach(item => {
           if(!item.disabled) {
             self.selected.push(item);
           } 
         });
       } else {this.selected = [];
        //this.disabledCount=0;
       }
     }
   },
  }
</script>
<style scoped>
.table {
  margin: 2px;
  margin-top: 160px !important;
  border: 0px #ff0000 solid;
}
.scroll-area {
  height: 85vh;
}
.textFiled {
  max-width: 150 px !important;
}
.divRow {
  background-color: rgb(180, 203, 227);
}
</style>