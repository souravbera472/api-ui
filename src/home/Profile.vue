<template>
  <div>
    <v-dialog
      @click:outside="onClickOutside"
      v-model="dialog"
      content-class="dialogClass"
      hide-overlay
    >
      <v-row justify="center" class="rowClass ma-0 pa-0">
        <v-col cols="6">
          <v-avatar color="primary" size="180">
            <span class="white--text text-h2">{{ user }}</span>
          </v-avatar>
          <div class="camera">
            <v-icon>mdi-camera</v-icon>
          </div>

          <br />
          <br />
          <span class="text-h5 ml-6">{{ name }}</span>
          <br />
          <span class="ml-14">{{ role }}</span>
        </v-col>
        <v-col cols="6">
          <div class="mt-10">
            <v-icon dark color="primary"> mdi-account-circle </v-icon>
            <span class="ml-3">{{ name }}</span>
          </div>
          <div class="mt-4">
            <v-icon dark color="primary">mdi-mail</v-icon>
            <span class="ml-3">{{ userName }}</span>
          </div>
          <div class="mt-4">
            <v-icon dark color="primary">mdi-book-open</v-icon>
            <span class="ml-3">Total Book : {{ count }}</span>
          </div>
          <div class="mt-4">
            <v-icon dark color="primary">mdi-cash</v-icon>
            <span class="ml-3">Total Cost : ₹ {{ cost }}</span>
          </div>
        </v-col>
      </v-row>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      userName: "",
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
    count:{
      type: Number,
      default: 0,
    }
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
    onClickOutside() {
      this.$emit("close", false);
    },
  },
};
</script>
<style scoped>
.rowClass {
  height: 100% !important;
  /*color: rgb(72, 135, 224);*/
}
.camera{
    margin-top: -38px;
    margin-left: 120px;
}
</style>
<style>
.dialogClass {
  width: 40% !important;
  height: 50% !important;
  background: rgb(255, 239, 239);
}
</style>