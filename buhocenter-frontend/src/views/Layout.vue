<template>
  <v-app id="inspire">

    <div v-if="getFetchLanguage === fetching">
      <LoadingPage></LoadingPage>
    </div>
    <div v-else>
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
              color="white"
              light
      >
        <v-toolbar-title
                class="ml-0 pl-4 overline"
        >
          <v-img src="../assets/logo-header.png" width="250"></v-img>
        </v-toolbar-title>
        <v-toolbar-items class="hidden-sm-and-down">
          <div class="mr-2 ml-2 pt-3">
            <router-link to="/home">
              <v-btn text>
                {{$t('HOME')}}
              </v-btn>
            </router-link>
          </div>
          <div class="mr-2 ml-2 pt-3">
            <router-link to="/products">
              <v-btn text>
                {{$t('PRODUCTS')}}
              </v-btn>
            </router-link>
          </div>
          <div class="mr-2 ml-2 pt-3">
            <router-link to="/products">
              <v-btn text>
                {{$t('SERVICES')}}
              </v-btn>
            </router-link>
          </div>
        </v-toolbar-items>


        <v-spacer />
        <div class="searc d-none d-xl-block d-lg-block pr-3">
          <input type="search" class="search">
        </div>
        <div class="mr-2 ml-2">
          <v-menu
                  bottom
                  origin="center center"
                  transition="scale-transition"
                  v-model="menu"
                  :close-on-content-click="true"
                  :nudge-width="200"
                  offset-x
          >
            <template v-slot:activator="{ on }">
              <v-btn
                      color="primary"
                      dark
                      v-on="on"
              >
                {{getLanguagePlatform}}
              </v-btn>
            </template>


            <v-list>
              <v-list-item
                      v-for="(item, i) in getLanguages"
                      :key="i"
                      @click="changeLanguagePlatform(item.code)"
              >
                <v-row>
                  <v-col cols="4"><v-img :src="require(`../assets/flags/${item.code}.png`)" height="18" width="18"></v-img></v-col>
                  <v-col cols="8">{{ item.name }}</v-col>
                </v-row>
              </v-list-item>
            </v-list>
          </v-menu>
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
                  <v-list-item avatar to="/profile">
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
                  <v-btn color="primary" flat @click="signOut()">{{$t('LOG-OUT')}}</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </div>
        </div>
        <div class="mr-2 ml-2" v-else>
          <router-link to="/sign-in" >
            <v-btn text>
              {{$t('SIGN-IN')}}
            </v-btn>
          </router-link>
        </div>

        <v-btn class="pr-4" icon @click.stop="drawer = !drawer">
          <v-badge
                  color="primary"
                  content="0"
          >
            <v-icon color="primary">mdi-cart</v-icon>
          </v-badge>

        </v-btn>
      </v-app-bar>
      <v-content class="pa-0 container-main">
        <v-container fluid class="container-principal">
          <v-snackbar
                  v-model="snackbar" top :timeout="6000" color="error"
          >
            <b v-if="getErrLoadLanguage">
              Unexpected error loading languages
            </b>
            <b v-else>
              Error occurred while getting the languages
            </b>

            <v-btn color="white" text @click="snackbar = false">Close</v-btn>
          </v-snackbar>
          <router-view></router-view>
        </v-container>
      </v-content>
    </div>
  </v-app>
</template>

<script lang="ts">
  import {authModule, languageModule} from "@/store/namespaces";
  import AuthMethods from "@/store/auth-module/methods/auth-methods";
  import {Component, Vue} from "vue-property-decorator";
  import Cart from "@/views/Cart.vue";
  import LoadingPage from "@/views/LoadingPage.vue";
  import LanguageMethods from "@/store/languages-module/methods/language-methos";
  import { FETCHED , FETCHING} from "@/config/constants";
  import {i18n} from "@/i18n/i18n";

  @Component({
    components: { Cart,LoadingPage },
  })
  export default class Layout extends Vue {
    dialog = false;
    drawer =  null;
    menu = false
    message = false
    hints = true;
    fetching = FETCHING;
    fetched = FETCHED;
    snackbar: boolean = false;

    async signOut(){
      await this.logout();
    }

    async mounted() {
      if(this.getLanguages.length === 0){
        await this.apiGetLanguages();
        this.snackbar = this.getErrLanguages;
      }

      if(this.getLanguagePlatform !== i18n.locale){
        if(this.getStatusLogin){
          await this.changeLanguagePlatform(this.getClient.language?this.getClient.language:'en');
        }else{
          await this.changeLanguagePlatform(this.getLanguagePlatform)
        }

      }
    }

    async changeLanguagePlatform(code) {
      await this.apiChangeLanguage(code);
      this.snackbar = this.getErrLoadLanguage;
    }

    get getStatusLogin(){
      const token: string = this.getToken;
      return !!token;
    }


    @authModule.Action(AuthMethods.actions.LOGOUT) logout;
    @authModule.Getter(AuthMethods.getters.GET_CLIENT_DATA) getClient;
    @authModule.Getter(AuthMethods.getters.GET_AUTH_TOKEN) getToken;


    @languageModule.Action(LanguageMethods.actions.API_GET_LANGUAGES) apiGetLanguages;
    @languageModule.Action(LanguageMethods.actions.API_CHANGE_LANGUAGE) apiChangeLanguage;
    @languageModule.Getter(LanguageMethods.getters.GET_LANGUAGES) getLanguages;
    @languageModule.Getter(LanguageMethods.getters.GET_PLATFORM_LANGUAGE) getLanguagePlatform;
    @languageModule.Getter(LanguageMethods.getters.GET_LANGUAGE_ERR) getErrLanguages;
    @languageModule.Getter(LanguageMethods.getters.GET_PLATFORM_LANGUAGE_ERROR) getErrLoadLanguage;
    @languageModule.Getter(LanguageMethods.getters.GET_FETCH_PLATFORM_LANGUAGE) getFetchLanguage;
  }
</script>

<style>
  .text{
    font-family: 'Rozha One', serif;
  }

  .container-main { background-color: #f4f4f4 }
  .search {
    outline: none;
    border: 1px #F8F8F8;
    background: #ededed url('../assets/search.png') no-repeat 5px center;
    padding: 5px 8px 0px 26px;
    width: 200px;
    border-radius: 10em;
    transition: all .5s;
    margin-right: 10px;
  }
  .search:focus {
    width: 400px;
    border: solid 1px #ccc;
    background-color: #fff;
    border-color: #98ccfd;
    -webkit-box-shadow: 0 0 5px rgba(109, 207, 246, .5);
    -moz-box-shadow: 0 0 5px rgba(109, 207, 246, .5);
    box-shadow: 0 0 5px rgba(109, 207, 246, .5);
    backface-visibility: hidden;
  }

  .container-principal {
    top: 110px;
    padding: 0px 0px 0px 0px !important;
  }

</style>
