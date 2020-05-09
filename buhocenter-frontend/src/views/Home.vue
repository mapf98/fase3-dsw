<template>
  <div class="about">
    <h1>This is an home page</h1>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import AuthMethods from '@/store/auth-module/methods/auth-methods'
  import { authModule } from "@/store/namespaces";


  @Component
  export default class Home extends Vue {

  }
</script>
