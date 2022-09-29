<template>
    <div>
    <VuePerfectScrollbar class="scroll-area">
      <!-- <v-text-field 
        v-model="search" 
        label="Search" 
        single-line>
       </v-text-field> -->
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
    >
    <template v-slot:top>
      <v-toolbar
        flat
        dense
      >
        <v-toolbar-title>All Books</v-toolbar-title>
         <v-spacer></v-spacer>
         <div class="textFiled mt-1">
         <v-text-field 
         placeholder="Search"
         @keydown.enter.prevent="loadData"
         v-model="text" v-if="searchText">
             
         </v-text-field>
         </div>
        <v-icon @click="searchText=!searchText">
        mdi-magnify
        </v-icon>
        <v-icon 
        class="ml-2"
        style="color: rgb(0, 128, 55);"
        @click="loadData">
        mdi-refresh
      </v-icon>
      </v-toolbar>
     
      
    </template>
       <template v-slot:items._id="{ on, props }">
        <v-simple-checkbox class="checkbox" v-bind="props" v-on="on"></v-simple-checkbox>
      </template>
       
    </v-data-table>
    <!-- <div>Selected: {{selected}}</div> -->
    </VuePerfectScrollbar>
  </div>

</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import {getAllBook} from '../dataProvider/loginServices.js'
  export default {
    components:{
      VuePerfectScrollbar,
    },
    data () {
      return {
        text:"",
        searchText: false,
        options: {},
        selected: [ ],
        colLength: 0,
        cols: [],
        loader: false,
        search: '',
        headers: [
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
         this.loadData(val);
      },
      deep:true,
    },
   },
   methods: {
    async loadData(val){
      this.loader = true;
    let params = {};
    params.limit = val.itemsPerPage || 10,
    params.offset = (val.page-1)*val.itemsPerPage || 0,
    params.filter = this.text || "",
    params.sortBy = val.sortBy?val.sortBy[0]:"bookName",
    params.sortOrder = val.sortDesc?val.sortDesc[0] ?"desc":"asc":"asc",
      await getAllBook(params).then(res => {
        this.cols = res.data.['all-book'],
        this.colLength = res.data._meta['total'],
        this.loader = false;
        //console.log(res);
      }).catch(e=>{
        this.loader = false,
        console.error(e);
      })
    },
   }
  }
</script>
<style scoped>
.table{
    margin: 2px;
    margin-top: 160px !important;
    border: 0px rgb(122, 121, 121) solid;
}
.textFiled{
  max-width: 150 px !important;
}
</style>
<style lang="sass" scoped>
</style>