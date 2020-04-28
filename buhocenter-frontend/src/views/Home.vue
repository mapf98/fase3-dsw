<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Multilenguaje i18n POeditor"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/modules/term-module/components/HelloWorld'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
