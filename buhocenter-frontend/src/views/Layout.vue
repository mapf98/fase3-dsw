<template>
  <v-app id="inspire">
    <v-navigation-drawer
            v-model="drawer"
            :clipped="$vuetify.breakpoint.lgAndUp"
            app
            right
            temporary
    >
      <Cart></Cart>
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
      <div class="mr-2 ml-2" v-if="getStatusLogin">
        <div class="text-xs-center">
          <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-width="200"
                  offset-x
          >
            <template v-slot:activator="{ on }">
              <v-btn
                      text
                      v-on="on"
              >
                {{getClient.name+" "+getClient.lastName}}
              </v-btn>
            </template>

            <v-card>
              <v-list>
                <v-list-item avatar>
                  <v-list-item-avatar>
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                  </v-list-item-avatar>

                  <v-list-item-action>
                    <v-list-item-title>{{getClient.name+" "+getClient.lastName}}</v-list-item-title>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="signOut()">Log out</v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </div>
      </div>
      <div class="mr-2 ml-2" v-else>
        <router-link to="/sign-in" >
        <v-btn text>
          Sign in
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

<script lang="ts">
  import {authModule} from "@/store/namespaces";
  import AuthMethods from "@/store/auth-module/methods/auth-methods";
  import {Component, Vue} from "vue-property-decorator";
  import Cart from "@/views/Cart.vue";

  @Component({
    components: { Cart },
  })
  export default class Layout extends Vue {
    dialog = false;
    drawer =  null;
    fav = true
    menu = false
    message = false
    hints = true

    async signOut(){
      await this.logout();
    }


    get getStatusLogin(){
      const token: string = this.getToken;
      return !!token;
    }

    @authModule.Getter(AuthMethods.getters.GET_AUTH_TOKEN) getToken;
    @authModule.Action(AuthMethods.actions.LOGOUT) logout;
    @authModule.Getter(AuthMethods.getters.GET_CLIENT_DATA) getClient;
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
  }
</style>
