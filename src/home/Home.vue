<template>
  <VuePerfectScrollbar>
    <div>
      <v-app-bar color="#003366" dense dark fixed="true" class="appBar">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>Page title</v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn> -->

        <!-- <v-avatar color="red" size="30" @click="profile = true">
          <span class="white--text text-h5">SB</span>
        </v-avatar>
        <v-menu :nudge-width="200" offset-x right v-model="profile">
          <v-list>
            <v-list-item> profile </v-list-item>
          </v-list>
        </v-menu> -->
        <div class="text-center">
          <v-menu offset-y :nudge-width="200">
            <template v-slot:activator="{ on, attrs }">
              <v-avatar v-bind="attrs" v-on="on" color="red" size="30">
                <span class="white--text text-h5">SB</span>
              </v-avatar>
            </template>
            <v-list>
              <v-list-item>
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

      <book-table class="table" />

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
            <v-list-item>
              <v-list-item-title>Foo</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Bar</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Fizz</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Buzz</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </div>
  </VuePerfectScrollbar>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import BookTable from "./BookTable.vue";
export default {
  name: "Home",
  components: {
    BookTable,
    VuePerfectScrollbar,
  },
  data() {
    return {
      drawer: false,
      profile: false,
    };
  },
  methods:{
    logoutClick(){
      this.$router.push("./login");
      localStorage.setItem("router","./login");
      location.reload();
    }
  }
};
</script>
<style scoped>
.main {
  height: 90% !important;
}
/* .appBar{
  margin-bottom: -50px !important;
} */
.table {
  margin-top: 50px !important;
}
</style>