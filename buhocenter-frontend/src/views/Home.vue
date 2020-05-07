<template>
  <div class="about">
    <h1>This is an home page</h1>
    <h2>{{getStatusLogin}}</h2>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import AuthMethods from '@/store/auth-module/methods/auth-methods'
  import { authModule } from "@/store/namespaces";

  @Component
  export default class Home extends Vue {

    get getStatusLogin(){
      const token: string = this.getTokenGoogle;
      if(token){
        return "Estas logeado"
      }
      return "No estas logeado"
    }

    @authModule.Getter(AuthMethods.getters.GET_AUTH_TOKEN_GOOGLE) getTokenGoogle;
  }
</script>
