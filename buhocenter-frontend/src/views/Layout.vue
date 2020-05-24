<template>
  <v-app id="inspire">
    <div v-if="getFetchLanguage === fetching">
      <LoadingPage></LoadingPage>
    </div>
    <div v-else>
      <Header></Header>
      <v-content class="pa-0 container-main">
        <v-container fluid class="container-principal">
          <router-view></router-view>
          <Footer></Footer>
        </v-container>
      </v-content>
    </div>
  </v-app>
</template>

<script lang="ts">
  import { languageModule} from "@/store/namespaces";
  import {Component, Vue} from "vue-property-decorator";
  import LoadingPage from "@/views/LoadingPage.vue";
  import LanguageMethods from "@/store/languages-module/methods/language-methos";
  import { FETCHED , FETCHING} from "@/config/constants";
  import Header from "@/modules/header-module/Header.vue";
  import Footer from "@/modules/footer-module/Footer.vue";

  @Component({
    components: {Footer, Header, LoadingPage },
  })
  export default class Layout extends Vue {
    fetching = FETCHING;
    fetched = FETCHED;


    @languageModule.Getter(LanguageMethods.getters.GET_FETCH_PLATFORM_LANGUAGE) getFetchLanguage;
  }
</script>

<style>
  .container-main { background-color: #f4f4f4 }



  .container-principal {
    position: relative;
    top: 66px;
    padding: 0px 0px 0px 0px !important;
  }





</style>
