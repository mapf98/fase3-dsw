<template>
  <div class="container-page">
    <v-carousel hide-delimiters height="400">
      <v-carousel-item
              class="carrousel-home"
              v-for="(item,i) in items"
              :key="i"
              :src="item.src"
              contain
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  @Component
  export default class Home extends Vue {
    items = [
      {
        src: require('../assets/images/slider-1.jpg'),
      },
      {
        src: require('../assets/images/slider-2.jpg'),
      },
      {
        src: require('../assets/images/slider-4.jpg'),
      },
    ];
  }
</script>
<style>
  .container-page{
    bottom: 65px;
    position: relative;
    width: 100%;
    padding: 0;
  }
  .v-image__image--contain {
    background-position-y: 38% !important;
  }

  @media only screen and (max-width: 600px) {
    .v-window__prev, .v-window__next {
      top: calc(40% - 20px) !important;
    }
  }



</style>
