<template>
  <div>
    <v-snackbar v-model="snackbarVal" :timeout="timeout" right>
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
        snackbarVal: false,
        timeout: 3000,
    };
  },
  props:{
    snackbar: Boolean,
    text: String,
  },
  watch:{
    snackbar:{
        handler(newV){
            this.snackbarVal = newV;
        }
    }
  }
};
</script>