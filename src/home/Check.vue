<template>
    <div style="height: 90vh">
        <top-bar :title="'check page'"></top-bar>
        <div style="padding-top: 50px !important">
            <h2>
                This is check page
            </h2>
            <v-btn @click="myClick">
                click
            </v-btn>
        </div>
        <my-snackbar :snackbar="check" :text="text">
        </my-snackbar>
    </div>
    
</template>
<script>
import MySnackbar from './MySnackbar.vue'
import TopBar from './TopBar.vue';
export default {
  components: { MySnackbar, TopBar },
    data(){
        return{

            check: false,
            text: "This is snack bar",
        }
    },
    methods:{
        myClick(){
            this.check = true;
            setTimeout(function () { this.fun() }.bind(this),3000);
        },
        fun(){
            this.check = false;
        }
    }

}
</script>