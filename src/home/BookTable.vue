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
      fixed-header
      :options.sync="options"
      :server-items-length="13"
      item-key="_id"
      class="elevation-1"
    >
    <template v-slot:top>
      <v-toolbar
        flat
        dense
      >
        <v-toolbar-title>All Books</v-toolbar-title>
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
        options: {},
        selected: [ ],
        cols: [],
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
            sortable: false,
            value: 'bookName',
          },
          {
            text: 'Author',
            align: 'start',
            sortable: false,
            value: 'bookAuthor',
          },
          
          {
            text: 'Quantity',
            align: 'start',
            sortable: false,
            value: 'quantity',
          },
          
        ],
      }
    },
   
   mounted(){
    let params = {};
    params.limit = 10,
    params.offset = 0,
      getAllBook(params).then(res => {
        this.cols = res.data.['all-book'],
        console.log(res);
      }).catch(e=>{
        console.error(e);
      })
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
    let params = {};
    params.limit = val.itemsPerPage,
    params.offset = (val.page-1)*val.itemsPerPage,
      await getAllBook(params).then(res => {
        this.cols = res.data.['all-book'],
        console.log(res);
      }).catch(e=>{
        console.error(e);
      })
    },
   }
  }
</script>
<style scoped>
.table{
    margin: 4px;
    margin-top: 50px;
    border: 0px rgb(122, 121, 121) solid;
}
.scroll-area{
 
}
</style>
<style lang="sass" scoped>
.my-sticky-header-table
  /* height or max-height is important */
  height: 310px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #c1f4cd

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0
</style>