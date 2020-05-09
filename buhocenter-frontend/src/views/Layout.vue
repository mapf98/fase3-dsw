<template>
  <v-app id="inspire">
    <v-navigation-drawer
            v-model="drawer"
            :clipped="$vuetify.breakpoint.lgAndUp"
            app
            right
            temporary
    >
      <Aside></Aside>
    </v-navigation-drawer>

    <v-app-bar
            clipped-left
            app
            color="primary"
            dark
    >

        <v-toolbar-title
            style="width: 200px"
            class="ml-0 pl-4 overline"
        >
        <span class="title">Buhocenter</span>
      </v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <div class="mr-2 ml-2 pt-3">
          <v-btn text>
            Home
          </v-btn>
        </div>
      </v-toolbar-items>


      <v-spacer />
      <div class="searc d-none d-xl-block d-lg-block pr-3">
        <input type="search" class="search">
      </div>
      <div class="mr-2 ml-2">
        <router-link to="/sign-in">

          <v-btn text>
            Inicia sesión
          </v-btn>

        </router-link>
      </div>


      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content class="pa-0">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import Aside from "@/views/Aside";
  export default {
    components:{
      Aside
    },
    props: {
      source: String,
    },
    data: () => ({
      dialog: false,
      drawer: null,
    }),
  }
</script>

<style>
  .search {
    outline: none;
    border: 1px #F8F8F8;
    background: #ededed url('../assets/search.png') no-repeat 5px center;
    padding: 5px 8px 0px 26px;
    width: 10px;
    -webkit-border-radius: 10em;
    -moz-border-radius: 10em;
    border-radius: 10em;
    -webkit-transition: all .5s;
    -moz-transition: all .5s;
    transition: all .5s;
    margin-right: 10px;
  }
  .search:focus {
    width: 160px;
    border: solid 1px #ccc;
    background-color: #fff;
    border-color: #98ccfd;
    -webkit-box-shadow: 0 0 5px rgba(109, 207, 246, .5);
    -moz-box-shadow: 0 0 5px rgba(109, 207, 246, .5);
    box-shadow: 0 0 5px rgba(109, 207, 246, .5);
    backface-visibility: hidden;
    perspective: 1000;
  }
</style>
