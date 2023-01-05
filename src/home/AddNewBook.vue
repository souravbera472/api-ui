<template>
  <div>
    <v-dialog
      @click:outside="onClickOutside"
      v-model="dialog"
      content-class="dialogClass"
      hide-overlay
    >
      <div class="text-h4 pa-4">Add Book Details</div>
      <v-form ref="form" v-model="valid" lazy-validation class="pa-4">
        <v-row no-gutters>
          <v-col cols="6" class="pl-2 pr-5">
            <v-text-field
              @mouseleave="checkValidation"
              v-model="bookName"
              placeholder="Enter book name"
              label="Book Name*"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="pl-2 pr-5">
            <v-text-field
              @mouseleave="checkValidation"
              v-model="bookAuthor"
              placeholder="Enter author name"
              label="Book Author*"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="6" class="pl-2 pr-5">
            <v-text-field
              @mouseleave="checkValidation"
              v-model="bookId"
              placeholder="Enter book id"
              label="Book Id*"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="pl-2 pr-5">
            <v-text-field
              @mouseleave="checkValidation"
              placeholder="Please enter only number"
              v-model="quantity"
              label="Quantity*"
              type="number"
              min="0"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-checkbox
          :disabled="!checkBox"
          class="pl-1"
          v-model="check"
          label="Do you agree?"
        >
        </v-checkbox>
      </v-form>
      <v-row no-gutters>
        <v-col cols="7"></v-col>
        <v-col cols="5" class="pl-4">
          <v-btn depressed rounded text color="red" @click="onClickOutside">
            Close
          </v-btn>
          <v-btn depressed rounded text color="red" @click="reSet">
            Reset
          </v-btn>
          <v-btn
            depressed
            rounded
            text
            color="primary"
            :disabled="!check"
            @click="addBook"
          >
            Submit
          </v-btn>
        </v-col>
      </v-row>
    </v-dialog>
    <MySnackbar :snackbar="snack" :text="snackText">
    </MySnackbar>
  </div>
</template>
  
<script>
import {addNewBook} from "../dataProvider/adminServices.js";
import MySnackbar from "../home/MySnackbar.vue";
export default {
  components: {
    MySnackbar,
  },
  name: "Profile",
  data() {
    return {
      checkBox: false,
      check: false,
      valid: "",
      bookName: "",
      bookAuthor: "",
      bookId: "",
      quantity: "",
      userName: "",
      check1: false,
      check2: false,
      check3: false,
      check4: false,
      snack: false,
      snackText: "Opps! something went worng",
      user: "",
      fName: "",
      lName: "",
      role: "",
      name: "",
      cost: 0,
    };
  },
  props: {
    dialog: Boolean,
    count: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    bookName: {
      handler(val) {
        if (val.length > 0) this.check1 = true;
        else this.check1 = false;
      },
    },
    bookAuthor: {
      handler(val) {
        if (val.length > 0) this.check2 = true;
        else this.check2 = false;
      },
    },
    bookId: {
      handler(val) {
        if (val.length > 0) this.check3 = true;
        else this.check3 = false;
      },
    },
    quantity: {
      handler(val) {
        if (val.length > 0) this.check4 = true;
        else this.check4 = false;
      },
    },
  },
  mounted() {
    this.user = localStorage.getItem("user");
    this.userName = localStorage.getItem("userName");
    this.fName = localStorage.getItem("fName");
    this.lName = localStorage.getItem("lName");
    this.role = localStorage.getItem("role");
    this.name = this.fName + " " + this.lName;
  },
  methods: {
    addBook() {
      let data = {};
      data.bookName = this.bookName;
      data.bookId = this.bookId;
      data.bookAuthor = this.bookAuthor;
      data.quantity = this.quantity;

      addNewBook(data).then(res=>{
       this.snackText = res.data.['user-message'];
       this.snack = true;
       setTimeout(function () { this.fun() }.bind(this),5000);
       this.reSet();

      })
      .catch(e =>{
        console.log(e);
      })
    },
    fun(){
        this.snack = false;
    },
    onClickOutside() {
      this.$emit("close", false);
    },
    reSet() {
      this.bookName = "";
      this.bookAuthor = "";
      this.bookId = "";
      this.quantity = "";
      this.checkBox = false;
      this.check = false;
    },
    checkValidation() {
      if (this.check1 && this.check2 && this.check3 && this.check4) {
        this.checkBox = true;
      } else this.checkBox = false;
    },
  },
};
</script>
  <style scoped>
</style>
  <style>
.dialogClass {
  width: 50% !important;
  height: 55% !important;
  background: rgb(245, 239, 239);
}
</style>