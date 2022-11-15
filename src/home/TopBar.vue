<template>
  <div>
    <v-app-bar color="#003366" dense dark fixed="true" class="appBar">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <div v-if="role == 'admin'">
        <v-icon
          class="pa-0 ma-0"
          @click="viewCartClick"
          v-b-tooltip.hover
          title="approve-books"
          >mdi-bell-ring
        </v-icon>
        <v-icon color="red" size="10" class="mr-4 mb-3">mdi-circle</v-icon>
      </div>

      <v-icon class="mr-4" @click="cartClick" v-b-tooltip.hover title="cart"
        >mdi-cart</v-icon
      >
      <v-icon class="mr-4" @click="homeClick" v-b-tooltip.hover title="home"
        >mdi-home</v-icon
      >
      <div class="text-center">
        <v-menu offset-y :nudge-width="200">
          <template v-slot:activator="{ on, attrs }">
            <v-avatar
              v-b-tooltip.hover
              :title="name"
              v-bind="attrs"
              v-on="on"
              color="red"
              size="25"
            >
              <span class="white--text text-h7">{{ user }}</span>
            </v-avatar>
          </template>
          <v-list>
            <v-list-item @click="clickDialog">
              <v-list-item-title class="ml-1">
                <v-icon class="mr-2"> mdi-account-circle </v-icon>
                Profile
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="logoutClick">
              <v-list-item-title class="ml-1">
                <v-icon class="mr-2"> mdi-logout </v-icon>
                Logout
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <Profile :count="bookCount" :dialog="dialog" @close="closeDialog()">
    </Profile>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
      class="mt-12"
    >
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item @click="allBookClick">
            <v-list-item-title>All Book</v-list-item-title>
          </v-list-item>

          <v-list-item @click="cartClick">
            <v-list-item-title>Your Cart</v-list-item-title>
          </v-list-item>
          <v-list-item @click="checkClick">
            <v-list-item-title>Check</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import Profile from "./Profile.vue";
export default {
  name: "TopBar",
  components: { Profile },
  data() {
    return {
      dialog: false,
      drawer: false,
      homeDisable: false,
      userName: "",
      user: "",
      name: "",
      role: "",
      userInfo: {},
      bookCount: 0,
    };
  },
  props: {
    title: {
      type: String,
      default: "No Title",
    },
  },
  mounted() {
    this.user = localStorage.getItem("user");
    this.userName = localStorage.getItem("userName");
    this.fName = localStorage.getItem("fName");
    this.lName = localStorage.getItem("lName");
    this.role = localStorage.getItem("role");
    this.name = this.fName + " " + this.lName;
    this.homeDisable = false;
    if (!localStorage.getItem("router") == "./home") {
      this.homeDisable = true;
    }
  },
  methods: {
    clickDialog(){
      this.dialog = true;
      this.bookCount = localStorage.getItem("bookCount");
    },
    closeDialog(val) {
      this.dialog = val;
    },
    logoutClick() {
      this.$router.push("./login");
      localStorage.clear();
    },
    allBookClick() {
      this.$router.push("./books");
      localStorage.setItem("router", "./books");
    },
    homeClick() {
      this.$router.push("./home");
      localStorage.setItem("router", "./home");
    },
    cartClick() {
      this.$router.push("./req-cart");
      localStorage.setItem("router", "./req-cart");
    },
    viewCartClick() {
      this.$router.push("./view-cart");
      localStorage.setItem("router", "./view-cart");
    },
    checkClick(){
      this.$router.push("./check");
    }
  },
};
</script>
<style scoped>
.main {
  height: 90% !important;
}
</style>